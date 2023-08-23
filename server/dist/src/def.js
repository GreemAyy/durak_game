"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineComponents = void 0;
const Game_component_1 = __importDefault(require("./components/game/Game.component"));
const Room_component_1 = __importDefault(require("./components/room/Room.component"));
const User_component_1 = __importDefault(require("./components/user/User.component"));
exports.defineComponents = [
    Room_component_1.default,
    User_component_1.default,
    Game_component_1.default
];
