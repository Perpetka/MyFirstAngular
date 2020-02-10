import {Component, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'die',
  template: `<div [style.background]="color" (click)="roll()">{{value}}</div>`,
  styles: [`div {height:20px; width:20px; text-align:center; float:left; margin: 2px; border: 1px solid black; cursor: pointer;`]
})


export class DieComponent{
  @Input() color : string;
  value = 5;
  @Input() max;

  @Input() notifier: Subject<any>;

  @Output() ValueChanged = new EventEmitter();

  ngOnInit() {
    if (this.notifier != null) {
      this.notifier.subscribe((event) => {
        this.roll() ;
      })
    }
     this.roll() ;
  }

  roll()
  {
    this.value = Math.floor(Math.random() * this.max) + 1;
    this.ValueChanged.emit(this.value);
  }

}