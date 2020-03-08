module.exports = (error, request, response, next) => {
    console.log(error);
    response.status(error.code).json({
        statusCode: error.code,
        error: error.message
    });
}