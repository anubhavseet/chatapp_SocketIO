
const app = require("express")()

const server = require("http").createServer(app)

const io = require("socket.io")(server,{
    cors:{
        origin:"*",
    }
})

io.on("connection",(socket)=>{
     console.log("What is socket",socket);
     socket.on("chat",(payload)=>{
        console.log("What is paylod",payload);
        io.emit("chat",payload)
     })
})

server.listen(3000,()=>{
    console.log("server is runnig at 3000 port")
})