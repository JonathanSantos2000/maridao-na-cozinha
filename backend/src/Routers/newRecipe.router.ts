import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { NewRecipe, NewRecipeModel } from "../models/newRecipe.model";
import multer from "multer";
import { storage, fileFilter } from "../configs/multer";

const router = Router();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

function toArray(ingrediente: string): string[] {
  const array = ingrediente.split(",").map((item) => item.trim());
  return array;
}

router.post(
  "/newRecipe",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const {
      nomeDaReceita,
      quemMandou,
      ingredientes,
      modoDeFazer,
      file,
      fotoAutor,
      categoria,
      subcategoria,
      tempoDePreparo,
      porcoes,
      nivelDeDificuldade,
      extra,
    } = req.body;
    let url = `${categoria}/${JSON.stringify(req.file?.filename)}`.replace(
      /"/g,
      ""
    );
    const recipe = await NewRecipeModel.findOne({ nomeDaReceita });
    if (recipe) {
      res.status(HTTP_BAD_REQUEST).send("Recipe is already exist");
      return;
    }

    const newRecipe: NewRecipe = {
      id: "",
      nomeDaReceita: nomeDaReceita,
      quemMandou: quemMandou,
      ingredientes: toArray(ingredientes),
      modoDeFazer: modoDeFazer,
      foto: url,
      fotoAutor: fotoAutor,
      categoria: categoria,
      subcategoria: subcategoria,
      tempoDePreparo: tempoDePreparo,
      porcoes: porcoes,
      nivelDeDificuldade: nivelDeDificuldade,
      stars: 0,
      favorite: false,
      resposta: "Verificando",
      copyright: true,
    };

    if (extra !== null) {
      const objRecipe = JSON.parse(extra);
      newRecipe.extra = objRecipe;
    }

    const dbRecipe = await NewRecipeModel.create(newRecipe);
    res.send(dbRecipe);
  })
);

router.get(
  "/newRecipe/:quemMandou",
  asyncHandler(async (req, res) => {
    const quemMandouRegEx = new RegExp(req.params.quemMandou);
    const recipe = await NewRecipeModel.find({
      quemMandou: { $regex: quemMandouRegEx },
    });
    res.send(recipe);
  })
);

router.get(
  "/newRecipe/idRecipe/:id",
  asyncHandler(async (req, res) => {
    try {
      const recipe = await NewRecipeModel.findById(req.params.id);
      res.send(recipe);
    } catch (error) {
      console.error("Erro ao filtrar por categoria e subcategoria:", error);
      res.status(500).send("Erro ao filtrar por categoria e subcategoria.");
    }
  })
);

export default router;
