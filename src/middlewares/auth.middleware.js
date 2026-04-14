import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if(!accessToken){
            throw new ApiError(401 , "Unauthorized request (access token missing)");
        }
    
    
        const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    
        if(!user){
            throw new ApiError(401 , "Invalid Access Token (user not found)");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401 , error?.message || "Unauthorized request (invalid access token)");
    }
})