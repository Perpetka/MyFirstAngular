import {Component, Input} from '@angular/core';
import {PurpleArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie } from './game-dice';
import { Subject } from 'rxjs';


@Component({
  selector: "purple-area",
  template: `
  <h3>purple area - click on first free field to place selected die</h3>
  <div *ngFor="let f of area.fields; last as isLast">
    <value-field [field]="f" (FieldClicked)="processFieldClick($event)"></value-field>
    <div class="between-fields" *ngIf="!isLast">&lt;</div>
  </div><br/>
  score: {{area.getScore()}} <br/>
  {{error}}
  `,
  styles: [".between-fields {float: left;}"]
})

export class PurpleAreaComponent
{
  @Input() area: PurpleArea;
  @Input() dieSelectedNotifier: Subject<RolledGameDie>;
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
    if( field.canBeChecked(this.currentDie))
    {
      field.check(this.currentDie);
      this.error = "";
    }
    else
      this.error = "invalid move";
  }
}