"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class socket {
    constructor(http, path) {
        this.http = http;
        this.io = new socket_io_1.Server(http, { path, cors: { 'origin': 'http://localhost:5173' } });
    }
}
exports.default = socket;
