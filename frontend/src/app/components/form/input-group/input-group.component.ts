import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'input-group',
  templateUrl: './input-group.component.html',
  styleUrl: './input-group.component.css',
})
export class InputGroupComponent implements OnInit {
  @Input()
  label!: string;
  @Input()
  bgColor: string = 'none';

  constructor() {}
  ngOnInit(): void {}
}
