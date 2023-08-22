"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
class database {
    constructor(config) {
        this.config = config;
    }
    connect() {
        this.conn = mysql2_1.default.createConnection(this.config);
    }
    query(str) {
        return new Promise((s, j) => {
            this.conn.query(str, (err, result) => {
                s(err ? { error: err } : { result });
            });
        });
    }
}
exports.default = database;
