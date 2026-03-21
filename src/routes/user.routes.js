import {Router} from "express";
import {registerUser} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser)//whenever /api/v1/users/register is hit then registerUser controller will be executed


export default router;