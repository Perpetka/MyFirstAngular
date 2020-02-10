import {Component, Input} from '@angular/core';

import { DieComponent } from './die.component';
import {initialDice, RolledDie } from './dice';

@Component({
  selector: 'die-collection',
  templateUrl: './die-collection.component.html',
  styles: [``]
})


export class DieCollectionComponent {  
  rolledDice = initialDice.map( d => new RolledDie( d.max, d.color ));

  rollSum = 0;

  handleClick() {
    this.rolledDice.forEach( d => d.roll());
    this.calculateSum();
  }

  ngOnInit()
  {
    this.calculateSum();
  }

  calculateSum()
  {
    this.rollSum = 0;
    this.rolledDice.forEach( d =>this.rollSum += d.value);
  }

  addDie( max )
  {
    if( max == 6)
      this.rolledDice.push( new RolledDie(6, "aqua") );
    else
      this.rolledDice.push( new RolledDie(max, "orange"));
  }
}