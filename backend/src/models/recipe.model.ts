import { Schema, model } from "mongoose";

interface Extra {
  urlFoto: string;
  quemMandou: string;
}
interface Foto {
  nomeDaReceitaExtra?: string;
  ingredientes: string[];
  modoDeFazer: string;
}
export interface Recipe {
  id: string;
  quemMandou: string;
  nomeDaReceita: string;
  ingredientes: string[];
  modoDeFazer: string;
  foto: Foto[];
  categoria: string;
  subcategoria: string;
  tempoDePreparo: string;
  porcoes: string;
  nivelDeDificuldade: string;
  stars: number;
  favorite: boolean;
  extra?: Extra[];
}

export const RecipeSchema = new Schema<Recipe>(
  {
    nomeDaReceita: { type: String, required: true },
    quemMandou: { type: String, required: true },
    ingredientes: { type: [String], required: true },
    modoDeFazer: { type: String, required: true },
    foto: [
      {
        urlFoto: { type: String, required: true },
        quemMandou: { type: String, required: true },
      },
    ],
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

export const ReceipeModel = model<Recipe>("recipe", RecipeSchema);
