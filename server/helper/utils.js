import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("../../config/config");
async function createHash(string) {
    const saltRounds = 10;
    const hashedString = await new Promise((resolve, reject) => {
        bcrypt.hash(string, saltRounds, function (err, hash) {
            if (err) reject(undefined)
            resolve(hash)
        });
    })
    return hashedString;
}
async function compareHash(hashedString, normalString) {
    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(normalString, hashedString, function (err, result) {
            if (err) reject(err)
            resolve(result)
        });
    });
    return result;
}
async function getToken(payload) {
    const token = await jwt.sign(payload, global.gConfig.jwtsecret, { expiresIn: "24h" })
    return token;
}


module.exports = {
    createHash,
    compareHash,
    getToken,
}