import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import cors from "cors";
import recipeRouter from "./Routers/recipe.router";
import categoriaRouter from "./Routers/category.router";
import userRouter from "./Routers/user.router";
import newRecipeRouter from "./Routers/newRecipe.router";
/* import upload from "./Routers/upload.router"; */
import { dpConnect } from "./configs/database.config";

dpConnect();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:4200",
      "https://maridao-na-cozinha.onrender.com",
    ],
  })
);

app.use("/api/recipe", recipeRouter);
app.use("/api/categoria", categoriaRouter);
app.use("/api/users", userRouter);
app.use("/api/ask", newRecipeRouter);
/* app.use("/api", upload); */

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("okay");
});
