//importing asynHandler to handle async functions use for error handling
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {validateEmpty , validateEmailFormat} from "../validators/user.validation.js";


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

})

export {registerUser}