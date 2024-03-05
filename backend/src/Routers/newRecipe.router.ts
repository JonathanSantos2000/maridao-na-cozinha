import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { NewRecipe, NewRecipeModel } from "../models/newRecipe.model";
const router = Router();

router.post(
  "/newRecipe",
  asyncHandler(async (req, res) => {
    const {
      nomeDaReceita,
      quemMandou,
      ingredientes,
      modoDeFazer,
      foto,
      fotoAutor,
      categoria,
      subcategoria,
      tempoDePreparo,
      porcoes,
      nivelDeDificuldade,
      extra,
    } = req.body;

    const recipe = await NewRecipeModel.findOne({ nomeDaReceita });
    if (recipe) {
      res.status(HTTP_BAD_REQUEST).send("Recipe is already exist");
      return;
    }

    const newRecipe: NewRecipe = {
      id: "",
      nomeDaReceita: nomeDaReceita,
      quemMandou: quemMandou,
      ingredientes: ingredientes,
      modoDeFazer: modoDeFazer,
      foto: foto,
      fotoAutor: fotoAutor,
      categoria: categoria,
      subcategoria: subcategoria,
      tempoDePreparo: tempoDePreparo,
      porcoes: porcoes,
      nivelDeDificuldade: nivelDeDificuldade,
      stars: 0,
      favorite: false,
      extra: extra,
      resposta: "Verificando",
      copyright: false,
    };
    const dbRecipe = await NewRecipeModel.create(newRecipe);
    console.log(dbRecipe);
    res.send(dbRecipe);
  })
);

export default router;
