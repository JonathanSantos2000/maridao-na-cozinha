import { Router } from "express";
import { recipe_foods } from "../data/recipe";
import asyncHandler from "express-async-handler";
import { ReceipeModel } from "../models/recipe.model";

const router = Router();

/* Seed popular Database Mongo */
router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const recipeCount = await ReceipeModel.countDocuments();
    if (recipeCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await ReceipeModel.create(recipe_foods);
    res.send("Seed Is Done!");
  })
);

/* Pegar todas as receitas No MongoD */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const recipes = await ReceipeModel.find();
    res.send(recipes);
  })
);

/* Filtra receitas por id */
router.get(
  "/id/:id",
  asyncHandler(async (req, res) => {
    const recipe = await ReceipeModel.findById(req.params.id);
    res.send(recipe);
  })
);

/* Filtrar receitas por categoria */
router.get(
  "/categoria/:categoria",
  asyncHandler(async (req, res) => {
    const categoryRegEx = new RegExp(req.params.categoria, "i");
    const recipe = await ReceipeModel.find({
      categoria: { $regex: categoryRegEx },
    });
    res.send(recipe);
  })
);

export default router;
