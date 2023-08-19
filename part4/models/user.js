const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
    },
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.set("toJSON", {
    transform: (doc, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
        delete returned.passwordHash //hide the hash from the client
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User