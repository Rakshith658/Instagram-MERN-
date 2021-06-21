const io =require('socket.io')(5051,{
    cors:{
        origin:"http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("user is connected");
})