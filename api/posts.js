const express = require("express");
const postsRouter = express.Router();
const { getAllPosts, createPost, getAllUsersPosts, deletePost } = require("../db");
const { requireUser } = require("./utils");

postsRouter.get("/", async (req, res) => {

  try {
    const posts = await getAllPosts();

    res.send(posts);
  }
  catch (err) {
    res.sendStatus(500);
  }
});

postsRouter.get("/myPosts", requireUser, async (req, res) => {
 
  try {
    const posts = await getAllUsersPosts(req.user.id);

    res.send(posts);
  }
  catch (err) {
    res.sendStatus(500);
  }
})


postsRouter.post("/", requireUser, async (req, res) => {

  try {

    const { title, content } = req.body;
 
    const newlyCreatedPost = await createPost({
      title,
      content,
      ownerId: req.user.id
    });

    res.send(newlyCreatedPost);
  } catch (err) {
    res.sendStatus(500);
  }
});

postsRouter.delete("/:id", requireUser, async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await deletePost(postId);
    res.send(result);
  } catch (err) {
    res.sendStatus(500);
  }
})


module.exports = postsRouter;