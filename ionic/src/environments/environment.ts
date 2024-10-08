/**
 * A környezeti beállításokat tartalmazza.
 *
 * Ez a fájl a `src/environments/environment.prod.ts` fájl másolata, és a fejlesztési
 * környezetben használt változókat tartalmazza.
 */
export const environment = {
  production: false,
  /**
   * Az API URL-je. Ez a cím a szervert futtató gép címe.
   * A fejlesztési környezetben ez a cím a `http://localhost:3000/` lesz.
   */
  apiUrl: 'http://localhost:3000/',

  /**
   * A Google Maps Android kulcsa.
   * Ez a kulcs csak a mobil alkalmazásban szükséges.
   */
  mapsAndroidApiKey: 'AIzaSyCPVVN0ryZLao5qACQHK8EDCKA2A1gV5Sw',
};
