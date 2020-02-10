import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import {dice} from './dice';

@Component({
  selector: 'die-collection',
  templateUrl: './die-collection.component.html',
  styles: [``]
})


export class DieCollectionComponent{  
  dice = dice;

  subject = new Subject<string>();

  handleClick() {
    // This will send a message via the subject
    this.subject.next("TEST");
  }

  // Complete the subject when your component is destroyed to avoid memory leaks
  ngOnDestroy() {
    this.subject.complete();
  }
}