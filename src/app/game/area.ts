import {SubsequentValueField, SubsequentIncreasingValueField, ExactField} from './field';
import {Bonus, RetrieveDieAction, PlayOneMoreDieAction, ReRollAction, ExtraDieBonus, FoxBonus} from './bonus';

export class OrangeArea
{
  fields : SubsequentValueField[];

  constructor()
  {
    this.fields = [];

    let bonuses: Bonus[] = [
undefined,
new PlayOneMoreDieAction(),
undefined,
new FoxBonus(),
new ExtraDieBonus( "purple", 6 ),
new ExtraDieBonus("blue", undefined),
undefined,
new ReRollAction(),
undefined,
new ReRollAction()
    ];

    for( let i= 0; i<bonuses.length; i++ )
    {
      this.fields.push( new SubsequentValueField("orange") );
      this.fields[i].bonus = bonuses[i];
      if( i>0 )
        this.fields[i].previousField = this.fields[i-1];      
    }
  }

  getScore() : number
  {
    var sum = 0;
    this.fields.forEach( f => {
       if( f.isChecked() )
           sum+= f.value;
    });
    return sum; 
  }
}

export class PurpleArea
{
  fields : SubsequentIncreasingValueField[];

    constructor()
  {
    this.fields = [];
    for( let i= 0; i<10; i++ )
    {
      this.fields.push( new SubsequentIncreasingValueField("purple") );
      if( i>0 )
        this.fields[i].previousField = this.fields[i-1];
    }
  }

  getScore() : number
  {
    var sum = 0;
    this.fields.forEach( f => {
       if( f.isChecked() )
           sum+= f.value;
    });
    return sum; 
  }  
}

export class YellowArea
  {
    fields: ExactField[];

    constructor()
    {
      this.fields = [];
      for( let i= 0; i<12; i++ )
      {
        this.fields.push( new ExactField("yellow") );
        this.fields[i].requiredValue = 1 + (i>5 ? i-6 : i);
      }
    }

    getScore() : number
    {
      var sum = 0;
      this.fields.forEach( f => sum++ );
      return sum; 
    }  
  }