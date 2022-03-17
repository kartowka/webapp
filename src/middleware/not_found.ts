import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'

const notFoundMiddleware = (req: Request, res: Response) => {
	res.status(StatusCodes.NOT_FOUND).send('routes does not found')
}
export default notFoundMiddleware
