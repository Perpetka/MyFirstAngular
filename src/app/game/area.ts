import {SubsequentValueField} from './field';

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