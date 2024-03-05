const BASE_URL = 'http://localhost:5000';

export const RECIPE_URL = BASE_URL + '/api/recipe';

export const RECIPE_ID_URL = RECIPE_URL + '/id/:id';
export const RECIPE_CATEGORY_URL = RECIPE_URL + '/categoria/:categoria';

export const CATEGORY_URL = BASE_URL + '/api/categoria';

export const CATEGORY_NAME_URL = BASE_URL + '/api/categoria/:categoria';

export const RECIPE_CATEGORY_SUBCATEGORY_URL =
  BASE_URL + '/api/categoria/:categoria/subcategoria/:subcategoria';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const NEW_RECIPE_URL = BASE_URL + '/api/ask/newRecipe';
