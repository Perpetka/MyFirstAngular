import {Component, Input} from '@angular/core';
import {Bonus, Action, ExtraDie} from './bonus';

@Component({
  selector: "bonus",
  template: `<span *ngIf="bonus">{{bonus.name}}</span>`,
  styles: [".field {float: left; height:20px; width: 20px; cursor:pointer; border: solid 1px; padding: 1px; margin: 2px; }"]
})
export class BonusComponent
{
  @Input() bonus: Bonus;
  
}