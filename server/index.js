const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const router = require('./router');
const path = require('path');
const app = express();
const server = http.createServer(app);
// app.use(express.json())
const {addUser,removeUser,getUser,getUserInRoom} = require('./user')
// Apply CORS middleware
app.use(cors({
    origin: "http://localhost:3000",
}));
// Initialize socket.io with CORS configuration
const io = socketio(server, {
    cors: {
        origin: "*",
    },
});

app.use(router);

/// Socket events
io.on('connect', (socket) => {
    console.log('We have a connection!!!');

    socket.on('join', ({ name, room }, callback) => {
   const {error,user} = addUser({id : socket.id,name,room})

   if(error) return callback(error);

   socket.emit('message',{user :'admin',text : `${user.room}, Welcome to the room ${user.room}`})
   socket.broadcast.to(user.room).emit('message',{user : 'admin',text : `${user.name}, has joined!`})
   socket.join(user.room);

   io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) });

callback()
});


socket.on('sendMessage',(message,callback) => {

    const user = getUser(socket.id)
    io.to(user.room).emit('message',{user : user.name ,text : message})
})

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user : 'admin',text : `${user.name} has left!`})
        }
    });
});

////////////////////////////////////////////deployment
const __dirName1 =path.resolve() 
const NODE_ENV = "production"
if(NODE_ENV == "production"){
app.use(express.static(path.join(__dirName1,"/chat-app/build")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirName1,"chat-app","build","index.html"));
})
}else{

    app.get('/', function(req,res){
        res.send('API running successfully')
        }
        )
}


////////////////////////////////////////////deployment

// Start the server
server.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
