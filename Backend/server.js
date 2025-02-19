const express = require('express')
const authRouter = require('./routes/auth.routes.js')
const userRouter = require('./routes/user.routes.js')
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