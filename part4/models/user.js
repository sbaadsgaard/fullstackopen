const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be atleast 3 characters long"],
        unique: true
    },
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" })

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