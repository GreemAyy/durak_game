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
exports.APIConnectGame = exports.getGameByID = exports.APIGetGamesList = exports.APICreateGame = void 0;
const createDeck_1 = require("../../gameFunctions/createDeck");
const App_1 = require("../../App");
const Room_query_1 = require("../../querys/Room.query");
function APICreateGame() {
    return __awaiter(this, void 0, void 0, function* () {
        App_1.app.post('/api/room/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const playerID = req.body.playerID;
            const checkUserHaveGame = yield App_1.DB.query((0, Room_query_1.queryRoomCheckInGame)(playerID));
            if ((yield ((_a = checkUserHaveGame.result) === null || _a === void 0 ? void 0 : _a.length)) == 0) {
                const query = (0, Room_query_1.queryRoomCreateGame)(playerID, yield (0, createDeck_1.generateDeck)());
                const createReq = yield App_1.DB.query(query);
                res.send({ status: 200, responseText: 'created', gameID: createReq.result.insertId });
            }
            else if ((yield ((_b = checkUserHaveGame.result) === null || _b === void 0 ? void 0 : _b.length)) > 0)
                res.send({ status: 400, responseText: 'already', gameID: checkUserHaveGame.result[0].id });
            else
                res.send({ status: 400, responceText: 'error' });
        }));
    });
}
exports.APICreateGame = APICreateGame;
function APIGetGamesList() {
    return __awaiter(this, void 0, void 0, function* () {
        App_1.app.get('/api/room/list', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const DBReq = yield App_1.DB.query("SELECT `id`, `player_1_id`, `player_2_id`, `status` FROM `game` WHERE `status`<>'end'");
            if (DBReq.result)
                res.send({ status: 200, responseText: 'getted', result: DBReq.result });
            else
                res.send({ status: 400, responseText: 'error' });
        }));
    });
}
exports.APIGetGamesList = APIGetGamesList;
const getGameByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const DBReq = yield App_1.DB.query('SELECT `id`, `player_1_id`, `player_2_id`, `status` FROM `game` WHERE id=' + id);
    return DBReq.result;
});
exports.getGameByID = getGameByID;
function APIConnectGame() {
    return __awaiter(this, void 0, void 0, function* () {
        App_1.app.post('/api/room/connect', (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const gameID = req.body.gameID;
            const playerID = req.body.playerID;
            const checkStatus = yield App_1.DB.query((0, Room_query_1.queryRoomCheckStatus)(gameID));
            const checkUserHaveGame = yield App_1.DB.query((0, Room_query_1.queryRoomCheckInGame)(playerID));
            //  
            const result = checkStatus.result[0];
            if (checkStatus.result && ((_a = checkUserHaveGame.result) === null || _a === void 0 ? void 0 : _a.length) == 0) {
                if (result.status == 'wait' && result['player_1_id'] == playerID)
                    /*->*/ res.send({ status: 200, responseText: 'wait' });
                //
                else if (result.status == 'wait' && result['player_1_id'] != playerID) {
                    const query = (0, Room_query_1.queryRoomConnect)({ gameID, playerID, status: 'game', position: 2 });
                    const connect = yield App_1.DB.query(query);
                    res.send({ status: connect.error ? 400 : 200,
                        responseText: connect.error ? 'error' : 'connected' });
                }
                //
                else if (result.status == 'game' &&
                    (result['player_1_id'] != playerID || result['player_2_id'] != playerID))
                    /*->*/ res.send({ status: 400, responseText: 'no' });
                else
                    /*->*/ res.send({ status: 200, responseText: 'connected' });
            }
            else if ((result === null || result === void 0 ? void 0 : result.status) != 'end' && ((result === null || result === void 0 ? void 0 : result['player_1_id']) == playerID ||
                (result === null || result === void 0 ? void 0 : result['player_2_id']) == playerID))
                res.send({ status: 200, responseText: 'connected' });
            else if (((_b = checkUserHaveGame === null || checkUserHaveGame === void 0 ? void 0 : checkUserHaveGame.result) === null || _b === void 0 ? void 0 : _b.length) > 0)
                res.send({ status: 200, responseText: 'already' });
            else
                res.send({ status: 404, responseText: 'error' });
        }));
    });
}
exports.APIConnectGame = APIConnectGame;
