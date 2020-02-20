import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DiceSet, DieStatus, RolledGameDie } from './game-dice';
import {DieProviderComponent} from '../die-provider.component';
import {DieComponent} from '../die.component';


@Component({
  selector: "dice-tray",
  templateUrl: `./dice-tray.component.html`,
  styles: [".die {float:left; border: solid 1px; width: 20px; height: 20px; text-align:center; margin: 2px; clear: none; cursor: pointer;"]
  })
export class DiceTrayComponent
{
  diceSet: DiceSet;
  @Output() dieChosen = new EventEmitter<DiceSet>();

  constructor() { 
    this.diceSet = new DiceSet();
  }

  handleDieChosen(die : RolledGameDie)
  {
    let myDie = this.diceSet.getDie( die.color );
    if( myDie.dieStatus == DieStatus.OnTray || myDie.dieStatus == DieStatus.Used)
      return;
    myDie.value = die.value;
    myDie.isWildcardValue = false;
  }

  activate( die: RolledGameDie )
  {
    this.diceSet.getActiveDice().forEach( d => {
      if( !d.isWildcardValue && !die.isWildcardValue && d.value < die.value )
        d.dieStatus = DieStatus.RolledWillGoToTray;
      else
        d.dieStatus = DieStatus.RolledWillBeRerolled;
    });
    die.dieStatus = DieStatus.RolledActive;
    this.dieChosen.emit(this.diceSet);
  }
}