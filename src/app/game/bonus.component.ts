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
  styles: [".bonus {position:absolute; font-size: xx-small; bottom: -7px; left: 9px; width: 6px;} ",
   ".action {color: white;}"]
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