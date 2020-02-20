import {Component, Input} from '@angular/core';
import {RolledGameDie, DiceSet } from './game/game-dice';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: "die-provider",
  template: `<h4>Select a die to "roll"</h4>
  <div *ngFor="let color of colors; even as isEven" [className]="isEven ? 'row' : ''">
    <div  *ngFor="let value of values" >
       <div class="die" [style.background]="color" (click)="selected(color, value)">{{value}}</div>
    </div>
  </div>  
  `,
  styles: [".die {float:left; border: solid 1px; width: 20px; height: 20px; text-align:center; margin: 2px; clear: none; cursor: pointer; } .row {clear: left}"]
})

export class DieProviderComponent
{
  values = [1,2,3,4,5,6];
  colors = ["yellow", "blue", "green", "orange", "purple", "white"];

  @Output() dieChosen = new EventEmitter<RolledGameDie>();

  selected(color: string, value: number)
  {
    let rgd = new RolledGameDie();
    rgd.value = value;
    rgd.color = color;
    this.dieChosen.emit( rgd );
  }
}