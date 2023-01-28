import express from "express";
import { addPost, addView, getByTag, getPost, random, search, foll, trend } from "../controllers/Post.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a post
router.post("/", verifyToken, addPost)
router.put("/:id", verifyToken, addPost)
router.delete("/:id", verifyToken, addPost)
router.get("/find/:id", getPost)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/foll",verifyToken, foll)
router.get("/tags", getByTag)
router.get("/search", search)

export default router;
