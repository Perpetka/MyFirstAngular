import {RolledDie } from '../dice';

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
}