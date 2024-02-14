export class Recipe {
  id!: number;
  NomeDaReceita!: string;
  Ingredientes!: string[];
  ModoDeFazer!: string;
  Foto!: string;
  Categoria!: string;
  Subcategoria!: string;
  TempoDePreparo!: string;
  Porcoes!: string;
  NivelDeDificuldade!: string;
  Extra?: Extra[];
}

interface Extra {
  NomeDaReceitaExtra?: string;
  Ingredientes: string[];
  ModoDeFazer: string;
}
