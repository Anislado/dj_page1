import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

/* OBTENER RESEÑAS */
router.get("/", async (req, res) => {

  try {

    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);

  } catch (error) {

    res.status(500).json({
      message: "Error servidor",
    });

  }

});

/* CREAR RESEÑA */
router.post("/", async (req, res) => {

  try {

    const { user, text } = req.body;

    const review = await Review.create({
      user,
      text,
    });

    res.status(201).json(review);

  } catch (error) {

    res.status(500).json({
      message: "Error servidor",
    });

  }

});

export default router;