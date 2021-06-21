const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer")
const path = require("path")

const userRoute = require('./Routes/users')
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/posts');
const convarsationRoute = require('./Routes/convarsation');
const messagesRoute = require('./Routes/messages');


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

// app.use("/images",express.static(path.join(__dirname,"public/image")))
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images")
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
})

const upload = multer({storage})
app.post('/api/upload',upload.single("file"),(req,res)=>{
  try {
    return res.status(200).json("File uploaded successfully")
  } catch (error) {
    console.log(error);
  }
})

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/convarsation',convarsationRoute)
app.use('/api/messages',messagesRoute)

app.listen(5050,()=>{console.log('Server is lestening to port number 5050')})