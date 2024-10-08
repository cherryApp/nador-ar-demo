/**
 * Egy készüléket reprezentáló osztály.
 *
 * A Device osztály a készülékek adatait tartalmazza. A készülék adatai
 * tartalmazzák az azonosítót, a nevét, a kódját, a státuszát, és a
 * cégét.
 */
export class Device {
  id: number = 0;
  name: string = '';
  code: string = '';
  active: boolean = false;
  company: string = '';
}
