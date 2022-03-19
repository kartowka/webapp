import app from '../src/app'
import request from 'supertest'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'

//* params
const postMessage = 'this is my test post'
const sender = 'Fleysher'
let senderID = ''
//* end params

afterAll(async () => {
  mongoose.connection.close()
})
describe('POST API TEST', () => {
  test('function createPost', async () => {
    const response = await request(app)
      .post('/post')
      .send({ message: postMessage, sender: sender })
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })
  test('function getPosts', async () => {
    const response = await request(app).get('/post')
    expect(response.statusCode).toEqual(StatusCodes.OK)
  })
  test('function getPostsBySender', async () => {
    const response = await request(app).get('/post?sender=' + sender)
    senderID = response.body[0]._id
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body[0].message).toEqual(postMessage)
    expect(response.body[0].sender).toEqual(sender)
  })
  test('function getPostsById', async () => {
    const response = await request(app).get('/post/' + senderID)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    expect(response.body.message).toEqual(postMessage)
    expect(response.body.sender).toEqual(sender)
    expect(response.body._id).toEqual(senderID)
  })
  test('function deletePostByID', async () => {
    const response = await request(app).delete('/post/' + senderID)
    expect(response.statusCode).toEqual(StatusCodes.OK)
    const userExistAfterDelete = await request(app).delete('/post/' + senderID)
    expect(userExistAfterDelete.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
  test('function getPostsById id doesn`t exist', async () => {
    const response = await request(app).get('/post/' + senderID)
    expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST)
  })
})
