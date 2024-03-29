"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var recipe_1 = require("../data/recipe");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var recipe_model_1 = require("../models/recipe.model");
var photo_model_1 = require("../models/photo.model");
var newRecipe_model_1 = require("../models/newRecipe.model");
var router = (0, express_1.Router)();
/* Seed popular Database Mongo */
router.get("/seed", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, recipe_model_1.ReceipeModel.countDocuments()];
            case 1:
                recipeCount = _a.sent();
                if (recipeCount > 0) {
                    res.send("Seed is already done!");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, recipe_model_1.ReceipeModel.create(recipe_1.recipe_foods)];
            case 2:
                _a.sent();
                res.send("Seed Is Done!");
                return [2 /*return*/];
        }
    });
}); }));
/* Pegar todas as receitas No MongoD */
router.get("/", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, recipe_model_1.ReceipeModel.find()];
            case 1:
                recipes = _a.sent();
                res.send(recipes);
                return [2 /*return*/];
        }
    });
}); }));
router.get("/home", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, recipe_model_1.ReceipeModel.aggregate([{ $sample: { size: 8 } }])];
            case 1:
                recipes = _a.sent();
                res.send(recipes);
                return [2 /*return*/];
        }
    });
}); }));
/* Filtra receitas por id */
router.get("/id/:id", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, recipe_model_1.ReceipeModel.findById(req.params.id)];
            case 1:
                recipe = _a.sent();
                res.send(recipe);
                return [2 /*return*/];
        }
    });
}); }));
/* Filtrar receitas por categoria */
router.get("/categoria/:categoria", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryRegEx, recipe;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryRegEx = new RegExp(req.params.categoria, "i");
                return [4 /*yield*/, recipe_model_1.ReceipeModel.find({
                        categoria: { $regex: categoryRegEx },
                    })];
            case 1:
                recipe = _a.sent();
                res.send(recipe);
                return [2 /*return*/];
        }
    });
}); }));
router.post("/photo/status", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idPhoto, url, status, nomeDaReceita, user, photo, updatedPhoto, updatedRecipe, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, idPhoto = _a.idPhoto, url = _a.url, status = _a.status, nomeDaReceita = _a.nomeDaReceita, user = _a.user;
                photo = {
                    urlFoto: url,
                    quemMandou: user,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, photo_model_1.NewPhotoModel.updateOne({ _id: idPhoto }, // Filter: Find the document with the given id
                    { $set: { resposta: status } } // Update: Set the resposta field to the provided status
                    )];
            case 2:
                updatedPhoto = _b.sent();
                if (!(status == "Aprovado")) return [3 /*break*/, 4];
                return [4 /*yield*/, recipe_model_1.ReceipeModel.updateOne({ nomeDaReceita: nomeDaReceita }, { $push: { foto: photo } })];
            case 3:
                updatedRecipe = _b.sent();
                res.send({ updatedPhoto: updatedPhoto, updatedRecipe: updatedRecipe });
                return [3 /*break*/, 5];
            case 4:
                res.send({ updatedPhoto: updatedPhoto });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.error("Error updating photo status:", error_1);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
router.post("/newRecipe/status", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idNewrecipe, status, updatedRecipe, foundRecipe, recipe, dbRecipe, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("passei aqui");
                _a = req.body, idNewrecipe = _a.idNewrecipe, status = _a.status;
                console.log(idNewrecipe);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, newRecipe_model_1.NewRecipeModel.updateOne({ _id: idNewrecipe }, // Filter: Find the document with the given id
                    { $set: { resposta: status } } // Update: Set the resposta field to the provided status
                    )];
            case 2:
                updatedRecipe = _b.sent();
                return [4 /*yield*/, newRecipe_model_1.NewRecipeModel.findById(idNewrecipe)];
            case 3:
                foundRecipe = _b.sent();
                if (!(status === "Aprovado" && foundRecipe)) return [3 /*break*/, 5];
                recipe = {
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
                return [4 /*yield*/, recipe_model_1.ReceipeModel.create(recipe)];
            case 4:
                dbRecipe = _b.sent();
                res.send({ updatedRecipe: updatedRecipe, dbRecipe: dbRecipe });
                _b.label = 5;
            case 5:
                res.send({ updatedRecipe: updatedRecipe });
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.error("Error updating Recipe status:", error_2);
                res.status(500).send("Internal Server Error");
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
