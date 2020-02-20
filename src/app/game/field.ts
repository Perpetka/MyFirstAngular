import {RolledGameDie } from './game-dice';
import {Bonus} from './bonus';

export class BaseField
{
  private checked : boolean;

  private bonus : Bonus;

  color : string;

  previousField : BaseField;

  constructor( fieldColor: string )
  {
    this.color = fieldColor;
  }

  canBeChecked(die : RolledGameDie) {
     if( this.isChecked()  )
      return false;
     if( this.previousField && !this.previousField.isChecked())
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

export class IncreasingValueField extends ValueField{

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

  forceCheck()
  {
    let die = new RolledGameDie("white", 1, true);
    this.check(die);
  }
  
}

export class MinValueField extends RestrictedField
{
  minValue : number;
  previousField : BaseField;

  canBeChecked(die : RolledGameDie)
  {
    if( !super.canBeChecked(die))
        return false;
      
    return die.value >= this.minValue || die.isWildcardValue;
  }
}

