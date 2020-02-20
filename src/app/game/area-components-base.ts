import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {RolledGameDie, DiceSet } from './game-dice';
import {Bonus} from './bonus';
import {BaseField} from './field';
import { Subject } from 'rxjs';
import {BaseArea} from './area';

export class AreaComponentBase
{
  @Input() dieSelectedNotifier: Subject<DiceSet>;
  @Output() moveCompleted = new EventEmitter<Bonus[]>();
  currentDie: RolledGameDie;
  currentDice: DiceSet;
  error: string;

  ngOnInit() 
  {
    if (this.dieSelectedNotifier) {
      this.dieSelectedNotifier.subscribe((dice) => {        
        this.currentDie = dice.getActiveDie();
        this.currentDice = dice;
      });
      }  
  }

  processFieldClick( field: BaseField, area: BaseArea )
  {
    if( this.currentDie == undefined )
      return;
    if( field.canBeChecked(this.currentDie))
    {
      var bonuses = [field.check(this.currentDie)];
      this.error = "";
      this.currentDie = undefined;
      if( area )
        bonuses = bonuses.concat(area.getAreaBonuses(field));
      this.moveCompleted.emit(bonuses);
    }
    else
      this.error = "invalid move";
  }
}