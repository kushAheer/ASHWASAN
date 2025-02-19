import express from 'express'
import authRouter from './routes/auth.routes.js'

const app = express()



app.use(express.json())



app.use('/api/auth' , authRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {

    console.log('Server is running on port 3000')
})