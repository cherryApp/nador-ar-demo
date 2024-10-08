/**
 * Egy logikai változó, amely igazságértéke annak függvényében változik, hogy a
 * felhasználó mobil eszközről érkezik-e a weboldalra.
 *
 * A változó a {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent|Navigator.userAgent}
 * API-t használja arra, hogy a felhasználó eszközének a típusát lekérdezze.
 *
 * @returns igaz, ha a felhasználó mobil eszközről érkezik, hamis, ha nem.
 */
export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
