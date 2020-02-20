import {Component, Input} from '@angular/core';
import {YellowArea} from './area';
import {ExactFieldComponent} from './exact-field.component';
import {AreaComponentBase} from './area-components-base';


@Component({
  selector: "yellow-area",
  template: `
  <h5>yellow area - click on any matching field to cross it out</h5>
  <div *ngFor="let f of area.fields">
    <exact-field [field]="f" (FieldClicked)="processFieldClick($event)"></exact-field>
  </div><br/>
  score: {{area.getScore()}} <br/>
  {{error}}
  `,
  styles: [""]
})

export class YellowAreaComponent extends AreaComponentBase
{
  @Input() area: YellowArea;
  
}