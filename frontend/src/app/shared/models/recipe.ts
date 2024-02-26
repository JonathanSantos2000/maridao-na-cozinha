export class Recipe {
  id!: number;
  nomeDaReceita!: string;
  iIngredientes!: string[];
  modoDeFazer!: string;
  foto!: string;
  fotoAutor!: string[];
  categoria!: string;
  subcategoria!: string;
  tempoDePreparo!: string;
  porcoes!: string;
  nivelDeDificuldade!: string;
  stars!: number;
  favorite!: boolean;
  extra?: Extra[];
}

interface Extra {
  nomeDaReceitaExtra?: string;
  ingredientes: string[];
  modoDeFazer: string;
}

export class Category {
  idCategory!: number;
  nomeCategory!: string;
  nomeSubCategory!: nomeSubCategory[];
}
interface nomeSubCategory {
  nome: string;
  urlImg: string;
}
