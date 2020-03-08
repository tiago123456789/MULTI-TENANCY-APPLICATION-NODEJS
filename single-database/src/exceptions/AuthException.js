function AuthException(message, code) {
    this.name = "AUTH_EXCEPTION";
    this.message = message;
    this.code = code || 401;
}

AuthException.prototype = Error.prototype;

module.exports = AuthException;