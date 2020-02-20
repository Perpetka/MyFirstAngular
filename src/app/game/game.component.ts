import {Component, Input, ViewChildren} from '@angular/core';
import {OrangeArea, PurpleArea, YellowArea, GreenArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie } from './game-dice';
import {Bonus, ReRollAction, PlayOneMoreDieAction, ExtraDieBonus, FoxBonus} from "./bonus";
import {DieProviderComponent} from '../die-provider.component';
import { Subject } from 'rxjs';


@Component({
  selector: "game",
  template: `
  
  <dice-tray></dice-tray>
  <br/>
 <h2>Selected die is: <span *ngIf="activeDie">{{activeDie.color}} {{activeDie.value}}</span></h2>
 <p>rerolls: {{numberOfRerolls}}, "+1s": {{numberOfPlusOnes}}, foxes: {{numberOfFoxes}}; round {{roundCounter}}</p>
 <p>total score: 
 <span style="color: yellow">{{yellowArea.getScore()}}</span> + 
 <span style="color: green">{{greenArea.getScore()}}</span> + 
 <span style="color: orange">{{orangeArea.getScore()}}</span> + 
 <span style="color: purple">{{purpleArea.getScore()}}</span> + 
 <span style="color: red">{{getFoxesScore()}}</span> =
  {{getTotalScore()}} </p>
  
   <yellow-area [area]="yellowArea" [dieSelectedNotifier]="subject" (moveCompleted)="handleMoveCompleted($event)"></yellow-area>

    <green-area [area]="greenArea" [dieSelectedNotifier]="subject" (moveCompleted)="handleMoveCompleted($event)"></green-area>

  <orange-area [area]="orangeArea" [dieSelectedNotifier]="subject" (moveCompleted)="handleMoveCompleted($event)"></orange-area>

  <purple-area [area]="purpleArea" [dieSelectedNotifier]="subject" (moveCompleted)="handleMoveCompleted($event)"></purple-area>
  `
})

export class GameComponent
{
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

  subject = new Subject<RolledGameDie>();

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

  handleDieChosen(die : RolledGameDie)
  {
    this.activeDie = die;
    this.subject.next(die);
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
        this.handleDieChosen((<ExtraDieBonus>bonus).die);
        return;
      }
      if ( bonus instanceof ReRollAction )
        this.numberOfRerolls++;
      else if (bonus instanceof PlayOneMoreDieAction)
        this.numberOfPlusOnes++;
      else if (bonus instanceof FoxBonus)
        this.numberOfFoxes++;
    }    
    this.roundCounter++;
  }

}