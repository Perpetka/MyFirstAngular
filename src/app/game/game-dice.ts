import {RolledDie } from '../dice';


export class RolledGameDie extends RolledDie{
   isWildcardColor : boolean = (super.color == "white");
}