export enum Transmission {
  AT = 'Automatic Transmission',
  MT = 'Manual Transmission',
  AMT = 'Automated Manual Transmission',
  CVT = 'Continuous Variable Transmission',
}

export type Car = {
  id: string;
  name: string;
  color: string;
  transmission: Transmission;
  price: number;
  description: string;
  image: string | null;
};

export type Cars = Car[];
