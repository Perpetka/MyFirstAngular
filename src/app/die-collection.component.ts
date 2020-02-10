import {Component, Input, QueryList, ViewChildren, AfterViewInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { DieComponent } from './die.component';
import { DieModel } from './die-model';
import {dice} from './dice';

@Component({
  selector: 'die-collection',
  templateUrl: './die-collection.component.html',
  styles: [``]
})


export class DieCollectionComponent implements AfterViewInit{  
  dice = dice.map( d => new DieModel( d.max, d.color ));

  rollSum = 0;

  subject = new Subject<string>();

   @ViewChildren(DieComponent) dieComponents !: QueryList<DieComponent>;

  handleClick() {
    // This will send a message via the subject
    this.subject.next("roll, babies");
    this.calculateSum();
  }

  calculateSum()
  {
    this.rollSum = 0;
    this.dieComponents.forEach( d =>this.rollSum += d.value);
  }

  addDie( max )
  {
    if( max == 6)
      this.dice.push( new DieModel(6, "aqua") );
    else
      this.dice.push( new DieModel(max, "orange"));
    //this.calculateSum();
  }

  ngAfterViewInit()
  {
    this.calculateSum();
    this.dieComponents.changes.subscribe((r) => { this.calculateSum(); });
  }

  // Complete the subject when your component is destroyed to avoid memory leaks
  ngOnDestroy() {
    this.subject.complete();
  }
}