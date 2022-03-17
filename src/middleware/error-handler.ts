import { StatusCodes } from 'http-status-codes'
import { Request, Response ,NextFunction} from 'express'


const errorHandlerMiddleware = (err: { StatusCode: any; message: any; name: string; errors: { [s: string]: any } | ArrayLike<unknown>; code: number; keyValues: {} }, req:Request, res:Response,next:NextFunction) => {
	const defaultError = {
		statusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong,try again later',
	}
	if (err.name === 'ValidationError') {
		defaultError.statusCode = StatusCodes.BAD_REQUEST
		// defaultError.msg = err.message
		defaultError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',')
	}
	if (err.code && err.code === 11000) {
		defaultError.statusCode = StatusCodes.BAD_REQUEST
		defaultError.msg = `${Object.keys(err.keyValues)} field has to be unique`
	}
	res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}

export default errorHandlerMiddleware
