import app from '../server.js'
import request from 'supertest'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'
import Post from '../models/Post.js'

const postMessage = 'this is my test post'
const sender = 'Fleysher'
var senderID = ''

beforeAll(async () => {
	await Post.deleteOne({ sender: sender })
})
afterAll(async () => {
	mongoose.connection.close()
})
describe('Testing Post API', () => {
	test('test function createPost', async () => {
		const response = await request(app).post('/post').send({ message: postMessage, sender: sender })
		expect(response.statusCode).toEqual(StatusCodes.OK)
	})
	test('test function getPosts', async () => {
		const response = await request(app).get('/post')
		expect(response.statusCode).toEqual(StatusCodes.OK)
	})
	test('test function getPostsBySender', async () => {
		const response = await request(app).get('/post?sender=' + sender)
		senderID = response.body[0]._id
		expect(response.statusCode).toEqual(StatusCodes.OK)
		expect(response.body[0].message).toEqual(postMessage)
		expect(response.body[0].sender).toEqual(sender)
	})
	test('test function getPostsById', async () => {
		const response = await request(app).get('/post/' + senderID)
		expect(response.statusCode).toEqual(StatusCodes.OK)
		expect(response.body.message).toEqual(postMessage)
		expect(response.body.sender).toEqual(sender)
		expect(response.body._id).toEqual(senderID)
	})
})
