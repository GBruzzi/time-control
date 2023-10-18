import express from 'express'
import userRoutes from './routes/users'

const app = express()

app.use(express.json())


app.use('/', userRoutes)

app.listen(8800, () => {
  console.log('server startado com sucesso')
})