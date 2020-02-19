import {Component, Input} from '@angular/core';
import {Bonus, Action, ExtraDieBonus} from './bonus';

@Component({
  selector: "bonus",
  template: `<div *ngIf="bonus" [ngClass]="
  {
    'bonus': true,
    'action' : isAction(),
    'die' : isExtraDie()
  }
  "
  [style.background-color] = "getColor()"
  >{{getIcon()}}</div>`,
  styles: [".bonus { font-size: xx-small; width: 8px; text-align: center;} ",
   ".action {color: white;}",
   ".die {font-weight: bold;}"]
})
export class BonusComponent
{
  @Input() bonus: Bonus;

  isAction(): boolean {return this.bonus instanceof Action; }
  isExtraDie() : boolean {return  this.bonus instanceof ExtraDieBonus; }

  getColor()
  {
    if( this.isExtraDie() )
      return (<ExtraDieBonus>this.bonus).die.color;
    return "black";
  }
  
  getClass()
  {
    return "a";
  }

  getIcon()
  {
    if( this.isAction() )
      return "A";
    else
      return "B";
  }
}