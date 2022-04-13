import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import Client, { Socket } from 'socket.io-client'
import request from 'supertest'

import User from '../models/User'
import server from '../server'
import { redisClientDisconnect } from '../socket-server.js'

type socketUserModel = {
  _id: string
  email: string
  password: string
  accessToken: string
  clientSocket: Socket
}
type InstantMessage = {
  body: string
  receiver: string
  sender: string
}

const users: socketUserModel[] = [
  {
    _id: '',
    email: 'user1@socket.io',
    password: '123456',
    accessToken: '',
    clientSocket: null,
  },
  {
    _id: '',
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
  await redisClientDisconnect()
})

describe('Socket.IO connection testing', () => {
  const registerUser = async (user: socketUserModel) => {
    await request(server)
      .post('/api/auth/register')
      .send({ email: user.email, password: user.password })
      .expect(StatusCodes.CREATED)
  }
  const loginUser = async (user: socketUserModel) => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(StatusCodes.OK)
    user.accessToken = response.body.token
    user._id = response.body.user._id
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
  it('should login users', async () => {
    await loginUser(users[0])
    await loginUser(users[1])
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
  it('should test ims', done => {
    const msg = { body: 'this is a test message', receiver: users[1]._id }
    users[0].clientSocket.emit('ims:instantMsg', msg)

    users[1].clientSocket.on('ims:instantMsg', (rcMsg: InstantMessage) => {
      expect(rcMsg.body).toBe(msg.body)
      expect(rcMsg.sender).toBe(users[0]._id)
      done()
    })
  })
})
