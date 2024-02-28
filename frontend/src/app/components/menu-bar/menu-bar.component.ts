import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: [
    './menu-bar.component.css',
    './menu-bar.responsive.tablet.component.css',
    './menu-bar.responsive.mobile.component.css',
  ],
})
export class MenuBarComponent implements OnInit {
  menuVariable: boolean = false;
  overlayVariable: boolean = false;
  btnclose: boolean = false;
  btnOpen: boolean = true;

  user!: User;
  constructor(private userService: UserService) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    console.log(this.user);
    return this.user.token;
  }

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.overlayVariable = !this.overlayVariable;
  }
}
