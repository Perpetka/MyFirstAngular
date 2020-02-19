import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {ValueField} from './field';
import {BonusComponent} from './bonus.component';

@Component({
  selector: "value-field",
  template: `<div class="field" [style.background-color]="field.color" (click)="onclick()">{{field.value}}<div class="bonus-holder"><bonus [bonus]="field.bonus"></bonus></div></div>`,
  styles: [".field {float: left; height:20px; width: 20px; cursor:pointer; border: solid 1px; padding: 1px; margin: 2px; position:relative; }",
  ".bonus-holder {position:absolute; bottom: -7px; left: 9px;} "]
})
export class ValueFieldComponent
{
  @Input() field: ValueField;
  @Output() FieldClicked = new EventEmitter<ValueField>();

  onclick()
  {
    this.FieldClicked.emit( this.field );
  }
}