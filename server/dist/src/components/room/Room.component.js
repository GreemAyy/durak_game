"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = __importDefault(require("../../connections/socket"));
const App_1 = require("../../App");
const Room_method_1 = require("./Room.method");
let IO;
function RoomComponent() {
    return __awaiter(this, void 0, void 0, function* () {
        IO = (new socket_1.default(App_1.http.http, "/room")).io;
        yield roomRest();
        yield roomSocket();
    });
}
function roomRest() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Room_method_1.APICreateGame)();
        yield (0, Room_method_1.APIConnectGame)();
    });
}
function roomSocket() {
    return __awaiter(this, void 0, void 0, function* () {
        IO.on("connection", (socket) => {
            socket.emit('message', 'hello!');
            socket.on("message", (msg) => {
                console.log(msg);
            });
        });
    });
}
exports.default = RoomComponent;
