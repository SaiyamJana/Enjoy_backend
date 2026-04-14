//importing asynHandler to handle async functions use for error handling
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {validateEmpty , validateEmailFormat} from "../validators/user.validation.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


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


    let avatarUpload = null;
    let coverUpload = null;

    try {
        const { fullname, email, username, password } = req.body;

        console.log("User details:", fullname, email, username, password);

        validateEmpty(fullname, email, username, password);
        validateEmailFormat(email);

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existedUser) {
            throw new ApiError(409, "User already exists");
        }

        const avatarLocalPath = req.files?.avatar?.[0]?.path;
        let imagesLocalPath;
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
            imagesLocalPath = req.files.coverImage[0].path;
        }

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar is required");
        }

        // Upload
        avatarUpload = await uploadOnCloudinary(avatarLocalPath);
        coverUpload = imagesLocalPath
            ? await uploadOnCloudinary(imagesLocalPath)
            : null;

        if (!avatarUpload) {
            throw new ApiError(500, "Avatar upload failed");
        }

        // ✅ Create user
        const user = await User.create({
            fullname,
            avatar: avatarUpload.url,
            coverImage: coverUpload?.url || "",
            email,
            username: username.toLowerCase(),
            password
        });

        const createdUser = await User.findById(user._id)
            .select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "User creation failed");
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        );

    } catch (error) {

        // 🔥 ROLLBACK (this is what you were missing)

        if (avatarUpload?.public_id) {
            console.log("Rolling back avatar upload...");
            await cloudinary.uploader.destroy(avatarUpload.public_id);
        }

        if (coverUpload?.public_id) {
            console.log("Rolling back cover image upload...");
            await cloudinary.uploader.destroy(coverUpload.public_id);
        }

        //local file cleanup
        const avatarLocalPath = req.files?.avatar?.[0]?.path;
        const coverLocalPath = req.files?.coverImage?.[0]?.path;

        if (avatarLocalPath && fs.existsSync(avatarLocalPath)) {
            fs.unlink(avatarLocalPath, () => {});
        }

        if (coverLocalPath && fs.existsSync(coverLocalPath)) {
            fs.unlink(coverLocalPath, () => {});
        }

        throw error; // let asyncHandler handle response
    }

})

export {registerUser}