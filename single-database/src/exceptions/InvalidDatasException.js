function InvalidDatasException(message, code) {
    this.name = "INVALID_DATAS_EXCEPTION";
    this.message = message;
    this.code = code || 400;
}

InvalidDatasException.prototype = Error.prototype;

module.exports = InvalidDatasException;