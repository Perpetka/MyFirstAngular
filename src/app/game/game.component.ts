import {Component, Input, ViewChildren} from '@angular/core';
import {OrangeArea, PurpleArea, YellowArea, GreenArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie, DiceSet } from './game-dice';
import {Bonus, ReRollAction, PlayOneMoreDieAction, ExtraDieBonus, FoxBonus} from "./bonus";
import {DieProviderComponent} from '../die-provider.component';
import { Subject } from 'rxjs';


@Component({
  selector: "game",
  templateUrl: "./game.component.html",
  
styles: [".block {clear:left;}"]
})

export class GameComponent
{
  diceSet: DiceSet;
  activeDie: RolledGameDie;
  orangeArea: OrangeArea = new OrangeArea();
  purpleArea: PurpleArea = new PurpleArea();
  yellowArea: YellowArea = new YellowArea();
  greenArea: GreenArea = new GreenArea();
  activeBonuses: Bonus[] = [];
  numberOfRerolls: number = 0;
  numberOfPlusOnes: number = 0;
  numberOfFoxes: number = 0;
  roundCounter: number = 1;

  subject = new Subject<DiceSet>();
  roundEndSubject = new Subject<number>();

  getFoxesScore()
  {
    return this.numberOfFoxes * Math.min( this.orangeArea.getScore(), this.purpleArea.getScore(),
    this.yellowArea.getScore(),
    this.greenArea.getScore());
  }

  getTotalScore()
  {
    return this.orangeArea.getScore()
    + this.purpleArea.getScore()
    + this.yellowArea.getScore()
    + this.greenArea.getScore()
    + this.getFoxesScore();
  }

  handleDieChosen(dice : DiceSet, activeDie: RolledGameDie)
  {
    if( activeDie )
       this.activeDie = activeDie;
    else
       this.activeDie = dice.getActiveDie();
    this.diceSet = dice;
    this.subject.next(dice);
  }

  ngOnDestroy() {
    this.subject.complete();
  }

  handleMoveCompleted( bonuses: Bonus[] )
  {    
    this.activeDie = undefined;
    if( bonuses && bonuses.length>0 )
    {
      this.activeBonuses = this.activeBonuses.concat( bonuses );
    }
    if( this.activeBonuses.length>0 )
    {
      //TODO: there will be issues once multiple bonuses
      var bonus = this.activeBonuses.pop();
      if( bonus instanceof ExtraDieBonus)
      {
        this.handleDieChosen(this.diceSet, (<ExtraDieBonus>bonus).die);
        return;
      }
      if ( bonus instanceof ReRollAction )
        this.numberOfRerolls++;
      else if (bonus instanceof PlayOneMoreDieAction)
        this.numberOfPlusOnes++;
      else if (bonus instanceof FoxBonus)
        this.numberOfFoxes++;
    }    
    this.roundEndSubject.next(this.roundCounter);
    this.roundCounter++;    
  }

}