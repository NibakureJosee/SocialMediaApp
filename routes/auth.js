import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";

const router = express.Router();

//CREATE A USER
router.post("/users", signup)

//SIGN IN
router.post("/user", signin)

//GOOGLE AUTH
router.post("/google", googleAuth)

export default router;
