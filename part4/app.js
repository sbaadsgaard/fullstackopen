const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

mongoose.set("strictQuery", false)
logger.info("connecting to", config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info("Connected to MongoDB"))
    .catch(error => logger.error("Error connecting to MongoDB", error))

app.use(cors())

app.use(express.json())

app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)


module.exports = app