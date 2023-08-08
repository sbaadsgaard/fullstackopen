const logger = require("./logger")
const requestLogger = (request, response, next) => {
    logger.info(
        `Method: ${request.method}`,
        `Path: ${request.path}`,
        `Body: ${JSON.stringify(request.body)}`,
        "--------")
    next()
}

module.exports = { requestLogger }