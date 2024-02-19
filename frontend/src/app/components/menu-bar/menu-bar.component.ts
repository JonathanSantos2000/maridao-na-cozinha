import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.overlayVariable = !this.overlayVariable;
  }
}
