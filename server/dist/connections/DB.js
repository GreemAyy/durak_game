"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
class database {
    constructor(config) {
        this.conn = mysql2_1.default.createConnection(config);
    }
    query(str) {
        return new Promise((s, j) => {
            this.conn.query(str, (err, result) => {
                s(err ? { err } : { result });
            });
        });
    }
}
exports.default = database;
