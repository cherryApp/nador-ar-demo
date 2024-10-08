/**
 * Egy mérési adatot reprezentáló osztály.
 *
 * Az osztály tartalmazza a mérés helyét, eszközét, felhasználóját,
 * időpontját, érkezési időpontját és a mérési értékeket.
 */
export class HistoryData {
    id: number = 0;
    location: string = '';
    device: string = '';
    user: string = '';
    time: string = '';
    arrived: string = '';
    values: {
        [key: string]: any
    } = {};
}
