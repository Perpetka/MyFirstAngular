import {Component, Input} from '@angular/core';
import {GreenArea} from './area';
import {ExactFieldComponent} from './exact-field.component';
import {AreaComponentBase} from './area-components-base';


@Component({
  selector: "green-area",
  template: `
  <div class="block">
  <div *ngFor="let f of area.fields; let i = index;" class="green-field">
  <div class="green-score">{{area.getScoreValue(i+1)}}</div>
    <exact-field [field]="f" (FieldClicked)="processFieldClick($event)"></exact-field>
  </div></div>
  `,
  styleUrls: ["./area.css"]
})

export class GreenAreaComponent extends AreaComponentBase
{
  @Input() area: GreenArea;
  
}