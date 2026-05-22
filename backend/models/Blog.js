import mongoose from "mongoose";

const blogSchema =
  new mongoose.Schema(

    {

      title: String,

      description: String,

      image: String,

      video: String,

    },

    {

      timestamps: true,

    }
  );

export default mongoose.model(
  "Blog",
  blogSchema
);