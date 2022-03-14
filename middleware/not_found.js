import { StatusCodes } from 'http-status-codes'

const not_found_middleware = (req, res) => {
	res.status(StatusCodes.NOT_FOUND).send('routes does not found')
}
export default not_found_middleware
