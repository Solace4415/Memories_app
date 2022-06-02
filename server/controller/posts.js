import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    let postMessage = await PostMessage.findById(req.params.id);
    if (!postMessage) {
      return res.status(404).send("No post with that id");
    }

    postMessage = await PostMessage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    let postMessage = await PostMessage.findById(req.params.id);
    if (!postMessage) {
      return res.status(404).send("No post with that id");
    }

    await postMessage.remove(req.params.id);

    res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }

  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid(id))
  //   return res.status(404).send("No post with that id");

  //   await PostMessage.findByIdAndRemove(id)
  //   res.json({message: "Post Deleted"})
};

export const likePost = async (req, res) => {
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  try {
    const postMessage = await PostMessage.findById(req.params.id);
    if (!postMessage) {
      return res.status(404).send("No post with that id");
    }

    const index = postMessage.likes.findIndex(
      (id) => id === String(req.userId)
    );
    if (index === -1) {
      postMessage.likes.push(req.userId);
    } else {
      postMessage.likes = postMessage?.likes?.filter(
        (id) => id !== String(req.userId)
      );
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      req.params.id,
      postMessage,
      {
        new: true,
      }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
