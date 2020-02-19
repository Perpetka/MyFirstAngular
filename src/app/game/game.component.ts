import {Component, Input, ViewChildren} from '@angular/core';
import {OrangeArea, PurpleArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie } from './game-dice';
import {Bonus, ReRollAction, PlayOneMoreDieAction, ExtraDieBonus} from "./bonus";
import {DieProviderComponent} from '../die-provider.component';
import { Subject } from 'rxjs';


@Component({
  selector: "game",
  template: `
  
  <die-provider (dieChosen)="handleDieChosen($event)"></die-provider>
  <br/>
 <h2>Selected die is: <span *ngIf="activeDie">{{activeDie.color}} {{activeDie.value}}</span></h2>
 <p>rerolls: {{numberOfRerolls}}, "+1s": {{numberOfPlusOnes}}, foxes: {{numberOfFoxes}}</p>
 <p>total score: </p>
  
  <orange-area [area]="orangeArea" [dieSelectedNotifier]="subject" (moveCompleted)="handleMoveCompleted($event)"></orange-area>

  <purple-area [area]="purpleArea" [dieSelectedNotifier]="subject" (moveCompleted)="handleMoveCompleted($event)"></purple-area>
  `
})

export class GameComponent
{
  activeDie: RolledGameDie;
  orangeArea: OrangeArea = new OrangeArea();
  purpleArea: PurpleArea = new PurpleArea();
  activeBonuses: Bonus[] = [];
  numberOfRerolls: number = 0;
  numberOfPlusOnes: number = 0;
  numberOfFoxes: number = 0;

  subject = new Subject<RolledGameDie>();

  handleDieChosen(die : RolledGameDie)
  {
    console.log( "GameComponent " + die.color + " " + die.value );
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
      var bonus = this.activeBonuses.pop();
      if( bonus instanceof ExtraDieBonus)
        this.activeDie = (<ExtraDieBonus>bonus).die;
      else if ( bonus instanceof ReRollAction )
        this.numberOfRerolls++;
      else if (bonus instanceof PlayOneMoreDieAction)
        this.numberOfPlusOnes++;
    }
  }

}