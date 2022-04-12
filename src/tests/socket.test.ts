import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import Client, { Socket } from 'socket.io-client'
import request from 'supertest'

import User from '../models/User'
import server from '../server'
import logger from '../utils/logger'

type socketUserModel = {
  email: string
  password: string
  accessToken: string
  clientSocket: Socket
}

const users: socketUserModel[] = [
  {
    email: 'user1@socket.io',
    password: '123456',
    accessToken: '',
    clientSocket: null,
  },
  {
    email: 'user2@socket.io',
    password: '123456',
    accessToken: '',
    clientSocket: null,
  },
]
const serverCleanup = async () => {
  return new Promise<void>(resolve => {
    server.close(() => {
      resolve()
    })
  })
}
beforeAll(async () => {
  await User.deleteMany({ email: { $regex: '@socket.io' } })
})
afterAll(async () => {
  users[0].clientSocket.close()
  users[1].clientSocket.close()
  await User.deleteMany({ email: { $regex: '@socket.io' } })
  await serverCleanup()
  mongoose.connection.close()
})

describe('Socket.IO connection testing', () => {
  const registerUser = async (user: socketUserModel) => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({ email: user.email, password: user.password })
      .expect(StatusCodes.CREATED)
    user.accessToken = response.body.token
  }
  const socketClientConnectionOpen = (user: socketUserModel, done: jest.DoneCallback) => {
    user.clientSocket = Client('http://localhost:' + process.env.PORT, {
      auth: {
        token: `bearer ${user.accessToken}`,
      },
    })
    user.clientSocket.on('connect', () => {
      done()
    })
  }
  it('register users to DB', async () => {
    await registerUser(users[0])
    await registerUser(users[1])
  })
  it('should open connection for users', done => {
    socketClientConnectionOpen(users[0], done)
    socketClientConnectionOpen(users[1], done)
  })
  it('should test echo event', done => {
    users[0].clientSocket.on('common:echo', (arg: string) => {
      expect(arg).toBe('echo message')
      done()
    })
    users[0].clientSocket.emit('common:echo', 'echo message')
  })
})
