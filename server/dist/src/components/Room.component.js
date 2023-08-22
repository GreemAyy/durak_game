"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = __importDefault(require("../connections/socket"));
const App_1 = require("../App");
let IO;
function RoomComponent() {
    IO = new socket_1.default(App_1.app.http, '/room').io;
    room();
}
function room() {
    IO.on('connection', socket => {
        socket.on('message', msg => {
            console.log(msg);
        });
    });
}
exports.default = RoomComponent;
