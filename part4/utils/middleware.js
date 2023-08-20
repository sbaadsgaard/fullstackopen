const logger = require("./logger")
const jwt = require("jsonwebtoken")
const requestLogger = (request, response, next) => {
    logger.info(
        `Method: ${request.method}`,
        `Path: ${request.path}`,
        `Body: ${JSON.stringify(request.body)}`,
        "--------")
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformed id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: error.message })
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
    const auth = request.get("authorization")
    request.token = (auth && auth.startsWith("Bearer "))
        ? auth.replace("Bearer ", "")
        : null

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({
            error: "Invalid token"
        })
    }
    request.user = decodedToken.id
    next()
}

module.exports = { requestLogger, errorHandler, tokenExtractor, userExtractor }