import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recipeRouter from "./Routers/recipe.router";
import categoriaRouter from "./Routers/category.router";
import userRouter from "./Routers/user.router";
import { dpConnect } from "./configs/database.config";

dpConnect();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/recipe", recipeRouter);
app.use("/api/categoria", categoriaRouter);
app.use("/api/users", userRouter);

const port = 5000;
app.listen(port, () => {
  console.log("okay");
});
