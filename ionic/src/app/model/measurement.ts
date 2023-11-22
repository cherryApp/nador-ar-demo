export class Measurement {
  id: number = 0;
  location: string = '';
  device: string = '';
  user: string = '';
  time: string = '';
  arrived: string = '';
  values: {
    [key: string]: number
  } = {};
}
