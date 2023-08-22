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
exports.generateDeck = void 0;
//P - piki T - trefi C- chervi B - bubny
const signs = ['P', 'T', 'C', 'B'];
const values = [6, 7, 8, 9, 10, 'V', 'D', 'K', 'T'];
const random = (max) => Math.floor(Math.random() * max);
const setDeck = () => {
    const totalDeck = [];
    for (let value of values) {
        for (let sign of signs) {
            totalDeck.push({ sign, value });
        }
    }
    return totalDeck;
};
const generateDeck = () => __awaiter(void 0, void 0, void 0, function* () {
    const deck = setDeck();
    const total = [];
    const checkInclude = [];
    while (total.length != deck.length) {
        const randomVal = random(deck.length);
        if (!checkInclude.includes(randomVal)) {
            checkInclude.push(randomVal);
            total.push(deck[randomVal]);
        }
    }
    const player1 = total.splice(0, 6);
    const player2 = total.splice(0, 6);
    const remaining = total;
    const trump = total[total.length - 1].sign;
    return { player1, player2, remaining, trump };
});
exports.generateDeck = generateDeck;
