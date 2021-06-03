const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require('./Routes/users')
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/posts');


dotenv.config();

mongoose.connect('mongodb://localhost/Instagram',
{ useNewUrlParser: true,useUnifiedTopology: true },
  () => {
    console.log('connected to mongodb');
  }
);

//middleware

app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)

app.listen(5050,()=>{console.log('Server is lestening to port number 5050')})