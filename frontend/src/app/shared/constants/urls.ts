import { environment } from 'src/environments/environment';

const BASE_URL = environment.production ? '' : 'http://localhost:5000';

export const RECIPE_URL = BASE_URL + '/api/recipe';
/* Recipes URls */
export const RECIPE_ID_URL = RECIPE_URL + '/id/:id';
export const RECIPE_CATEGORY_URL = RECIPE_URL + '/categoria/:categoria';
export const UPDATE_PHOTO_STATUS_URL = BASE_URL + '/api/recipe/photo/status';

/* Category URls */
export const CATEGORY_URL = BASE_URL + '/api/categoria';
export const CATEGORY_NAME_URL = BASE_URL + '/api/categoria/:categoria';
export const RECIPE_CATEGORY_SUBCATEGORY_URL =
  BASE_URL + '/api/categoria/:categoria/subcategoria/:subcategoria';

/* User URls */

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const PHOTOS_USER_SEND_URL = BASE_URL + '/api/users/photos/:id';
export const PHOTOS_SEND_URL = BASE_URL + '/api/users/photos/admin/:status';

/* Send URls */
export const NEW_RECIPE_URL = BASE_URL + '/api/ask/newRecipe';
export const GET_NEW_RECIPE_URL = BASE_URL + '/api/ask/newRecipe/:quemMandou';

export const NEW_UPLOAD_URL = BASE_URL + '/api/upload';
export const GET_PHOTO_URL = BASE_URL + '/api/files';
