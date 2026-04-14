import {Router} from "express";
import {registerUser , loginUser , logoutUser , refreshAccessToken} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verify } from "crypto";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",//expected exact "avatar" field from frontend form data
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)//whenever /api/v1/users/register is hit then registerUser controller will be executed

router.route("/login").post(
    //loginUser
    loginUser
)

//secured route (only for authenticated users)
router.route("/logout").post(
    //auth middleware
    //logoutUser controller
    verifyJWT,
    logoutUser
)

router.route("/refresh-access-token").post(
    refreshAccessToken
)

export default router;