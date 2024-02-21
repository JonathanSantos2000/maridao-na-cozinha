import express from "express";
import cors from "cors";
import { recipe_foods } from "../data/recipe";
import { category_recipe } from "../data/category";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/recipe", (req, res) => {
  res.send(recipe_foods);
});

/* Filtra receitas por id */
app.get("/api/recipe/id/:id", (req, res) => {
  const idRecipe = req.params.id;
  const recipe = recipe_foods.filter((recipe) => recipe.id == idRecipe);
  res.send(recipe);
});

/* Filtrar receitas por categoria */
app.get("/api/recipe/categoria/:categoria", (req, res) => {
  const category = req.params.categoria;
  const recipe = recipe_foods.filter((recipe) =>
    recipe.Categoria.toLocaleLowerCase().includes(category.toLocaleLowerCase())
  );
  res.send(recipe);
});

/* Filtrar categoria*/
app.get("/api/categoria/:categoria", (req, res) => {
  const category = req.params.categoria;
  const recipe = category_recipe.filter((recipeCategory) =>
    recipeCategory.nomeCategory
      .toLocaleLowerCase()
      .includes(category.toLocaleLowerCase())
  );

  res.send(recipe);
});

/* Filtrar por categoria e subcategoria*/
app.get("/api/categoria/:categoria/subcategoria/:subcategoria", (req, res) => {
  const category = req.params.categoria;
  const subcategoria = req.params.subcategoria;
  const recipe = recipe_foods.filter(
    (recipe) =>
      recipe.Categoria.toLocaleLowerCase() === category.toLocaleLowerCase() &&
      recipe.Subcategoria.toLocaleLowerCase() ===
        subcategoria.toLocaleLowerCase()
  );
  console.log("receitas " + recipe);
  res.send(recipe);
});

const port = 5000;
app.listen(port, () => {
  console.log("okay");
});
