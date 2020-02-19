import {Component, Input} from '@angular/core';
import {PurpleArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {AreaComponentBase} from './area-components-base';


@Component({
  selector: "purple-area",
  template: `
  <h5>purple area - click on first free field to place selected die</h5>
  <div *ngFor="let f of area.fields; last as isLast">
    <value-field [field]="f" (FieldClicked)="processFieldClick($event)"></value-field>
    <div class="between-fields" *ngIf="!isLast">&lt;</div>
  </div><br/>
  score: {{area.getScore()}} <br/>
  {{error}}
  `,
  styles: [".between-fields {float: left;}"]
})

export class PurpleAreaComponent  extends AreaComponentBase
{
  @Input() area: PurpleArea;

}