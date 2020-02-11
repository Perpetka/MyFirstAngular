import {RolledGameDie } from './game-dice';

export class BaseField
{
  private checked : boolean;

  private bonuses : Reward[];

  color : string;

  constructor( )
  {
    
  }

  canBeChecked(die : RolledGameDie) {
     if( this.isChecked  )
      return false;
     if( this.color == die.color || die.isWildcardColor )
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
  value: number;

  isChecked() {
    if(this.value)
      return true;
    return false;
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

