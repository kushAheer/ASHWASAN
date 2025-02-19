import express from 'express'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
const app = express()



app.use(express.json())



app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {

    console.log('Server is running on port 3000')
})