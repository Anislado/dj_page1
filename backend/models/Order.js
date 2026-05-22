import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {

    user: {

      type: String,

      required: true,

    },

    items: [

      {

        title: String,

        price: Number,

        quantity: Number,

        image: String,

      },

    ],

    total: {

      type: Number,

      required: true,

    },

    status: {

      type: String,

      default: "Pendiente",

    },

  },

  {

    timestamps: true,

  }
);

export default mongoose.model(
  "Order",
  orderSchema
);