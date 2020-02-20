import {SubsequentValueField, SubsequentIncreasingValueField, ExactField, SubsequentMinValueField, BaseField} from './field';
import {Bonus, RetrieveDieAction, PlayOneMoreDieAction, ReRollAction, ExtraDieBonus, FoxBonus} from './bonus';

export class BaseArea
{
  
  getAreaBonuses( field: BaseField ) : Bonus[]
  {
    return [];
  }
}

export class OrangeArea extends BaseArea
{
  fields : SubsequentValueField[];

  constructor()
  {
    super();
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

export class PurpleArea extends BaseArea
{
  fields : SubsequentIncreasingValueField[];

    constructor()
  {
    super();
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

export class YellowArea extends BaseArea
  {
    fields: ExactField[];

    bonuses : Bonus[];

    constructor()
    {
      super();

      this.fields = [];

      let values = [
      3,6,5,
      2,1,5,
      1,2,4,
      3,4,6];

      for( let i= 0; i<values.length; i++ )
      {
        this.fields.push( new ExactField("yellow") );
        this.fields[i].requiredValue = values[i];
      }

      this.bonuses = [ 
          new ExtraDieBonus("blue", undefined),
          new ExtraDieBonus("orange", 4),
          new ExtraDieBonus("green", undefined),
          new FoxBonus(),
          new PlayOneMoreDieAction()];
    }

    getScore() : number
    {
      let scores = [
        [[0,3,6], 10],
        [[1,4,9], 14],
        [[2,7,10], 16],
        [[5,8,11], 20],
      ];

      var sum = 0;
      scores.forEach( 
        s => 
        {
          if( (<Array<number>>s[0]).every( i => this.fields[i].isChecked())) 
            sum+=<number>s[1];
        } );
      return sum;       
    }  

    getAreaBonuses( field: BaseField )
    {
      let ret = [];
      let diagonal = [0,4,7,11];
      let index = this.fields.indexOf( field );
      if( index == -1)
        return ret;
      let row = Math.floor( index / 3 );
      let allChecked : boolean = true;
      for( let i=0; i<3; i++)
      {
        if( !this.fields[row*3+i].isChecked() )
        {
          allChecked = false;
          break;
        }
      }
      if( allChecked )
        ret.push( this.bonuses[row]);

      if( diagonal.indexOf(index) < 0 )
        return ret;

      allChecked = true;
      diagonal.forEach( d => {
      if( !this.fields[d].isChecked() )
      
          allChecked = false;}) ;
      
      if( allChecked )
        ret.push( this.bonuses[4]);

      return ret;

    }
  }

  export class GreenArea extends BaseArea
  {
    fields: SubsequentMinValueField[];

    constructor()
    {
      super();
      this.fields = [];

    let bonuses: Bonus[] = [
undefined,
undefined,
undefined,
new PlayOneMoreDieAction(),
undefined,
new ExtraDieBonus("blue", undefined),
new FoxBonus(),
undefined,
new ExtraDieBonus( "purple", 6 ),
new ReRollAction(),
undefined
    ];

      for( let i= 0; i<bonuses.length; i++ )
      {
        this.fields.push( new SubsequentMinValueField("green") );
        this.fields[i].minValue = 1 + (i>4 ? i-5 : i);
        this.fields[i].bonus = bonuses[i];
        if( i>0 )
          this.fields[i].previousField = this.fields[i-1]; 
      }
    }

    getScore() : number
    {
      var sum = 0;
      this.fields.forEach( f => {if( f.isChecked()) sum++;} );
      return this.getScoreValue(sum); 
    }  

    getScoreValue( i: number)
    {      
      return (1+i)*i/2;
    }
  }

  export class BlueArea extends BaseArea
  {
    fields: ExactField[];

    constructor()
    {
      super();
    }
  }