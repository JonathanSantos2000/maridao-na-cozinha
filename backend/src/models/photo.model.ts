import { Schema, model } from "mongoose";

export interface NewPhoto {
  urlFoto: string;
  nomeReceita: string;
  idQuemMandou: string;
  quemMandou: string;
  resposta: string;
  copyright: boolean;
}

export const NewPhotoSchema = new Schema<NewPhoto>(
  {
    urlFoto: { type: String, required: true },
    nomeReceita: { type: String, required: true },
    idQuemMandou: { type: String, required: true },
    quemMandou: { type: String, required: true },
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

export const NewPhotoModel = model<NewPhoto>("newphoto", NewPhotoSchema);
