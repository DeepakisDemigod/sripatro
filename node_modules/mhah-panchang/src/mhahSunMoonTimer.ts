export class MhahSunMoonTimer {
  rad = Math.PI / 180;

  // sun times configuration (angle, morning name, evening name)

  times = [
    [-0.833, 'sunRise', 'sunSet'],
    [-0.3, 'sunRiseEnd', 'sunSetStart'],
    [-6, 'dawn', 'dusk'],
    [-12, 'nauticalDawn', 'nauticalDusk'],
    [-18, 'nightEnd', 'night'],
  ];

  sunTimer(date: Date, lat: number, lng: number, height?: number) {
    let calS = this.calculatSunTimer(date, lat, lng, height);
    let result: any = {
      solarNoon: this.fromJulian(calS.Jnoon),
      nadir: this.fromJulian(calS.Jnoon - 0.5),
    };
    let i, time, h0, Jset, Jrise;
    for (i = 0; i < this.times.length; i += 1) {
      time = this.times[i];
      h0 = (time[0] + calS.dh) * this.rad;

      Jset = this.getSetJ(
        h0,
        calS.lw,
        calS.phi,
        calS.dec,
        calS.n,
        calS.M,
        calS.L
      );
      Jrise = calS.Jnoon - (Jset - calS.Jnoon);

      result[time[1]] = this.fromJulian(Jrise);
      result[time[2]] = this.fromJulian(Jset);
    }
    return result;
  }

  calculatSunTimer(date: Date, lat: number, lng: number, height?: number) {
    height = height || 0;

    let lw = this.rad * -lng,
      phi = this.rad * lat,
      dh = this.observerAngle(height),
      d = this.toDays(date),
      n = this.julianCycle(d, lw),
      ds = this.approxTransit(0, lw, n),
      M = this.solarMeanAnomaly(ds),
      L = this.eclipticLongitude(M),
      dec = this.declination(L, 0),
      Jnoon = this.solarTransitJ(ds, M, L);

    return { Jnoon, dh, lw, phi, dec, n, M, L };
  }

  getSunRiseJd(date: Date, lat: number, lng: number, height?: number) {
    let calS = this.calculatSunTimer(date, lat, lng, height);
    let time, h0, Jset, Jrise;
    time = this.times[0];
    h0 = (time[0] + calS.dh) * this.rad;
    Jset = this.getSetJ(
      h0,
      calS.lw,
      calS.phi,
      calS.dec,
      calS.n,
      calS.M,
      calS.L
    );
    Jrise = calS.Jnoon - (Jset - calS.Jnoon);
    return Jrise;
  }

  dayMs = 1000 * 60 * 60 * 24;
  J1970 = 2440588;
  J2000 = 2451545;
  J0 = 0.0009;
  observerAngle(height) {
    return (-2.076 * Math.sqrt(height)) / 60;
  }
  julianCycle(d, lw) {
    return Math.round(d - this.J0 - lw / (2 * Math.PI));
  }
  toJulian(date) {
    return date.valueOf() / this.dayMs - 0.5 + this.J1970;
  }
  fromJulian(j) {
    return new Date((j + 0.5 - this.J1970) * this.dayMs);
  }
  toDays(date) {
    return this.toJulian(date) - this.J2000;
  }
  approxTransit(Ht, lw, n) {
    return this.J0 + (Ht + lw) / (2 * Math.PI) + n;
  }
  hourAngle(h, phi, d) {
    return Math.acos(
      (Math.sin(h) - Math.sin(phi) * Math.sin(d)) /
        (Math.cos(phi) * Math.cos(d))
    );
  }
  solarTransitJ(ds, M, L) {
    return this.J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
  }
  solarMeanAnomaly(d) {
    return this.rad * (357.5291 + 0.98560028 * d);
  }
  eclipticLongitude(M) {
    var C =
        this.rad *
        (1.9148 * Math.sin(M) +
          0.02 * Math.sin(2 * M) +
          0.0003 * Math.sin(3 * M)), // equation of center
      P = this.rad * 102.9372; // perihelion of the Earth
    return M + C + P + Math.PI;
  }
  e = this.rad * 23.4397; // obliquity of the Earth
  declination(l, b) {
    return Math.asin(
      Math.sin(b) * Math.cos(this.e) +
        Math.cos(b) * Math.sin(this.e) * Math.sin(l)
    );
  }

  getSetJ(h, lw, phi, dec, n, M, L) {
    var w = this.hourAngle(h, phi, dec),
      a = this.approxTransit(w, lw, n);
    return this.solarTransitJ(a, M, L);
  }
}
