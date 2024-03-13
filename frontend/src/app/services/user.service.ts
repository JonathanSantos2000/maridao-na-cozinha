import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import {
  GET_NEW_RECIPE_URL,
  PHOTOS_SEND_URL,
  PHOTOS_USER_SEND_URL,
  USER_LOGIN_URL,
  USER_REGISTER_URL,
} from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Foto } from '../shared/models/photos';
import { NewRecipe } from '../shared/models/newRecipe';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );

  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bem Vindo ao Maridão na Cozinha ${user.name}`,
            'Login bem-sucedido '
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Falha ao logar');
        },
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bem Vindo ao Maridão na Cozinha ${user.name}`,
            'Registro bem-sucedido '
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Registro falhou');
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  getPhotosByUser(userId: string) {
    return this.http.get<Foto[]>(
      `${PHOTOS_USER_SEND_URL.replace(':id', userId)}`
    );
  }

  getPhotosbyStatus(status: string) {
    return this.http.get<Foto[]>(
      `${PHOTOS_SEND_URL.replace(':status', status)}`
    );
  }

  getNewRecipeByUser(quemMandou: string) {
    console.log(quemMandou);
    return this.http.get<NewRecipe[]>(
      `${GET_NEW_RECIPE_URL.replace(':quemMandou', quemMandou)}`
    );
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
