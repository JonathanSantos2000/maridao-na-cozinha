import { Router, static as static_ } from "express";
import multer from "multer";
import { storage, fileFilter } from "../configs/multer";
import asyncHandler from "express-async-handler";
import { NewPhoto, NewPhotoModel } from "../models/photo.model";

const router = Router();

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.use("/files", static_("uploads"));

router.post(
  "/upload",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const { category, recipeName, idUserSend, userSend } = req.body;

    let url = `${category}/${JSON.stringify(req.file?.filename)}`.replace(
      /"/g,
      ""
    );

    const newPhoto: NewPhoto = {
      urlFoto: url,
      nomeReceita: recipeName,
      idQuemMandou: idUserSend,
      quemMandou: userSend,
      copyright: true,
      resposta: "Verificando",
    };
    const dbNewPhoto = await NewPhotoModel.create(newPhoto);
    res.send("");
  })
);

export default router;
