import {Component, Input} from '@angular/core';
import {Bonus, Action, ExtraDie} from './bonus';

@Component({
  selector: "bonus",
  template: `<div *ngIf="bonus" [className]="getClass()">{{getIcon()}}</div>`,
  styles: [".field {float: left; height:20px; width: 20px; cursor:pointer; border: solid 1px; padding: 1px; margin: 2px; }"]
})
export class BonusComponent
{
  @Input() bonus: Bonus;
  
  getClass()
  {
    return "a";
  }

  getIcon()
  {
    return "B";
  }
}