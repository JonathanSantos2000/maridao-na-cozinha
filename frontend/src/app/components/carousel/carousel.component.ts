import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  imgOne: string = '';
  imgTwo: string = '';

  images = [
    'icon-dificuldade.png',
    'icon-ingredientes.png',
    'icon-porcoes.png',
    'icon-dificuldade.png',
    'icon-ingredientes.png',
  ];
  currentIndexOne = 0;
  currentIndexTwo = 0;
  constructor() {}

  ngOnInit(): void {
    this.imgOne = this.images[0];
    this.imgTwo = this.images[1];
  }

  prevSlide() {
    console.log('prev');
    /* this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
     */
  }

  nextSlide() {
    console.log('next');
    
    /*     this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1; */
  }
}
