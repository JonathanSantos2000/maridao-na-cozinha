import { Router } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
/* import { client_user } from "../data/user"; */
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from "bcryptjs";
import { NewPhotoModel } from "../models/photo.model";
import { NewRecipeModel } from "../models/newRecipe.model";

const router = Router();

/* router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      res.send("Seed is already done!");
      return;
    }

    await UserModel.create(client_user);
    res.send("Seed Is Done!");
  })
); */

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.send(generateTokenReponse(user));
    } else {
      res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
      return;
    }
    const encryptedPassWord = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: "",
      name,
      email: email.toLowerCase(),
      password: encryptedPassWord,
      isAdmin: true,
    };
    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenReponse(dbUser));
  })
);

const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
    token: token,
  };
};

router.get(
  "/photos/:id",
  asyncHandler(async (req, res) => {
    const quemMandouRegEx = new RegExp(req.params.id);
    const photo = await NewPhotoModel.find({
      idQuemMandou: { $regex: quemMandouRegEx },
    });
    res.send(photo);
  })
);
/* Get photos by status */
router.get(
  "/photos/admin/:status",
  asyncHandler(async (req, res) => {
    const statusRegEx = new RegExp(req.params.status);
    const status = await NewPhotoModel.find({
      resposta: { $regex: statusRegEx },
    });
    res.send(status);
  })
);

router.get(
  "/newrecipes/admin/:status",
  asyncHandler(async (req, res) => {
    const statusRegEx = new RegExp(req.params.status);
    const status = await NewRecipeModel.find({
      resposta: { $regex: statusRegEx },
    });
    res.send(status);
  })
);

export default router;
