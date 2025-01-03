import { MhahLocalConstant } from './mhahLocalConstant';
import { MhahPanchangImpl } from './mhahPanchangImpl';

export class MhahCalculateFunc {
  calculate(d: Date, mhahConstant: MhahLocalConstant) {
    let mhahPanchangImpl = new MhahPanchangImpl(mhahConstant);
    let Day: any = {} as {};
    let Tithi: any = {} as {};
    let Paksha: any = {} as {};
    let Nakshatra: any = {} as {};
    let Karna: any = {} as {};
    let Yoga: any = {} as {};
    let Ayanamsa: any = {} as {};
    let Raasi: any = {} as {};
    let Julian: any = {} as {};
    let Gana: any = {} as {};
    let Guna: any = {} as {};
    let Trinity: any = {} as {};

    var n_wday,
      n_tithi = 1,
      n_naksh = 1,
      n_karana = 0,
      n_yoga;
    //var mhahPanchangImpl = new MhahPanchangImpl();

    var day = d.getDate();
    var mon = d.getMonth() + 1;
    var year = d.getFullYear();
    var hr = d.getHours();
    hr += d.getMinutes() / 60;
    var tzone = (d.getTimezoneOffset() / 60) * -1;

    let inpmin: any = Math.floor(d.getMinutes());
    if (inpmin < 10) inpmin = '0' + inpmin;

    // Julian date in local p. LT:
    let dayhr = day + hr / 24;
    let jdlt = mhahPanchangImpl.mdy2julian(mon, dayhr, year);

    // Day:
    n_wday = mhahPanchangImpl.weekDay(jdlt);
    Day.ino = n_wday;
    Day.name = mhahConstant.Day.name[n_wday];
    Day.name_en_UK = mhahConstant.Day.name_en_UK[n_wday];

    // julian day at the begining of the day
    let jd0 = mhahPanchangImpl.mdy2julian(mon, day, year);
    let jdut = jd0 + (hr - tzone) / 24;
    mhahPanchangImpl.dt = mhahPanchangImpl.dTime(jdut);
    let jd = jdut + mhahPanchangImpl.dt / 24;

    //ayyanamsa
    mhahPanchangImpl.ayanamsa = mhahPanchangImpl.calcayan(jd);

    // Logitudinal Moon
    mhahPanchangImpl.Lmoon = mhahPanchangImpl.moon(jd);

    // Logitudinal Sun
    mhahPanchangImpl.Lsun = mhahPanchangImpl.sun(jd);

    // yoga:
    let zyoga = this.getZYoga(mhahPanchangImpl, mhahPanchangImpl.ayanamsa, jd);
    n_yoga = this.getYoga(zyoga);
    let s_yoga = mhahPanchangImpl.yoga(jd, zyoga, tzone);

    // Nakstra
    n_naksh = this.getNakshatra(
      mhahPanchangImpl,
      mhahPanchangImpl.Lmoon,
      mhahPanchangImpl.ayanamsa
    );
    var s_naksh = mhahPanchangImpl.nakshatra(jd, n_naksh, tzone);

    // tithi
    n_tithi = this.getTithi(mhahPanchangImpl.Lmoon, mhahPanchangImpl.Lsun);
    var s_tithi = mhahPanchangImpl.tithi(jd, n_tithi, tzone, 12);

    // paksha
    let n_paksha = this.getPaksha(n_tithi + 1);

    // Karana
    let KaranaArray = this.getKarana(
      mhahPanchangImpl.Lmoon,
      mhahPanchangImpl.Lsun
    );
    n_karana = KaranaArray[0];
    let nk = KaranaArray[1];
    let s_karana = mhahPanchangImpl.tithi(jd, nk, tzone, 6);

    let z = this.getRaasi(
      mhahPanchangImpl,
      mhahPanchangImpl.Lmoon,
      mhahPanchangImpl.ayanamsa
    );

    Ayanamsa.name = mhahPanchangImpl.lon2dms(mhahPanchangImpl.ayanamsa);
    Raasi.name = mhahConstant.Raasi.name[z];
    Raasi.ino = z;
    Raasi.name_en_UK = mhahConstant.Raasi.name_en_UK[z];

    Guna.ino = this.getRaasiGuna(Raasi.ino);
    Guna.name_en_IN = mhahConstant.Guna.name_en_IN[Guna.ino];
    Guna.name_en_UK = mhahConstant.Guna.name_en_UK[Guna.ino];
    Guna.name = mhahConstant.Guna.name[Guna.ino];

    Nakshatra.name = mhahConstant.Nakshatra.name[n_naksh];
    Nakshatra.name_en_IN = mhahConstant.Nakshatra.name_en_IN[n_naksh];
    Nakshatra.ino = n_naksh;
    Nakshatra.start = s_naksh.start;
    Nakshatra.end = s_naksh.end;

    Trinity.ino = this.getTrinityByNakshatra(Nakshatra.ino);
    Trinity.name_en_IN = mhahConstant.Trinity.name_en_IN[Trinity.ino];
    Trinity.name = mhahConstant.Trinity.name[Trinity.ino];
    Gana.ino = this.getGanaViaNakshatra(Nakshatra.ino);
    Gana.name_en_IN = mhahConstant.Gana.name_en_IN[Gana.ino];
    Gana.name_en_UK = mhahConstant.Gana.name_en_UK[Gana.ino];
    Gana.name = mhahConstant.Gana.name[Gana.ino];

    Karna.name = mhahConstant.Karna.name[n_karana];
    Karna.name_en_IN = mhahConstant.Karna.name_en_IN[n_karana];
    Karna.ino = n_karana;
    Karna.start = s_karana.start;
    Karna.end = s_karana.end;
    Yoga.name = mhahConstant.Yoga.name[n_yoga];
    Yoga.name_en_IN = mhahConstant.Yoga.name_en_IN[n_yoga];
    Yoga.ino = n_yoga;
    Yoga.start = s_yoga.start;
    Yoga.end = s_yoga.end;
    Tithi.name = mhahConstant.Tithi.name[n_tithi];
    Tithi.name_en_IN = mhahConstant.Tithi.name_en_IN[n_tithi];
    Tithi.ino = n_tithi;
    Tithi.start = s_tithi.start;
    Tithi.end = s_tithi.end;

    Paksha.ino = n_paksha;
    Paksha.name = mhahConstant.Paksha.name[n_paksha];
    Paksha.name_en_IN = mhahConstant.Paksha.name_en_IN[n_paksha];
    Paksha.name_en_UK = mhahConstant.Paksha.name_en_UK[n_paksha];

    Julian.date = jd;
    Julian.day = Math.floor(jd);

    return {
      Day,
      Tithi,
      Paksha,
      Nakshatra,
      Karna,
      Yoga,
      Ayanamsa,
      Raasi,
      Julian,
      Gana,
      Guna,
      Trinity,
    };
  }

  getTithi(Lmoon: number, Lsun: number) {
    if (Lmoon < Lsun) Lmoon += 360;
    return Math.floor((Lmoon - Lsun) / 12);
  }

  getNakshatra(
    mhahPanchangImpl: MhahPanchangImpl,
    Lmoon: number,
    ayanamsa: number
  ) {
    let Lmoon0 = mhahPanchangImpl.fix360(Lmoon + ayanamsa);
    return Math.floor((Lmoon0 * 6) / 80);
  }

  getZYoga(mhahPanchangImpl: MhahPanchangImpl, ayanamsa: number, jd: number) {
    mhahPanchangImpl.moon(jd);
    mhahPanchangImpl.sun(jd);
    let dmoonYoga = mhahPanchangImpl.LmoonYoga + ayanamsa - 491143.07698973856;
    let dsunYoga = mhahPanchangImpl.LsunYoga + ayanamsa - 36976.91240579201;

    return dmoonYoga + dsunYoga;
  }

  getYoga(zyoga: number) {
    let n_yoga = (zyoga * 6) / 80;
    while (n_yoga < 0) n_yoga += 27;
    while (n_yoga > 27) n_yoga -= 27;

    return Math.floor(n_yoga);
  }

  getKarana(Lmoon0: number, Lsun0: number) {
    let n_karana = 0,
      nk = 0;
    if (Lmoon0 < Lsun0) Lmoon0 += 360;
    nk = Math.floor((Lmoon0 - Lsun0) / 6);
    if (nk === 0) n_karana = 10;
    if (nk >= 57) n_karana = nk - 50;
    if (nk > 0 && nk < 57) n_karana = nk - 1 - Math.floor((nk - 1) / 7) * 7;
    return [n_karana, nk];
  }

  getRaasi(
    mhahPanchangImpl: MhahPanchangImpl,
    Lmoon: number,
    ayanamsa: number
  ) {
    return Math.floor(Math.abs(mhahPanchangImpl.fix360(Lmoon + ayanamsa)) / 30);
  }

  getPaksha(n_tithi: number): number {
    return n_tithi > 15 ? 1 : 0;
  }

  getRaasiGuna(raasiIndex) {
    return raasiIndex % 3;
  }

  getTrinityByNakshatra(raasiIndex) {
    return Math.floor(raasiIndex / 9);
  }

  getGanaViaNakshatra(raasiIndex) {
    let ganaPostions = [
      0,
      1,
      2,
      1,
      0,
      1,
      0,
      0,
      2,
      2,
      1,
      1,
      0,
      2,
      0,
      2,
      0,
      2,
      2,
      1,
      1,
      0,
      2,
      2,
      1,
      1,
      0,
    ];
    return ganaPostions[raasiIndex];
  }
}
