import {Component, Input} from '@angular/core';
import {OrangeArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie } from './game-dice';
import { Subject } from 'rxjs';


@Component({
  selector: "orange-area",
  template: `
  <h3>orange area - click on any field to place selected die</h3>
  <div *ngFor="let f of area.fields">
    <value-field [field]="f" (FieldClicked)="processFieldClick($event)"></value-field>
  </div><br/>
  score: {{area.getScore()}} <br/>
  {{error}}
  `,
  styles: [""]
})

export class OrangeAreaComponent
{
  @Input() area: OrangeArea;
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