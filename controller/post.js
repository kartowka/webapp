const getPosts = (req, res) => {
	res.send('APP GET POST')
}
const createNewPost = (req, res) => {
	res.send('APP POST POST')
}

export { getPosts, createNewPost }
