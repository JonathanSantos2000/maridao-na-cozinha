import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import recipeRouter from "./Routers/recipe.router";
import categoriaRouter from "./Routers/category.router";
import { dpConnect } from "./configs/database.config";
dpConnect();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/recipe", recipeRouter);
app.use("/api/categoria", categoriaRouter);

const port = 5000;
app.listen(port, () => {
  console.log("okay");
});
