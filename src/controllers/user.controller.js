//importing asynHandler to handle async functions use for error handling
import {asyncHandler} from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req , res) => {
    console.log("REGISTER USER CONTROLLER CALLED !!")
    return res.status(200).json({
        message: "User registered successfully"
    })
})

export {registerUser}