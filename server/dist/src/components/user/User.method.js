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
Object.defineProperty(exports, "__esModule", { value: true });
exports.APICreateUser = void 0;
const App_1 = require("../../App");
const App_2 = require("../../App");
const User_query_1 = require("../../querys/User.query");
function APICreateUser() {
    return __awaiter(this, void 0, void 0, function* () {
        App_2.app.post('/api/user/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const create = yield App_1.DB.query((0, User_query_1.queryUserCreate)(body));
            if (create.result)
                res.send({ status: 200, responseText: 'created', userID: create.result.insertId });
            else
                res.send({ status: 400, responseText: 'err' });
        }));
    });
}
exports.APICreateUser = APICreateUser;
