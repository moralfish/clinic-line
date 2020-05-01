import * as express from 'express';
import apiRouter from './routes';
import * as http from "http";
const socketIo = require("socket.io");


const app = express();

app.use(express.static('public'));
app.use(apiRouter);

const port = 3000;
const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
    console.log("Client connected");
    interval = setInterval(() => getNextTurn(socket), 5000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

let turn = 1;
const getNextTurn = socket => {
    socket.emit("next-turn", turn);
    turn++;
};

server.listen(port, () => console.log(`Listening on port ${port}`));
