import multer from "multer";
import path from "path";
import { Request, Response } from "express";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const parts = file.originalname.split("_");
    const category = parts[0];
    const destinationPath = path.resolve("uploads", category);

    callback(null, destinationPath);
  },
  filename: (req, file, callback) => {
    const time = new Date().getTime();

    // Mantenha o nome original do arquivo, incluindo o caminho do diretório
    callback(null, `${time}_${file.originalname}`);
  },
});

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = [".jpg", ".jpeg", ".png"];
  console.log(file);
  // Obter a extensão do arquivo
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
  }
};
