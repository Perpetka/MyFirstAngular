import {Component, Input} from '@angular/core';
import {OrangeArea} from './area';
import {ValueFieldComponent} from './value-field.component';
import {AreaComponentBase} from './area-components-base';


@Component({
  selector: "orange-area",
  template: `<div class="block">
  <div *ngFor="let f of area.fields">
    <value-field [field]="f" (FieldClicked)="processFieldClick($event)"></value-field>
  </div>
  </div>
  `,
  styles: [".block {clear:left; margin-top:8px; margin-bottom: 8px; border: orange 1px solid;}}"]
})

export class OrangeAreaComponent extends AreaComponentBase
{
  @Input() area: OrangeArea;
  
}