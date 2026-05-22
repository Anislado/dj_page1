import express from "express";
import Product from "../models/Product.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

/* OBTENER PRODUCTOS */
router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error obteniendo productos",
    });

  }

});

/* CREAR PRODUCTO */
router.post(
  "/",
  verifyToken,
  verifyAdmin,
  async (req, res) => {

  try {

    const product = await Product.create(
      req.body
    );

    res.status(201).json(product);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error servidor",
    });

  }

});

/* ELIMINAR PRODUCTO */
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,

  async (req, res) => {

    try {

      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Producto eliminado",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Error servidor",

      });

    }

  }
);

export default router;