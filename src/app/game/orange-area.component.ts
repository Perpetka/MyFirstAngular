import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {OrangeArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {BaseField} from './field';
import {RolledGameDie } from './game-dice';
import { Subject } from 'rxjs';
import {Bonus} from './bonus';


@Component({
  selector: "orange-area",
  template: `
  <h5>orange area - click on first free field to place selected die</h5>
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
    if( field.canBeChecked(this.currentDie))
    {
      var bonus = field.check(this.currentDie);
      this.error = "";
      this.moveCompleted.emit( [bonus]);
    }
    else
      this.error = "invalid move";
  }
}