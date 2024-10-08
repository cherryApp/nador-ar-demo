/**
 * Egy mérési adatot reprezentáló osztály.
 *
 * Egy mérési adat tartalmazza a mérés helyét, eszközét, felhasználóját,
 * időpontját, érkezési időpontját és a mérési értékeket.
 */
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
