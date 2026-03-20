import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index: true
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname: {
        type : String,
        required : true,
        trim : true,
        index: true
    },
    avatar: {
        type : String,//cloudinary url
        required : true
    },
    coverImage: {
        type : String,

    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type :  String,
        required : [true , 'Password is required']
    },
    refreshToken: {
        type : String
    }
}, {timestamps : true})

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
    //only change the password if it has been modified (or is new)
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password) //true or false
}

userSchema.method.generateAccessToken = function () {
    return jwt.sign(
        {//payload
            _id : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )
}
userSchema.method.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

export const User = mongoose.model("User", userSchema)