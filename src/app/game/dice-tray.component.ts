import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DiceSet, DieStatus } from './game-dice';
import {DieProviderComponent} from '../die-provider.component';
import {DieComponent} from '../die.component';


@Component({
  selector: "dice-tray",
  templateUrl: `./dice-tray.component.html`,
  styles: [".die {float:left; border: solid 1px; width: 20px; height: 20px; text-align:center; margin: 2px; clear: none; cursor: pointer;"]
  })
export class DiceTrayComponent
{
  diceSet: DiceSet;

  constructor() { 
    this.diceSet = new DiceSet();
  }
}