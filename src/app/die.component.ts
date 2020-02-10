import {Component, Input} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'die',
  template: `<div [style.background]="color">{{value}}</div>`,
  styles: [`div {height:20px; width:20px; text-align:center; float:left; margin: 2px; border: 1px solid black;`]
})


export class DieComponent{
  @Input() color : string;
  value = 5;
  @Input() max;

  @Input() notifier: Subject<any>;

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
    //emit event Rerolled();
  }

}