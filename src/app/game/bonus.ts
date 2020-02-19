import {RolledGameDie} from './game-dice';

export class Bonus
{
 name: string;
}

export class ExtraDieBonus extends Bonus
{
  die: RolledGameDie;
  
  constructor( color: string, value: number)
  {
    super();
    this.die = new RolledGameDie(color, value, value == undefined);
  }
}

export class Action extends Bonus
{  
}

export class ReRollAction extends Action
{  
}

export class PlayOneMoreDieAction extends Action
{  
}

export class RetrieveDieAction extends Action
{  
}

export class FoxBonus extends Action
{  
}