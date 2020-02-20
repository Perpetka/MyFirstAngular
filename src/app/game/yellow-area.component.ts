import {Component, Input} from '@angular/core';
import {YellowArea} from './area';
import {ExactField} from './field';
import {ExtraDieBonus, PlayOneMoreDieAction, FoxBonus} from './bonus';
import {ExactFieldComponent} from './exact-field.component';
import {AreaComponentBase} from './area-components-base';
import {BonusComponent} from './bonus.component';


@Component({
  selector: "yellow-area",
  template: `
  <h5>yellow area - click on any matching field to cross it out</h5>

  <table>
    <tr *ngFor="let r of range"> 
       <td *ngFor="let c of range"> 
         <exact-field [field]="getField(r,c)" (FieldClicked)="processFieldClick($event)"></exact-field>
       </td>
      <td><bonus [bonus]="bonuses[r]"></bonus></td>
    </tr>
    <tr>
     <td *ngFor="let c of range"> <div class="yellow-score">
     {{scoreValues[c]}}
     </div> </td>
     <td><bonus [bonus]="bonuses[4]"></bonus></td>
    </tr>
  </table>

  score: {{area.getScore()}} <br/>
  {{error}}
  `,
  styles: [".yellow-score {color: black; background-color: yellow; text-align: center; font-size: x-small; border-radius: 3px; width: 12px; margin: auto; }"]
})

export class YellowAreaComponent extends AreaComponentBase
{
  @Input() area: YellowArea;
  
  range = [0,1,2,3];
  bonuses = [ new ExtraDieBonus("blue", undefined),
  new ExtraDieBonus("orange", 4),
  new ExtraDieBonus("green", undefined),
  new FoxBonus(),
  new PlayOneMoreDieAction()];
  scoreValues = [10,14,16,20];

  getField( row : number, column : number) : ExactField
  {
    if( column + row == 3)
    {
      let dummy = new ExactField("yellow");
      dummy.forceCheck();
      return dummy;
    }
    let modifier = column+row>3 ? -1 : 0;
    return this.area.fields[ row*3 + column + modifier];
  }
}