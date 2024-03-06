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
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var http_status_1 = require("../constants/http_status");
var newRecipe_model_1 = require("../models/newRecipe.model");
var router = (0, express_1.Router)();
router.post("/newRecipe", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nomeDaReceita, quemMandou, ingredientes, modoDeFazer, foto, fotoAutor, categoria, subcategoria, tempoDePreparo, porcoes, nivelDeDificuldade, extra, recipe, newRecipe, dbRecipe;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, nomeDaReceita = _a.nomeDaReceita, quemMandou = _a.quemMandou, ingredientes = _a.ingredientes, modoDeFazer = _a.modoDeFazer, foto = _a.foto, fotoAutor = _a.fotoAutor, categoria = _a.categoria, subcategoria = _a.subcategoria, tempoDePreparo = _a.tempoDePreparo, porcoes = _a.porcoes, nivelDeDificuldade = _a.nivelDeDificuldade, extra = _a.extra;
                return [4 /*yield*/, newRecipe_model_1.NewRecipeModel.findOne({ nomeDaReceita: nomeDaReceita })];
            case 1:
                recipe = _b.sent();
                if (recipe) {
                    res.status(http_status_1.HTTP_BAD_REQUEST).send("Recipe is already exist");
                    return [2 /*return*/];
                }
                newRecipe = {
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
                return [4 /*yield*/, newRecipe_model_1.NewRecipeModel.create(newRecipe)];
            case 2:
                dbRecipe = _b.sent();
                console.log(dbRecipe);
                res.send(dbRecipe);
                return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
