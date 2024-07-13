import { Server } from "socket.io";

const io = new Server(8000,{
  cors: true,
})

const socketidToEmailMap = new Map();
const emailToSocketidMap = new Map();

io.on("connection", (socket) => {
  socket.on("room:join" , data=>{
    const { email , room } = data;
    socketidToEmailMap.set( socket.id, email );
    emailToSocketidMap.set( email , socket.id );
    io.to(room).emit("user:joined", { email, id: socket.id})
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  })
});
