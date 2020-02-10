export const initialDice = 
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

export class RolledDie extends DieDefinition
{
  value : number;

  constructor( max, color) { super(max, color); this.roll(); }

  roll()
  {
    this.value = Math.floor(Math.random() * this.max) + 1;
  }
}