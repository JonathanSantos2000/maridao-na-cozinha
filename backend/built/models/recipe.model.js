"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceipeModel = exports.RecipeSchema = void 0;
var mongoose_1 = require("mongoose");
exports.RecipeSchema = new mongoose_1.Schema({
    nomeDaReceita: { type: String, required: true },
    quemMandou: { type: String, required: true },
    ingredientes: { type: [String], required: true },
    modoDeFazer: { type: String, required: true },
    foto: { type: [String], required: true },
    fotoAutor: { type: [String], required: true },
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
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
exports.ReceipeModel = (0, mongoose_1.model)("recipe", exports.RecipeSchema);
