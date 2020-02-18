import {RolledDie } from '../dice';


export class RolledGameDie extends RolledDie
{
  isWildcardValue: boolean;

   isWildcardColor() 
   { 
     return this.color === "white"; 
   }

   constructor(color: string, value: number, isWildcardValue: boolean)
   {
     super(6, color);
     this.value = value;
     this.isWildcardValue = isWildcardValue;
   }
}