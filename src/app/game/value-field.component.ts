import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {ValueField} from './field';

@Component({
  selector: "value-field",
  template: `<div class="field" [style.border.color]="field.color" [style.background.color]="field.color" (click)="onclick()">{{field.value}}</div>`,
  styles: [".field {float: left; height:20px; width: 20px; cursor:pointer; border: solid 1px; padding: 1px; margin: 2px; }"]
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