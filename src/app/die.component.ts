import {Component, Input} from '@angular/core';

@Component({
  selector: 'die',
  template: `<div class="{{color}}">{{value}}</div>`,
  styles: [`.red {background-color:#ff0000} .blue {background-color:#0000ff}`]
})


export class DieComponent{
  @Input() color : string;
  value = 5;
}