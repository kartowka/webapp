import app from './app'
const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URL)
    // console.log('connected to mongoDB')
    app.listen(PORT, () =>
      // tslint:disable-next-line:no-console
      console.log(`server is listening on port ${PORT}`)
    )
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error)
  }
}

start()
