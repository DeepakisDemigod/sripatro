import { MhahLocalConstant } from './mhahLocalConstant';
import { MhahPanchangImpl } from './mhahPanchangImpl';
import { MhahSunMoonTimer } from './mhahSunMoonTimer';
import { MhahCalculateFunc } from './mhahCalculateFunc';
export class MhahCalendar {
  calendar(
    mhahConstant: MhahLocalConstant,
    dt: Date,
    lat: number,
    lng: number,
    height?: number
  ) {
    let Tithi: any = {} as {};
    let Nakshatra: any = {} as {};
    let Yoga: any = {} as {};
    let Karna: any = {} as {};
    let Masa: any = {} as {};
    let MoonMasa: any = {} as {};
    let Raasi: any = {} as {};
    let Ritu: any = {} as {};
    let Paksha: any = {} as {};
    let Gana: any = {} as {};
    let Guna: any = {} as {};
    let Trinity: any = {} as {};
    let mhahPanchangImpl = new MhahPanchangImpl(mhahConstant);
    let mhahCalculateFunc = new MhahCalculateFunc();
    let mhahSunMoonTimer = new MhahSunMoonTimer();
    let sunRise = mhahSunMoonTimer.getSunRiseJd(dt, lat, lng, height);
    let nn_tithi = this.getCalendarTithi(sunRise, mhahPanchangImpl);
    let nn_paksha = mhahCalculateFunc.getPaksha(nn_tithi);
    let ayanamsaAtRise = mhahPanchangImpl.calcayan(sunRise);
    let nn_naksh = this.getCalendarNakshatra(
      mhahCalculateFunc,
      mhahPanchangImpl,
      ayanamsaAtRise,
      sunRise
    );
    let nn_yoga = this.getCalendarYoga(
      mhahCalculateFunc,
      mhahPanchangImpl,
      sunRise,
      ayanamsaAtRise
    );
    let nn_karana = mhahCalculateFunc.getKarana(
      mhahPanchangImpl.moon(sunRise),
      mhahPanchangImpl.sun(sunRise)
    )[0];
    let nn_raasi = this.getCalendarRaasi(
      mhahPanchangImpl,
      mhahPanchangImpl.sun(sunRise),
      ayanamsaAtRise
    );

    let masa: { n_maasa: number; is_leap_month: boolean } = this.getMasa(
      mhahPanchangImpl,
      nn_tithi,
      sunRise
    );

    let ritu = this.getRitu(masa.n_maasa);

    Raasi.ino = nn_raasi - 1;
    Raasi.name_en_UK = mhahConstant.Raasi.name_en_UK[nn_raasi - 1];
    Raasi.name = mhahConstant.Raasi.name[nn_raasi - 1];
    Guna.ino = mhahCalculateFunc.getRaasiGuna(Raasi.ino);
    Guna.name_en_IN = mhahConstant.Guna.name_en_IN[Guna.ino];
    Guna.name_en_UK = mhahConstant.Guna.name_en_UK[Guna.ino];
    Guna.name = mhahConstant.Guna.name[Guna.ino];

    Tithi.name = mhahConstant.Tithi.name[nn_tithi - 1];
    Tithi.name_en_IN = mhahConstant.Tithi.name_en_IN[nn_tithi - 1];
    Tithi.ino = nn_tithi - 1;
    Paksha.ino = nn_paksha;
    Paksha.name = mhahConstant.Paksha.name[nn_paksha];
    Paksha.name_en_IN = mhahConstant.Paksha.name_en_IN[nn_paksha];
    Paksha.name_en_UK = mhahConstant.Paksha.name_en_UK[nn_paksha];

    Nakshatra.name = mhahConstant.Nakshatra.name[nn_naksh];
    Nakshatra.name_en_IN = mhahConstant.Nakshatra.name_en_IN[nn_naksh];
    Nakshatra.ino = nn_naksh;
    Trinity.ino = mhahCalculateFunc.getTrinityByNakshatra(Nakshatra.ino);
    Trinity.name_en_IN = mhahConstant.Trinity.name_en_IN[Trinity.ino];
    Trinity.name = mhahConstant.Trinity.name[Trinity.ino];
    Gana.ino = mhahCalculateFunc.getGanaViaNakshatra(Nakshatra.ino);
    Gana.name_en_IN = mhahConstant.Gana.name_en_IN[Gana.ino];
    Gana.name_en_UK = mhahConstant.Gana.name_en_UK[Gana.ino];
    Gana.name = mhahConstant.Gana.name[Gana.ino];

    Yoga.name = mhahConstant.Yoga.name[nn_yoga];
    Yoga.name_en_IN = mhahConstant.Yoga.name_en_IN[nn_yoga];
    Yoga.ino = nn_yoga;
    Karna.name = mhahConstant.Karna.name[nn_karana];
    Karna.name_en_IN = mhahConstant.Karna.name_en_IN[nn_karana];
    Karna.ino = nn_karana;
    Masa.ino = nn_raasi - 1;
    Masa.name = mhahConstant.Masa.name[nn_raasi - 1];
    Masa.name_en_IN = mhahConstant.Masa.name_en_IN[nn_raasi - 1];
    MoonMasa.ino = masa.n_maasa - 1;
    MoonMasa.isLeapMonth = masa.is_leap_month;
    MoonMasa.name = mhahConstant.Masa.name[masa.n_maasa - 1];
    MoonMasa.name_en_IN = mhahConstant.Masa.name_en_IN[masa.n_maasa - 1];
    Ritu.ino = ritu;
    Ritu.name = mhahConstant.Ritu.name[ritu];
    Ritu.name_en_UK = mhahConstant.Ritu.name_en_UK[ritu];
    return {
      Tithi,
      Paksha,
      Nakshatra,
      Yoga,
      Karna,
      Masa,
      MoonMasa,
      Raasi,
      Ritu,
      Gana,
      Guna,
      Trinity,
    };
  }

  // get tithi in (1-15) Sukla and (16-30) Krushna
  getCalendarTithi(sunRise: number, mhahPanchangImpl: MhahPanchangImpl) {
    let moonPhaseToday = mhahPanchangImpl.lunarPhase(sunRise);
    let today = Math.ceil(moonPhaseToday / 12);
    let tithi = today;
    //check for skipped tithi
    let moonPhaseTommorow = mhahPanchangImpl.lunarPhase(sunRise + 1);
    let tommorow = Math.ceil(moonPhaseTommorow / 12);
    let isSkipped = (tommorow - today) % 30 > 1;
    if (isSkipped) {
      tithi = today + 1;
    }
    return tithi;
  }

  getCalendarNakshatra(
    mhahCalculateFunc: MhahCalculateFunc,
    mhahPanchangImpl: MhahPanchangImpl,
    ayanamsa: number,
    sunRise: number
  ) {
    let nak_today = mhahCalculateFunc.getNakshatra(
      mhahPanchangImpl,
      mhahPanchangImpl.moon(sunRise),
      ayanamsa
    );
    let nak_tmrw = mhahCalculateFunc.getNakshatra(
      mhahPanchangImpl,
      mhahPanchangImpl.moon(sunRise + 1),
      mhahPanchangImpl.calcayan(sunRise + 1)
    );
    let n_nak = nak_today;
    let isSkipped = (nak_tmrw - nak_today) % 27 > 1;
    if (isSkipped) {
      n_nak = nak_today + 1;
    }
    return n_nak;
  }

  getCalendarYoga(
    mhahCalculateFunc: MhahCalculateFunc,
    mhahPanchangImpl: MhahPanchangImpl,
    sunRise: number,
    ayanamsa: number
  ) {
    let todayYoga = mhahCalculateFunc.getYoga(
      mhahCalculateFunc.getZYoga(mhahPanchangImpl, ayanamsa, sunRise)
    );
    let tmorowYoga = mhahCalculateFunc.getYoga(
      mhahCalculateFunc.getZYoga(
        mhahPanchangImpl,
        mhahPanchangImpl.calcayan(sunRise + 1),
        sunRise + 1
      )
    );
    let n_yoga = todayYoga;
    let isSkipped = (tmorowYoga - todayYoga) % 27 > 1;
    if (isSkipped) {
      n_yoga = todayYoga + 1;
    }
    return n_yoga;
  }

  getCalendarRaasi(
    mhahPanchangImpl: MhahPanchangImpl,
    Lsun: number,
    ayanamsa: number
  ) {
    let solar_nirayana = mhahPanchangImpl.fix360(Lsun + ayanamsa);
    return Math.ceil(solar_nirayana / 30);
  }

  getMasa(mhahPanchangImpl: MhahPanchangImpl, tithi: number, sunrise: number) {
    let lastNewMoon = sunrise - (tithi - 1);
    let nextNewMoon = sunrise + (29 - (tithi - 1));
    let currentSolarMonth = this.getCalendarRaasi(
      mhahPanchangImpl,
      mhahPanchangImpl.sun(lastNewMoon),
      mhahPanchangImpl.calcayan(lastNewMoon)
    );
    let nextSolarMonth = this.getCalendarRaasi(
      mhahPanchangImpl,
      mhahPanchangImpl.sun(nextNewMoon),
      mhahPanchangImpl.calcayan(nextNewMoon)
    );

    let is_leap_month = currentSolarMonth === nextSolarMonth;
    let n_maasa = is_leap_month ? currentSolarMonth : currentSolarMonth + 1;
    if (n_maasa > 12) {
      n_maasa = n_maasa % 12;
    }

    return { n_maasa, is_leap_month };
  }

  getRitu(masa_num: number): number {
    return Math.floor((masa_num - 1) / 2);
  }
}
