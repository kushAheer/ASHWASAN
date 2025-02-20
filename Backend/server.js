const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes.js')
const userRouter = require('./routes/user.routes.js')
const app = express()
const MongoUrl = 'mongodb+srv://aashwasan445:2FXuldBckjw2mOTn@aashwasan.r9ia2.mongodb.net/?retryWrites=true&w=majority&appName=aashwasan';

main()
.then(()=>{console.log("connection spoted")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MongoUrl);
}


app.use(express.json())



app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {

    console.log('Server is running on port 3000')
})