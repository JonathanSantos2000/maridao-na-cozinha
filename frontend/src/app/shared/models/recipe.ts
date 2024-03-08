export class Recipe {
  id!: number;
  nomeDaReceita!: string;
  quemMandou!: string;
  ingredientes!: string[];
  modoDeFazer!: string;
  foto!: Foto[];
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

interface Foto {
  urlFoto: string;
  quemMandou: string;
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
