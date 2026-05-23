import express from "express";

import Order from "../models/Order.js";

const router = express.Router();

/* CREAR PEDIDO */
router.post("/", async (req, res) => {

  try {

    const order = await Order.create(
      req.body
    );

    res.status(201).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error servidor",
    });

  }

});

/* OBTENER PEDIDOS */
router.get("/", async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error servidor",
    });

  }

});

/* ACTUALIZAR ESTADO DE PEDIDO */
router.put("/:id", async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {

      return res.status(404).json({

        message:
          "Pedido no encontrado"

      });

    }

    res.json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error servidor",

    });

  }

});

/* ELIMINAR PEDIDO */
router.delete("/:id", async (req, res) => {

  try {

    await Order.findByIdAndDelete(
      req.params.id
    );

    res.json({

      message:
        "Pedido eliminado",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Error servidor",

    });

  }

});

export default router;

