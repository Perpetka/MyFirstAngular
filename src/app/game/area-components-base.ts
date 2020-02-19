import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {RolledGameDie } from './game-dice';
import {Bonus} from './bonus';
import {BaseField} from './field';
import { Subject } from 'rxjs';

export class AreaComponentBase
{
  @Input() dieSelectedNotifier: Subject<RolledGameDie>;
  @Output() moveCompleted = new EventEmitter<Bonus[]>();
  currentDie: RolledGameDie;
  error: string;

  ngOnInit() 
  {
    if (this.dieSelectedNotifier) {
      this.dieSelectedNotifier.subscribe((die) => {        
        this.currentDie = die;
      })
      }  
  }

  processFieldClick( field: BaseField )
  {
    if( this.currentDie == undefined )
      return;
    if( field.canBeChecked(this.currentDie))
    {
      var bonus = field.check(this.currentDie);
      this.error = "";
      this.currentDie = undefined;
      this.moveCompleted.emit( [bonus]);
    }
    else
      this.error = "invalid move";
  }
}