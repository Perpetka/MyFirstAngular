import {Component, Input} from '@angular/core';
import {Bonus, Action, ExtraDieBonus, PlayOneMoreDieAction, ReRollAction} from './bonus';

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
  styles: [".bonus { font-size: xx-small; width: 10px; text-align: center;} ",
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
    {
      if( this.bonus instanceof PlayOneMoreDieAction )
        return "+1";
      else
        return "O";
    }
    else
      {
        if( (<ExtraDieBonus>this.bonus).die.isWildcardValue( )
          return "X";
        else
          return (<ExtraDieBonus>this.bonus).die.value;
      }
  }
}