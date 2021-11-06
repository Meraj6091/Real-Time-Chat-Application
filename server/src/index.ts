import express, { Request, Response, NextFunction } from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { addUser, getUser, removeUser, getUsersInRoom } from './helpers';
const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    /**
     * Since Socket.IO v3, you need to explicitly enable Cross-Origin Resource Sharing
     * */
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('server is up and running');
});

io.on('connection', (socket: Socket) => {
    //connect socket
    console.log('Connected');
    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const { error, user } = addUser({ id: socket.id, name: name, room: room });
        if (error) {
            return callback(error);
        }
        socket.emit('message', { user: 'admin', text: `${user?.name} , welcome to the room ${user?.room}` });
        socket.broadcast.to(user?.room).emit('message', { user: 'admin', text: `${user?.name}, has joined!` });
        socket.join(user?.room);

        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
    socket.on('disconnect', () => {
        //disconnect socket
        console.log('Disconnected');
    });
});
app.use(router);
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
