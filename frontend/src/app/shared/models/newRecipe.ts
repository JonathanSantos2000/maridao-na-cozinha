export class NewRecipe {
  id!: string;
  nomeDaReceita!: string;
  quemMandou!: string;
  ingredientes!: string[];
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
  copyright!: boolean;
  resposta!: string;
}

interface Extra {
  nomeDaReceitaExtra?: string;
  ingredientes: string[];
  modoDeFazer: string;
}
