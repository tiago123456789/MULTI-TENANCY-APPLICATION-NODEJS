const jwt = require("jsonwebtoken");

class Token {

    constructor() {
        this._secret = process.env.JWT_SECRET;
        this._payload = {};
    }

    addItemInPayload(key, value) {
        this._payload[key] = value;
        return this;
    }

    build() {
        return jwt.sign(this._payload, this._secret, { expiresIn: "1h" })
    }

    isValid(token) {
        return jwt.verify(token, this._secret);
    }

    async getValueInPayload(key, token) {
        const payload = await jwt.decode(token);
        return payload[key];
    }

}

module.exports = Token;