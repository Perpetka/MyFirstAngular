import {Component, Input} from '@angular/core';
import {OrangeArea} from './area';
import {ValueFieldComponent} from './value-field.component';
import {AreaComponentBase} from './area-components-base';


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

export class OrangeAreaComponent extends AreaComponentBase
{
  @Input() area: OrangeArea;
  
}