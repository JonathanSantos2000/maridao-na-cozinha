import { Schema, model } from "mongoose";

interface nomeSubCategory {
  nome: string;
  urlImg: string;
}

export interface Category {
  idCategory: number;
  nomeCategory: string;
  nomeSubCategory: nomeSubCategory[];
}

export const CategorySchema = new Schema<Category>(
  {
    nomeCategory: { type: String, required: true },
    nomeSubCategory: [
      {
        nome: { type: String, required: true },
        urlImg: { type: [String], required: true },
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

export const CategoryModel = model<Category>("category", CategorySchema);
