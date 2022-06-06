import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controller/posts.js";
import auth from "../middleware/auth.js";

router.route("/").get(getPosts).post(auth, createPost);
router.route("/:id").patch(auth, updatePost).delete(auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/:id/commentPost", commentPost);

export default router;
