import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {ExactField, RestrictedField, MinValueField} from './field';

@Component({
  selector: "exact-field",
  template: `<div class="field" [style.background-color]="field.color" (click)="onclick()" [ngClass]="
  {
    'checked': field.isChecked(),
    'unchecked' : !field.isChecked()
  }">{{getText()}}</div>`,
  styles: [".field {float: left; height:20px; width: 20px; cursor:pointer; border: solid 1px; padding: 1px; margin: 2px; position:relative;  text-align: center;}",
  ".checked {font-weight:bold;} .unchecked {color:grey;}"]
})
export class ExactFieldComponent
{
  @Input() field: RestrictedField;
  @Output() FieldClicked = new EventEmitter<RestrictedField>();

  getText()
  {
    if (this.field.isChecked())  
      return "X"; 
    else 
    if( this.field instanceof ExactField)
      return (<ExactField>this.field).requiredValue;
    else
      return (<MinValueField>this.field).minValue + '+';
  }
 
  onclick()
  {
    this.FieldClicked.emit( this.field );
  }
}