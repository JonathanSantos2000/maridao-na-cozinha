import { environment } from 'src/environments/environment';

const BASE_URL = environment.production ? '' : 'http://localhost:5000';

export const RECIPE_URL = BASE_URL + '/api/recipe';
/* Recipes URls */
export const HOME_RECIPE_URL = RECIPE_URL + '/home';
export const RECIPE_ID_URL = RECIPE_URL + '/id/:id';
export const RECIPE_CATEGORY_URL = RECIPE_URL + '/categoria/:categoria';
export const UPDATE_PHOTO_STATUS_URL = BASE_URL + '/api/recipe/photo/status';
export const UPDATE_NEW_RECIPE_STATUS_URL =
  BASE_URL + '/api/recipe/newRecipe/status';

/* Category URls */
export const CATEGORY_URL = BASE_URL + '/api/categoria';
export const CATEGORY_NAME_URL = BASE_URL + '/api/categoria/:categoria';
export const RECIPE_CATEGORY_SUBCATEGORY_URL =
  BASE_URL + '/api/categoria/:categoria/subcategoria/:subcategoria';

/* User URls  */

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const PHOTOS_USER_SEND_URL = BASE_URL + '/api/users/photos/:id';
export const PHOTOS_SEND_URL = BASE_URL + '/api/users/photos/admin/:status';
export const RECIPES_SEND_URL =
  BASE_URL + '/api/users/newrecipes/admin/:status';
export const USER_DE_QUEM_URL = BASE_URL + '/api/users/admin/:email';

/* Send URls */
export const NEW_RECIPE_URL = BASE_URL + '/api/ask/newRecipe';
export const GET_NEW_ALL_RECIPE_URL =
  BASE_URL + '/api/ask/newRecipe/:quemMandou';

export const NEW_UPLOAD_URL = BASE_URL + '/api/upload';
export const GET_PHOTO_URL = BASE_URL + '/api/files';

export const GET_NEW_RECIPE_URL = BASE_URL + '/api/ask/newRecipe/idRecipe/:id';
