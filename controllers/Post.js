import User from "../models/User.js";
import Post from "../models/Post.js";
import { createError } from "../error.js";

export const addPost = async (req, res, next) => {
  const newPost = new Post({ userId: req.user.id, ...req.body });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post) return next(createError(404, "Post not found!"));
    if (req.user.id === Post.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } else {
      return next(createError(403, "You can update only your Post!"));
    }
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post) return next(createError(404, "Post not found!"));
    if (req.user.id === Post.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("The Post has been deleted.");
    } else {
      return next(createError(403, "You can delete only your Post!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const Post = await Post.findById(req.params.id);
    res.status(200).json(Post);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const Posts = await Post.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(Posts);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const Posts = await Post.find().sort({ views: -1 });
    res.status(200).json(Posts);
  } catch (err) {
    next(err);
  }
};

export const foll = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const followings = user.followers;

    const list = await Promise.all(
      followings.map(async (follId) => {
        return await Post.find({ userId: follId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const Posts = await Post.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(Posts);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const Posts = await Post.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(Posts);
  } catch (err) {
    next(err);
  }
};
