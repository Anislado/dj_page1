    import dotenv from "dotenv";

    dotenv.config();

      import express from "express";
    import mongoose from "mongoose";
    import cors from "cors";
    import helmet from "helmet";
    import rateLimit from "express-rate-limit";

  
  import reviewRoutes from "./routes/reviewRoutes.js";
  import authRoutes from "./routes/authRoutes.js";
  import productRoutes from "./routes/productRoutes.js";
  import paymentRoutes from "./routes/paymentRoutes.js";
  import orderRoutes from "./routes/orderRoutes.js";
  import blogRoutes from "./routes/blogRoutes.js";


console.log(
  "TOKEN MP:",
  process.env.MP_ACCESS_TOKEN
);

  const app = express();

  /* MIDDLEWARES */
  app.use(cors());


  /* HELMET */
  app.use(helmet());


  app.use(express.json());

  const limiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 1000,

  message:
    "Demasiadas peticiones, intenta más tarde",

});

app.use(limiter);


  /* RUTAS */
  app.use("/api/auth", authRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/orders", orderRoutes);

  app.use(
    "/api/blog",
    blogRoutes
  );

  app.use(
    "/api/payments",
    paymentRoutes
  );

  /* MONGODB */
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {

      console.log("MongoDB conectado");

    })
    .catch((error) => {

      console.log("Error MongoDB:", error);

    });

    mongoose.connection.on("connected", () => {

  console.log(
    "DB:",
    mongoose.connection.name
  );

});

  /* RUTA TEST */
  app.get("/", (req, res) => {

    res.send("API funcionando");

  });

  /* SERVER */
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {

    console.log(`Servidor activo en puerto ${PORT}`);

  });