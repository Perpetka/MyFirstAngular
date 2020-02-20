import {RolledDie, initialDice } from '../dice';

export const colors = ["yellow", "blue", "green", "orange", "purple", "white"];

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
    this.rolledGameDice = colors.map( d =>
    new RolledGameDie(d, 0, true, DieStatus.RolledWillBeRerolled ) );   
  }

  getDie( color: string  ):RolledGameDie{
    return this.rolledGameDice.find( d => d.color == color);
  }

  getDice( status: DieStatus  ):RolledGameDie[]{
    return this.rolledGameDice.filter( d => d.dieStatus == status);
  }

  getDiceOnTray(){ return this.getDice( DieStatus.OnTray  );}
  getUsedDice(){ return this.getDice( DieStatus.Used  );}

  getActiveDice( ):RolledGameDie[]{
    let activeStatuses =[
      DieStatus.RolledActive,
      DieStatus.RolledWillGoToTray,
      DieStatus.RolledWillBeRerolled
    ];
    return this.rolledGameDice.filter( d => activeStatuses.includes(d.dieStatus));
  }
}