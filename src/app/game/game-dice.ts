import {RolledDie, initialDice } from '../dice';

export class RolledGameDie extends RolledDie
{
  isWildcardValue: boolean;
  dieStatus: DieStatus;

   isWildcardColor() 
   { 
     return this.color === "white"; 
   }

   constructor(color: string, value: number, isWildcardValue: boolean, dieStatus: DieStatus)
   {
     super(6, color);
     this.value = value;
     this.isWildcardValue = isWildcardValue;
     this.dieStatus = dieStatus;
   }
}

export enum DieStatus
{
  RolledActive,
  RolledWillGoToTray,
  RolledWillBeRerolled,
  Used,
  OnTray
}

export class DiceSet
{
  rolledGameDice : RolledGameDie[]

  constructor()
  {
    this.rolledGameDice = initialDice.map( d =>
    new RolledGameDie(d.color, 0, true, DieStatus.RolledWillBeRerolled ) );   
  }

  getDie( color: string  ):RolledGameDie{
    return this.rolledGameDice.find( d => d.color == color);
  }

  getDice( status: DieStatus  ):RolledGameDie[]{
    return this.rolledGameDice.filter( d => d.dieStatus == status);
  }

  getActiveDice( ):RolledGameDie[]{
    let activeStatuses =[
      DieStatus.RolledActive,
      DieStatus.RolledWillGoToTray,
      DieStatus.RolledWillBeRerolled
    ];
    return this.rolledGameDice.filter( d => activeStatuses.includes(d.dieStatus));
  }
}