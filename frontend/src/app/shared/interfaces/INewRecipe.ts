export interface INewRecipe {
  nomeDaReceita: string;
  quemMandou: string;
  ingredientes: string[];
  modoDeFazer: string;
  foto: string;
  fotoAutor: string[];
  categoria: string;
  subcategoria: string;
  tempoDePreparo: string;
  porcoes: string;
  nivelDeDificuldade: string;
  stars: number;
  favorite: boolean;
  extra?: Extra[];
}

interface Extra {
  nomeDaReceitaExtra?: string;
  ingredientes: string[];
  modoDeFazer: string;
}
