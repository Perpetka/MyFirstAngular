import { Component, Input } from '@angular/core';

@Component({
  selector: 'die',
  template: `<div color="{{ color }}">{{value}}!</div>`,
  styles: [`h1 { font-family: Lato; }`]
})

export class DieComponent  {
  @Input() color: string;
  //value = 5;
}
