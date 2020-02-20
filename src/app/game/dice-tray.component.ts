import {Component, Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DiceSet } from './game-dice';
import {DieProviderComponent} from '../die-provider.component';
import {DieComponent} from '../die.component';


@Component({
  selector: "dice-tray",
  templateUrl: `./dice-tray.component.html`,
  styles: ["`.die {height:20px; width:20px; text-align:center; float:left; margin: 2px; border: 1px solid black; cursor: pointer;`"]
  })
export class DiceTrayComponent
{
  diceSet: DiceSet;

  constructor() { 
    this.diceSet = new DiceSet();
  }
}