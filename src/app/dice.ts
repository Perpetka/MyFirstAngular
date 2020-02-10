export const dice = 
[
  {
    color: "red", max: 6
  },
    {
    color: "blue", max: 6
  },  {
    color: "yellow", max: 6
  },  {
    color: "green", max: 4
  },  {
    color: "purple", max: 6
  },  {
    color: "white", max: 6
  },

];

export class DieDefinition
{
  max : number;
  color: string;

  constructor( max, color )
  {
    this.max = max;
    this.color = color;
  }
}