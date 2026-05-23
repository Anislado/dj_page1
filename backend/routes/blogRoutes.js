import express from "express";

import Blog from "../models/Blog.js";

const router = express.Router();

/* OBTENER POSTS */
router.get("/", async (req, res) => {

  const posts = await Blog.find();

  res.json(posts);

});

/* CREAR POST */
router.post("/", async (req, res) => {

  try {

    const post =
      await Blog.create(req.body);

    res.json(post);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error servidor",

    });

  }

});

export default router;