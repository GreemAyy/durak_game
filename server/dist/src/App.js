"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.DB = exports.app = exports.http = void 0;
console.clear();
const http_1 = __importDefault(require("./connections/http"));
const DB_1 = __importDefault(require("./connections/DB"));
const DBC_1 = require("../DBC");
const def_1 = require("./def");
const _PORT = Number(process.env.PORT) || 4000;
exports.http = (() => {
    const app = new http_1.default();
    app.connect();
    return app;
})();
exports.app = exports.http.app;
exports.DB = (() => {
    const DB = new DB_1.default(DBC_1.DBC);
    DB.connect();
    return DB;
})();
const App = () => {
    for (let component of def_1.defineComponents) {
        component();
    }
};
exports.App = App;
exports.http.http.listen(_PORT);
