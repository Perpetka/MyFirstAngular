import {Component, Input} from '@angular/core';
import {PurpleArea} from './area';
import {ValueFieldComponent} from './value-field.component'
import {AreaComponentBase} from './area-components-base';


@Component({
  selector: "purple-area",
  template: `
  <div class="block">
  <div *ngFor="let f of area.fields; last as isLast">
    <value-field [field]="f" (FieldClicked)="processFieldClick($event)"></value-field>
    <div class="between-fields" *ngIf="!isLast">&lt;</div>
  </div></div>
  `,
  
  styleUrls: ["./area.css"]
})

export class PurpleAreaComponent  extends AreaComponentBase
{
  @Input() area: PurpleArea;

}