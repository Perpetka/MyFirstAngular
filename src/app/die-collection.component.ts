import {Component, Input, QueryList, ViewChildren, AfterViewInit} from '@angular/core';
import { Subject } from 'rxjs';

import { DieComponent } from './die.component';
import {initialDice, RolledDie } from './dice';

@Component({
  selector: 'die-collection',
  templateUrl: './die-collection.component.html',
  styles: [``]
})


export class DieCollectionComponent implements AfterViewInit{  
  rolledDice = initialDice.map( d => new RolledDie( d.max, d.color ));

  rollSum = 0;

  subject = new Subject<string>();

   //@ViewChildren(DieComponent) dieComponents !: QueryList<DieComponent>;

  handleClick() {
    // This will send a message via the subject
    //this.subject.next("roll, babies");
    this.rolledDice.forEach( d => d.roll());
    this.calculateSum();
  }

  calculateSum()
  {
    //if( !this.dieComponents ) return;
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

  ngAfterViewInit()
  {
    this.calculateSum();
    //this.dieComponents.changes.subscribe((r) => { this.calculateSum(); });
  }

  // Complete the subject when your component is destroyed to avoid memory leaks
  ngOnDestroy() {
    this.subject.complete();
  }
}