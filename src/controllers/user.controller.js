//importing asynHandler to handle async functions use for error handling
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {validateEmpty , validateEmailFormat} from "../validators/user.validation.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req , res) => {
    //get user details from frontend
    //validation of details received from frontend
    //check if user already exists in database : username , email
    //check for images
    //chec for avatar
    //upload them to cloudinary , avatar and images
    //create user object - create entry in database
    //remove password and refresh token from response
    //check for user creation
    //return response to frontend


    const {fullname , email , username , password} = req.body;
    console.log("User details received from frontend: ", fullname , email , username , password);

    validateEmpty(fullname, email, username, password);
    validateEmailFormat(email);

    const existedUser = await User.findOne({
        $or: [{email} , {username}]
    })

    if(existedUser){
        throw new ApiError("409" , "User already exists with this email or username")
    }

    //take avatar and cover image from req.files from frontend
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const imagesLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError("400" , "Avatar is required")
    }

    //upload avatar and cover image to cloudinary
    const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
    const coverImageUrl = imagesLocalPath ? await uploadOnCloudinary(imagesLocalPath) : null;

    if(!avatarUrl){
        throw new ApiError("500" , "Failed to upload avatar to cloudinary")
    }

    //entry in database
    const user = await User.create({
        fullname,
        avatar: avatarUrl.url,
        coverImage: coverImageUrl?.url || "",
        email,
        username : username.toLowerCase(),
        password
    })

    //checking for user creation and removing password and refresh token from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError("500" , "Something went wrong while creating user")
    }

    //return response to frontend
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

export {registerUser}