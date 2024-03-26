import { Router } from "express";
import { recipe_foods } from "../data/recipe";
import asyncHandler from "express-async-handler";
import { ReceipeModel, Recipe } from "../models/recipe.model";
import { NewPhotoModel } from "../models/photo.model";
import { NewRecipeModel } from "../models/newRecipe.model";

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

router.get(
  "/home",
  asyncHandler(async (req, res) => {
    const recipes = await ReceipeModel.aggregate([{ $sample: { size: 8 } }]);
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

router.post("/photo/status", async (req, res) => {
  const { idPhoto, url, status, nomeDaReceita, user } = req.body;
  let photo = {
    urlFoto: url,
    quemMandou: user,
  };

  try {
    const updatedPhoto = await NewPhotoModel.updateOne(
      { _id: idPhoto }, // Filter: Find the document with the given id
      { $set: { resposta: status } } // Update: Set the resposta field to the provided status
    );
    if (status == "Aprovado") {
      const updatedRecipe = await ReceipeModel.updateOne(
        { nomeDaReceita: nomeDaReceita },
        { $push: { foto: photo } }
      );
      res.send({ updatedPhoto, updatedRecipe });
    } else {
      res.send({ updatedPhoto });
    }
  } catch (error) {
    console.error("Error updating photo status:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/newRecipe/status", async (req, res) => {
  console.log("passei aqui");
  const { idNewrecipe, status } = req.body;
  console.log(idNewrecipe);
  try {
    const updatedRecipe = await NewRecipeModel.updateOne(
      { _id: idNewrecipe }, // Filter: Find the document with the given id
      { $set: { resposta: status } } // Update: Set the resposta field to the provided status
    );

    const foundRecipe = await NewRecipeModel.findById(idNewrecipe);

    if (status === "Aprovado" && foundRecipe) {
      const recipe: Recipe = {
        id: "foundRecipe.id",
        quemMandou: foundRecipe.quemMandou,
        nomeDaReceita: foundRecipe.nomeDaReceita,
        ingredientes: foundRecipe.ingredientes,
        modoDeFazer: foundRecipe.modoDeFazer,
        foto: [
          { urlFoto: foundRecipe.foto, quemMandou: foundRecipe.fotoAutor },
        ],
        categoria: foundRecipe.categoria,
        subcategoria: foundRecipe.subcategoria,
        tempoDePreparo: foundRecipe.tempoDePreparo,
        porcoes: foundRecipe.porcoes,
        nivelDeDificuldade: foundRecipe.nivelDeDificuldade,
        stars: foundRecipe.stars,
        favorite: foundRecipe.favorite,
        extra: foundRecipe.extra,
      };

      const dbRecipe = await ReceipeModel.create(recipe);

      res.send({ updatedRecipe, dbRecipe });
    }
    res.send({ updatedRecipe });
  } catch (error) {
    console.error("Error updating Recipe status:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
