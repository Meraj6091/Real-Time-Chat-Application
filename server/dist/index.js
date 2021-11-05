"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var PORT = process.env.PORT || 5000;
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    /**
     * Since Socket.IO v3, you need to explicitly enable Cross-Origin Resource Sharing
     * */
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.send('server is up and running');
});
io.on('connection', function (socket) {
    //connect socket
    console.log('Connected');
    socket.on('join', function (_a, callback) {
        var name = _a.name, room = _a.room;
        console.log(name, room);
    });
    socket.on('disconnect', function () {
        //disconnect socket
        console.log('Disconnected');
    });
});
app.use(router);
httpServer.listen(PORT, function () { return console.log("Server is running on port " + PORT); });
