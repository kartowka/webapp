import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import request from 'supertest'

import app from '../app'

afterAll(async () => {
  mongoose.connection.close()
})
describe('middleware API TEST', () => {
  test('function not_found', async () => {
    const res = await request(app).get('/123')
    expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND)
  })
  test('function frontpage', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(StatusCodes.OK)
    expect(res.body.msg).toEqual('Welcome!')
  })
})
