export declare class MhahSunMoonTimer {
    rad: number;
    times: (string | number)[][];
    sunTimer(date: Date, lat: number, lng: number, height?: number): any;
    calculatSunTimer(date: Date, lat: number, lng: number, height?: number): {
        Jnoon: number;
        dh: number;
        lw: number;
        phi: number;
        dec: number;
        n: number;
        M: number;
        L: any;
    };
    getSunRiseJd(date: Date, lat: number, lng: number, height?: number): any;
    dayMs: number;
    J1970: number;
    J2000: number;
    J0: number;
    observerAngle(height: any): number;
    julianCycle(d: any, lw: any): number;
    toJulian(date: any): number;
    fromJulian(j: any): Date;
    toDays(date: any): number;
    approxTransit(Ht: any, lw: any, n: any): any;
    hourAngle(h: any, phi: any, d: any): number;
    solarTransitJ(ds: any, M: any, L: any): number;
    solarMeanAnomaly(d: any): number;
    eclipticLongitude(M: any): any;
    e: number;
    declination(l: any, b: any): number;
    getSetJ(h: any, lw: any, phi: any, dec: any, n: any, M: any, L: any): number;
}
