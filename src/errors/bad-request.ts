import { StatusCodes } from 'http-status-codes'

import CustomAPIError from './custom-api'

class BadRequestError extends CustomAPIError {
  StatusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.StatusCode = StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError
