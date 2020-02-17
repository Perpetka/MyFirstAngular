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
    console.log("OrangeArea has fields: " + this.fields.length );
  }
}