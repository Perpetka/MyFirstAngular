import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {RolledDie} from './dice';

@Component({
  selector: 'die',
  template: `<div [style.background]="die.color" (click)="roll()">{{die.value}}</div>`,
  styles: [`div {height:20px; width:20px; text-align:center; float:left; margin: 2px; border: 1px solid black; cursor: pointer;`]
})


export class DieComponent{
  @Input() die : RolledDie;

  @Output() ValueChanged = new EventEmitter();

  roll()
  {
    this.die.roll();
    this.ValueChanged.emit(this.die.value);
  }

}