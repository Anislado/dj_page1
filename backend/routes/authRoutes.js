import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/* REGISTRO */
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    /* VALIDAR SI YA EXISTE */
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    /* CREAR USUARIO */
    const newUser = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

   const token = jwt.sign(
  {
    id: newUser._id,
    role: newUser.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(201).json({
  message: "Usuario creado correctamente",
  token,
  user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error del servidor",
    });

  }

});

/* LOGIN */
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

   const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login correcto",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Error del servidor",
    });

  }

});

/* OBTENER USUARIOS */

router.get(
  "/users",

  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      res.json(users);

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