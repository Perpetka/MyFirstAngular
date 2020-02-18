import {RolledGameDie} from './game-dice';

export class Bonus
{
 name: string;
}

export class ExtraDie extends Bonus
{
  die: RolledGameDie;
  
  constructor( bonusDie: RolledGameDie)
  {
    super();
    this.die = bonusDie;
  }
}

export class Action extends Bonus
{  
}

export class ReRollAction extends Action
{  
}

export class PlayOneMoreDie extends Action
{  
}

export class RetrieveDie extends Action
{  
}