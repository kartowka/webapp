import app from '../server.js'
import request from 'supertest'
import mongoose from 'mongoose'
import { StatusCodes } from 'http-status-codes'

//* params
const name = 'Anthony'
const email = 'antonfley@gmail.com'
const wrongEmail = 'qantonfley@gmail.com'
const password = 'qwerty123'
const wrongPassword = 'qwerty1231'
var ID = ''
//* end params

beforeAll(() => {})
afterAll(() => {
	mongoose.connection.close()
})
describe('AUTH API TEST', () => {
	test('function register !name', async () => {
		const res = await request(app).post('/register').send({ email: email, password: password })
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
	test('function register !email', async () => {
		const res = await request(app).post('/register').send({ name: name, password: password })
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
	test('function register !password', async () => {
		const res = await request(app).post('/register').send({ name: name, email: email })
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
	test('function register VALID', async () => {
		const res = await request(app).post('/register').send({ name: name, email: email, password: password })
		expect(res.statusCode).toEqual(StatusCodes.CREATED)
	})
	test('function register duplicate email', async () => {
		const res = await request(app).post('/register').send({ name: name, email: email, password: password })
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
	test('function login !email', async () => {
		const res = await request(app).post('/login').send({ password: password })
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
	test('function login !password', async () => {
		const res = await request(app).post('/login').send({ email: email })
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
	test('function login !user', async () => {
		const res = await request(app).post('/login').send({ email: wrongEmail, password: wrongPassword })
		expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
	})
	test('function login !isPasswordCorrect', async () => {
		const res = await request(app).post('/login').send({ email: email, password: wrongPassword })
		expect(res.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
	})
	test('function login VALID', async () => {
		const res = await request(app).post('/login').send({ email: email, password: password })
		ID = res.body.user._id
		expect(res.statusCode).toEqual(StatusCodes.OK)
	})
	test('function deleteByID', async () => {
		const res = await request(app).delete('/user/' + ID)
		expect(res.statusCode).toEqual(StatusCodes.OK)
	})
	test('function deleteByID !user', async () => {
		const res = await request(app).delete('/user/' + ID)
		expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
	})
})
