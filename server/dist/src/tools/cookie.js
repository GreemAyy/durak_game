"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCookiesAll = exports.setCookie = exports.getCookiesAll = void 0;
const getCookiesAll = () => {
    const cookies = document.cookie;
    const parsed = cookies.split(';');
    const total = {};
    if (cookies.length == 0)
        return [];
    else {
        for (let item of parsed) {
            const split = item.trim().split('=');
            total[split[0]] = split[1];
        }
    }
    return total;
};
exports.getCookiesAll = getCookiesAll;
const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/;`;
};
exports.setCookie = setCookie;
const clearCookiesAll = () => {
    document.cookie.split(";").forEach(function (cookie) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
};
exports.clearCookiesAll = clearCookiesAll;
