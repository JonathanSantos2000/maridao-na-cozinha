import { Router } from "express";
import { category_recipe } from "../data/category";
import asyncHandler from "express-async-handler";
import { CategoryModel } from "../models/category.model";
import { ReceipeModel } from "../models/recipe.model";

const router = Router();

/* Seed popular Database Mongo */
router.get(
  "/seed",
  asyncHandler(async (req, res) => {
    const categoryCount = await CategoryModel.countDocuments();
    if (categoryCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await CategoryModel.create(category_recipe);
    res.send("Seed Is Done!");
  })
);
/* Pegar todas as CATEGORIAS No MongoD */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categoria = await CategoryModel.find();
    res.send(categoria);
  })
);

/* Filtrar categoria*/
router.get(
  "/:categoria",
  asyncHandler(async (req, res) => {
    const categoryRegEx = new RegExp(req.params.categoria, "i");
    const category = await CategoryModel.find({
      nomeCategory: { $regex: categoryRegEx },
    });
    res.send(category);
  })
);

/* Filtrar por categoria e subcategoria*/
router.get(
  "/:categoria/subcategoria/:subcategoria",
  asyncHandler(async (req, res) => {
    try {
      const categoryRegEx = new RegExp(req.params.categoria, "i");
      const subCategoryRegEx = new RegExp(req.params.subcategoria, "i");

      const recipes = await ReceipeModel.find({
        categoria: categoryRegEx,
        subcategoria: subCategoryRegEx,
      });
      res.send(recipes);
    } catch (error) {
      console.error("Erro ao filtrar por categoria e subcategoria:", error);
      res.status(500).send("Erro ao filtrar por categoria e subcategoria.");
    }
  })
);

export default router;
