enum Transmission {
  DEFAULT = 0,
  AT,
  MT,
  AM,
  CVT,
}

export type Car = {
  id: string;
  name: string;
  color: string;
  transmission: Transmission;
  mileage: number;
  description: string;
};

// export interface Cars extends Array<Car> {}
export type Cars = Car[];
