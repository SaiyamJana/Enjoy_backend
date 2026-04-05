import {Router} from "express";
import {registerUser} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

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


export default router;