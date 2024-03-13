import { Schema, model } from "mongoose";

interface Extra {
  nomeDaReceitaExtra: string;
  ingredientes: string[];
  modoDeFazer: string;
}

export interface NewRecipe {
  id: string;
  quemMandou: string;
  nomeDaReceita: string;
  ingredientes: string[];
  modoDeFazer: string;
  foto: string;
  fotoAutor: string;
  categoria: string;
  subcategoria: string;
  tempoDePreparo: string;
  porcoes: string;
  nivelDeDificuldade: string;
  stars: number;
  favorite: boolean;
  extra?: Extra[];
  resposta: string;
  copyright: boolean;
}

export const NewRecipeSchema = new Schema<NewRecipe>(
  {
    nomeDaReceita: { type: String, required: true },
    quemMandou: { type: String, required: true },
    ingredientes: { type: [String], required: true },
    modoDeFazer: { type: String, required: true },
    foto: { type: String, required: true },
    fotoAutor: { type: String, required: true },
    categoria: { type: String, required: true },
    subcategoria: { type: String, required: true },
    tempoDePreparo: { type: String, required: true },
    porcoes: { type: String, required: true },
    nivelDeDificuldade: { type: String, required: true },
    stars: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
    extra: [
      {
        nomeDaReceitaExtra: { type: String },
        ingredientes: { type: [String], required: true },
        modoDeFazer: { type: String, required: true },
      },
    ],
    resposta: { type: String, required: true },
    copyright: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const NewRecipeModel = model<NewRecipe>("newRecipe", NewRecipeSchema);
