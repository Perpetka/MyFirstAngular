import {Component, Input, QueryList, ViewChildren, AfterViewInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { DieComponent } from './die.component';

import {dice} from './dice';

@Component({
  selector: 'die-collection',
  templateUrl: './die-collection.component.html',
  styles: [``]
})


export class DieCollectionComponent implements AfterViewInit{  
  dice = dice;

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