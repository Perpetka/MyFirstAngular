import {Component, Input, ViewChildren} from '@angular/core';
import {OrangeArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie } from './game-dice';
import {DieProviderComponent} from '../die-provider.component';
import { Subject } from 'rxjs';


@Component({
  selector: "game",
  template: `
  
  <die-provider (dieChosen)="handleDieChosen($event)"></die-provider>
  <br/>
 <h2>Selected die is: <span *ngIf="activeDie">{{activeDie.color}} {{activeDie.value}}</span></h2>
  
  <orange-area [area]="orangeArea" [dieSelectedNotifier]="subject"></orange-area>
  `
})

export class GameComponent
{
  activeDie: RolledGameDie;
  orangeArea: OrangeArea = new OrangeArea();

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

}