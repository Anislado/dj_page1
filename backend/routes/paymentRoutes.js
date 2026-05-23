import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mercadopago from "mercadopago";

const router = express.Router();

/* CONFIG */
mercadopago.configure({

  access_token:
    process.env.MP_ACCESS_TOKEN,

});

/* CREAR PREFERENCIA */
router.post(
  "/create-preference",

  async (req, res) => {

    try {

      const { items } = req.body;

      const preference = {

        items: items.map(
          (item) => ({

            title:
              item.title,

            quantity:
              Number(item.quantity),

            unit_price:
              Number(item.price),

            currency_id:
              "MXN",

          })
        ),

        back_urls: {

          success:
            "https://www.google.com",

          failure:
            "https://www.google.com",

          pending:
            "https://www.google.com",

        },

      };

      const response =
        await mercadopago.preferences.create(
          preference
        );

      console.log(response.body);

      res.json({

        init_point:
          response.body.init_point,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Error Mercado Pago",

      });

    }

  }
);

export default router;