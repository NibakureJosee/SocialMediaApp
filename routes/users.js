import express from "express";
import {
  update,
  deleteUser,
  getUser,
  follow,
  unfollow,
  like,
  dislike,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user
router.put("/:username", verifyToken, update);

//delete user
router.delete("/:username", verifyToken, deleteUser);

//get a user
router.get("/:username", getUser);

//follow a user
router.post("/:username/follow", verifyToken, follow);

//unfollow a user
router.delete("/:username/follow", verifyToken, unfollow);

//like a post
router.put("/like/:PostId", verifyToken, like);

//dislike a post
router.put("/dislike/:PostId", verifyToken, dislike);

export default router;
