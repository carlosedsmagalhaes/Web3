export interface Location {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

// Como o retorno é um array
export type LocationResponse = Location[];
