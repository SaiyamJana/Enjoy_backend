//checking fullname , email , password , username if its empty
import {ApiError} from "../utils/ApiError.js";

const validateEmpty = (fullname , email , username , password) => {
    if(fullname?.trim() === ""){
        throw new ApiError("400" , "Fullname is required")
    }
    if(email?.trim() === ""){
        throw new ApiError("400" , "Email is required")
    }
    if(username?.trim() === ""){
        throw new ApiError("400" , "Username is required")
    }
    if(password?.trim() === ""){
        throw new ApiError("400" , "Password is required")
    }
}

//email format validation
const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        throw new ApiError("400" , "Invalid email format")
    }
}

export {validateEmpty , validateEmailFormat}