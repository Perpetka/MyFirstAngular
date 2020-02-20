import {RolledGameDie } from './game-dice';
import {Bonus} from './bonus';

export class BaseField
{
  private checked : boolean;

  private bonus : Bonus;

  color : string;

  constructor( fieldColor: string )
  {
    this.color = fieldColor;
  }

  canBeChecked(die : RolledGameDie) {
     if( this.isChecked()  )
      return false;
     if( this.color == die.color || die.isWildcardColor() )
      return true;
     return false;
  }

  isChecked() {return this.checked;}

  checkAction(die : RolledGameDie) 
  {
    this.checked=true;
  }

  check(die: RolledGameDie)
  {
    if( !this.canBeChecked(die) )
      throw "can't be checked";

    this.checkAction(die);

    return this.bonus;
  }
}

export class ValueField extends BaseField{

constructor( fieldColor: string )  { super(fieldColor); }

  value: number;

  isChecked() {
    if(this.value)
      return true;
    return false;
  }

  checkAction(die : RolledGameDie) 
  {
    this.value=die.value;
  }
}

export class SubsequentValueField extends ValueField{

  previousField : BaseField;

   canBeChecked(die : RolledGameDie)
   {
      if( !super.canBeChecked(die))
        return false;
      if( this.previousField )
        return this.previousField.isChecked();
      return true;
   }

}

export class SubsequentIncreasingValueField extends SubsequentValueField{

   canBeChecked(die : RolledGameDie)
   {
      if( !super.canBeChecked(die))
        return false;

      if( this.previousField )
      {
        if ((<ValueField>this.previousField).value < 6)
        {
          return (<ValueField>this.previousField).value < die.value;
        }
      }
      return true;
   }

}

export class RestrictedField extends BaseField 
{
  
}

export class ExactField extends RestrictedField
{
  requiredValue : number;

  canBeChecked(die : RolledGameDie)
  {
    if( !super.canBeChecked(die))
        return false;
    return die.value == this.requiredValue || die.isWildcardValue;
  }
}

export class MinValueField extends RestrictedField
{
  minValue : number;

  canBeChecked(die : RolledGameDie)
  {
    if( !super.canBeChecked(die))
        return false;
    return die.value >= this.minValue || die.isWildcardValue;
  }
}

