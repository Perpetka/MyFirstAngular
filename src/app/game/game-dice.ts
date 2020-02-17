import {RolledDie } from '../dice';


export class RolledGameDie extends RolledDie{
   isWildcardColor() 
   { 
     return this.color === "white"; 
   }
}