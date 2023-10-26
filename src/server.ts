import express from 'express'
import userRoutes from './routes/users'
import subjectsRoutes from './routes/subjects'

const app = express()

app.use(express.json())


app.use('/', userRoutes)
app.use('/', subjectsRoutes)

app.listen(8800, () => {
  console.log('server startado com sucesso')
})