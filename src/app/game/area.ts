import {ValueField} from './field';

export class OrangeArea
{
  fields : ValueField[];

  constructor()
  {
    this.fields = [];
    for( let i= 0; i<10; i++ )
    {
      this.fields.push( new ValueField("orange") );
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