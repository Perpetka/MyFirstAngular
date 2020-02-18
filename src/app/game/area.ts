import {SubsequentValueField, SubsequentIncreasingValueField} from './field';
import {Action, ExtraDie} from './bonus';

export class OrangeArea
{
  fields : SubsequentValueField[];

  constructor()
  {
    this.fields = [];
    for( let i= 0; i<10; i++ )
    {
      this.fields.push( new SubsequentValueField("orange") );
      if( i>0 )
        this.fields[i].previousField = this.fields[i-1];
      if( i> 5)
      {
        this.fields[i].bonus = new Action();
        this.fields[i].bonus.name = i;
      }
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