import {RolledGameDie } from './game-dice';

export class BaseField
{
  private checked : boolean;

  private bonuses : Reward[];

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

    return this.bonuses;
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

export class ExactField extends BaseField
{
  requiredValue : number;

  canBeChecked(die : RolledGameDie)
  {
    if( !super.canBeChecked(die))
        return false;
    return die.value == this.requiredValue;
  }
}

export class Reward
{
 name: string;
}

export class BonusDie extends Reward
{
  
}

export class Action extends Reward
{
  
}

