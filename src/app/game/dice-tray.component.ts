import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DiceSet, DieStatus, RolledGameDie } from './game-dice';
import {DieProviderComponent} from '../die-provider.component';
import {DieComponent} from '../die.component';
import { Subject } from 'rxjs';


@Component({
  selector: "dice-tray",
  templateUrl: `./dice-tray.component.html`,
  styles: [".die {float:left; border: solid 1px; width: 20px; height: 20px; text-align:center; margin: 2px; clear: none; cursor: pointer;",
  ".block {clear:left;}"]
  })
export class DiceTrayComponent
{
  diceSet: DiceSet;
  @Output() dieChosen = new EventEmitter<DiceSet>();
  @Input() roundEndNotifier: Subject<number>;

  ngOnInit() 
  {
    if (this.roundEndNotifier) {
      this.roundEndNotifier.subscribe((endingRoundNumber) => {        
        this.processRoundEnd(endingRoundNumber);
      });
      }  
  }

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
    this.diceSet.activeDie = die;
    this.dieChosen.emit(this.diceSet);
  }

  processRoundEnd(endingRoundNumber: number)
  {
    if( endingRoundNumber%4 == 0 )
    {
      this.diceSet.rolledGameDice.forEach( d => { 
        d.roll();
        d.dieStatus = DieStatus.RolledWillBeRerolled;
      });
    }    
    else if( endingRoundNumber%4 == 3 ) 
    {
      this.diceSet.rolledGameDice.forEach( d => { 
        d.roll();
        d.dieStatus = DieStatus.OnTray;
      });
    }
    else
    {
      this.diceSet.getDice(DieStatus.RolledWillGoToTray).forEach( d => {        
        d.dieStatus = DieStatus.OnTray;
      });
      this.diceSet.getActiveDie().dieStatus = DieStatus.Used;
      this.diceSet.getDice(DieStatus.RolledWillBeRerolled).forEach( d => {        d.roll();
      });
    }

  }
}