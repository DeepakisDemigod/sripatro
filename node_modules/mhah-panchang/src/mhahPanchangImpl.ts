import { MhahMoonOutragConst } from './mhahMoonOutragConst';
import { MhahLocalConstant } from './mhahLocalConstant';

export class MhahPanchangImpl {
  kyear!: number;
  kmon!: number;
  kday!: number;
  private mhahMoonOutragConst: MhahMoonOutragConst = new MhahMoonOutragConst();
  constructor(private mhahConstant: MhahLocalConstant) {}
  d2r = Math.PI / 180;
  r2d = 180 / Math.PI;
  range = [1, 31, 0, 0, -3000, 4000, 0, 23, 0, 59, -12, 12, 0, 59];
  tipnaks = [
    2,
    5,
    6,
    0,
    1,
    4,
    3,
    2,
    4,
    5,
    5,
    0,
    2,
    1,
    3,
    6,
    1,
    4,
    4,
    5,
    0,
    3,
    3,
    3,
    5,
    0,
    1,
  ];
  Lmoon!: number;
  Lsun!: number;
  skor!: number;
  LmoonYoga!: number;
  LsunYoga!: number;
  dt!: number;
  ayanamsa: number = 0;

  daysInMonth(m: number, y: number) {
    let g_days: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) g_days[1] = 29;
    return g_days[m];
  }

  //-----------------------------------------------------------------------------------
  // Calculating geotsent p avoid longitude Moon and angular sector p News.
  // (2 sec accuracy. longitude)
  //-----------------------------------------------------------------------------------
  moon(jd: number) {
    // days from 1900
    let tdays = jd - 2415020;
    let t = tdays / 36525;
    let t2 = t * t;
    let t3 = t * t * t;

    // slope travels to the equator
    //let ob = 23.452294 - 0.0130125 * t - 0.00000164 * t2 + 0.000000503 * t3;
    // the average length moon
    let l =
      270.4337361 +
      13.176396544528099 * tdays -
      (5.86 * t2) / 3600 +
      (0.0068 * t3) / 3600;
    // the difference medium length Moon and the Sun (the averageElongation Moon):
    let d =
      350.7374861110581 +
      445267.1142166667 * t -
      t2 * 1.436111132303874e-3 +
      0.0000018888889 * t3;
    // Perigee moon
    let pe =
      334.329556 +
      (14648522.52 * t) / 3600 -
      (37.17 * t2) / 3600 -
      (0.045 * t3) / 3600;
    // the average anomoly sun
    let ms =
      358.4758333333334 +
      35999.04974999958 * t -
      t2 * 1.500000059604645e-4 -
      t3 * 3.3333333623078e-6;
    // The average anomoloy moon
    //ml = 296.1046083333757 + 477198.8491083336*t + 0.0091916667090522*t2 + 0.0000143888893*t3;
    let ml = this.fix360(l - pe);
    // Rising length node orbit the moon:
    let om =
      259.183275 -
      (6962911.23 * t) / 3600 +
      (7.48 * t2) / 3600 +
      (0.008 * t3) / 3600;
    // the average length Moon, measured from the bottom up hub orbit:

    let f = this.fix360(l - om);

    // periodic revisions
    let r2rad = 360.0 * this.d2r;
    let tb = tdays * 1e-12; // *10^12
    let t2c = tdays * tdays * 1e-16; // *10^16
    let a1 = Math.sin(r2rad * (0.53733431 - 10104982 * tb + 191 * t2c));
    let a2 = Math.sin(r2rad * (0.71995354 - 147094228 * tb + 43 * t2c));
    let c2 = Math.cos(r2rad * (0.71995354 - 147094228 * tb + 43 * t2c));
    let a3 = Math.sin(r2rad * (0.14222222 + 1536238 * tb));
    let a4 = Math.sin(r2rad * (0.48398132 - 147269147 * tb + 43 * t2c));
    let c4 = Math.cos(r2rad * (0.48398132 - 147269147 * tb + 43 * t2c));
    let a5 = Math.sin(r2rad * (0.52453688 - 147162675 * tb + 43 * t2c));
    let a6 = Math.sin(r2rad * (0.84536324 - 11459387 * tb));
    let a7 = Math.sin(r2rad * (0.23363774 + 1232723 * tb + 191 * t2c));
    let a8 = Math.sin(r2rad * (0.5875 + 9050118 * tb));
    let a9 = Math.sin(r2rad * (0.61043085 - 67718733 * tb));

    let dlm =
      0.84 * a3 + 0.31 * a7 + 14.27 * a1 + 7.261 * a2 + 0.282 * a4 + 0.237 * a6;
    let dpm = -2.1 * a3 - 2.076 * a2 - 0.84 * a4 - 0.593 * a6;
    let dkm = 0.63 * a3 + 95.96 * a2 + 15.58 * a4 + 1.86 * a5;
    let dls = -6.4 * a3 - 0.27 * a8 - 1.89 * a6 + 0.2 * a9;
    let dgc = (-4.318 * c2 - 0.698 * c4) / 3600.0 / 360.0;
    dgc = 1.000002708 + 139.978 * dgc;

    ml = this.d2r * (ml + (dlm - dpm) / 3600.0); //Average anomoly moon
    ms = this.d2r * (ms + dls / 3600.0); //Average anomoly sun
    f = this.d2r * (f + (dlm - dkm) / 3600.0);
    d = this.d2r * (d + (dlm - dls) / 3600.0); //avg elongation moon

    let lk = 0;
    let lk1 = 0;

    let i1corr = 1.0 - 6.832e-8 * tdays;
    let i2corr = dgc * dgc;

    for (let i = 0; i < 93; i++) {
      // outrage at length
      let arg =
        this.mhahMoonOutragConst.corrMoon[i].mlcor * ml +
        this.mhahMoonOutragConst.corrMoon[i].mscor * ms +
        this.mhahMoonOutragConst.corrMoon[i].fcor * f +
        this.mhahMoonOutragConst.corrMoon[i].dcor * d;
      let sinarg = Math.sin(arg);
      if (this.mhahMoonOutragConst.corrMoon[i].mscor !== 0) {
        sinarg *= i1corr;
        if (
          this.mhahMoonOutragConst.corrMoon[i].mscor === 2 ||
          this.mhahMoonOutragConst.corrMoon[i].mscor === -2
        )
          sinarg *= i1corr;
      }
      if (this.mhahMoonOutragConst.corrMoon[i].fcor !== 0) sinarg *= i2corr;
      lk += this.mhahMoonOutragConst.corrMoon[i].lcor * sinarg;
    }
    for (let i = 0; i < 27; i++) {
      // outrage at length additional
      let arg =
        this.mhahMoonOutragConst.corrMoon2[i].ml * ml +
        this.mhahMoonOutragConst.corrMoon2[i].ms * ms +
        this.mhahMoonOutragConst.corrMoon2[i].f * f +
        this.mhahMoonOutragConst.corrMoon2[i].d * d;
      let sinarg = Math.sin(arg);
      lk1 += this.mhahMoonOutragConst.corrMoon2[i].l * sinarg;
    }

    // resentments of the planets
    let dlid = 0.822 * Math.sin(r2rad * (0.3248 - 0.0017125594 * tdays));
    dlid += 0.307 * Math.sin(r2rad * (0.14905 - 0.0034251187 * tdays));
    dlid += 0.348 * Math.sin(r2rad * (0.68266 - 0.0006873156 * tdays));
    dlid += 0.662 * Math.sin(r2rad * (0.65162 + 0.0365724168 * tdays));
    dlid += 0.643 * Math.sin(r2rad * (0.88098 - 0.0025069941 * tdays));
    dlid += 1.137 * Math.sin(r2rad * (0.85823 + 0.036448727 * tdays));
    dlid += 0.436 * Math.sin(r2rad * (0.71892 + 0.036217918 * tdays));
    dlid += 0.327 * Math.sin(r2rad * (0.97639 + 0.000173491 * tdays));

    l = l + this.nutation(jd) + (dlm + lk + lk1 + dlid) / 3600.0;
    this.LmoonYoga = l;
    //alert("Lmoon="+l);
    l = this.fix360(l);

    // angular velocity of the moon on ecliptic (deg/day):
    let vl = 13.176397;
    vl = vl + 1.434006 * Math.cos(ml);
    vl = vl + 0.280135 * Math.cos(2 * d);
    vl = vl + 0.251632 * Math.cos(2 * d - ml);
    vl = vl + 0.09742 * Math.cos(2 * ml);
    vl = vl - 0.052799 * Math.cos(2 * f);
    vl = vl + 0.034848 * Math.cos(2 * d + ml);
    vl = vl + 0.018732 * Math.cos(2 * d - ms);
    vl = vl + 0.010316 * Math.cos(2 * d - ms - ml);
    vl = vl + 0.008649 * Math.cos(ms - ml);
    vl = vl - 0.008642 * Math.cos(2 * f + ml);
    vl = vl - 0.007471 * Math.cos(ms + ml);
    vl = vl - 0.007387 * Math.cos(d);
    vl = vl + 0.006864 * Math.cos(3 * ml);
    vl = vl + 0.00665 * Math.cos(4 * d - ml);
    vl = vl + 0.003523 * Math.cos(2 * d + 2 * ml);
    vl = vl + 0.003377 * Math.cos(4 * d - 2 * ml);
    vl = vl + 0.003287 * Math.cos(4 * d);
    vl = vl - 0.003193 * Math.cos(ms);
    vl = vl - 0.003003 * Math.cos(2 * d + ms);
    vl = vl + 0.002577 * Math.cos(ml - ms + 2 * d);
    vl = vl - 0.002567 * Math.cos(2 * f - ml);
    vl = vl - 0.001794 * Math.cos(2 * d - 2 * ml);
    vl = vl - 0.001716 * Math.cos(ml - 2 * f - 2 * d);
    vl = vl - 0.001698 * Math.cos(2 * d + ms - ml);
    vl = vl - 0.001415 * Math.cos(2 * d + 2 * f);
    vl = vl + 0.001183 * Math.cos(2 * ml - ms);
    vl = vl + 0.00115 * Math.cos(d + ms);
    vl = vl - 0.001035 * Math.cos(d + ml);
    vl = vl - 0.001019 * Math.cos(2 * f + 2 * ml);
    vl = vl - 0.001006 * Math.cos(ms + 2 * ml);

    this.skor = vl;
    //l += ay;
    //if(l < 0.0)l += 360.0;
    return l;
  }

  //----------------------------------------------------------------------
  // Calculating geotsent p avoid longitude Sun.
  // (the acuracy of 1 sec . longitude)
  //----------------------------------------------------------------------
  sun(jd: number) {
    // days frm 1900:
    let tdays = jd - 2415020;

    let t = tdays / 36525;
    let t2 = t * t;
    let t3 = t * t * t;

    // the avg len sun

    let ls = 279.696678 + 0.9856473354 * tdays + (1.089 * t2) / 3600;
    // perigee sun
    let pes =
      101.220833 +
      (6189.03 * t) / 3600 +
      (1.63 * t2) / 3600 +
      (0.012 * t3) / 3600;
    // avg anomoly sun

    let ms = this.fix360(ls - pes + 180);
    let g =
      ms +
      (0.266 * Math.sin((31.8 + 119.0 * t) * this.d2r) +
        6.4 * Math.sin((231.19 + 20.2 * t) * this.d2r) +
        (1.882 - 0.016 * t) * Math.sin((57.24 + 150.27 * t) * this.d2r)) /
        3600.0;

    // eccentricity orbit sun
    let ex = 0.01675104 - 0.0000418 * t - 0.000000126 * t2;

    // eccentric anomoloy calculation iterative method
    let u = this.kepler(g, ex, 0.0000003);

    // cal true anomaly sun
    let truanom;
    let b = Math.sqrt((1 + ex) / (1 - ex));
    if (Math.abs(Math.PI - u) < 1.0e-10) truanom = u;
    else truanom = 2.0 * Math.atan(b * Math.tan(u / 2));
    truanom = this.fix360(truanom * this.r2d);

    //corrections for cal of longitude and radius vector
    let u1 = (153.23 + 22518.7541 * t) * this.d2r;
    let u2 = (216.57 + 45037.5082 * t) * this.d2r;
    let u3 = (312.69 + 32964.3577 * t) * this.d2r;
    let u4 = (350.74 + 445267.1142 * t - 0.00144 * t2) * this.d2r;
    let u6 = (353.4 + 65928.71550000001 * t) * this.d2r;
    let u5 = (315.6 + 893.3 * t) * this.d2r;

    let dl = 0.00134 * Math.cos(u1);
    dl += 0.00154 * Math.cos(u2);
    dl += 0.002 * Math.cos(u3);
    dl += 0.00179 * Math.sin(u4);
    dl += (0.202 * Math.sin(u5)) / 3600;

    let dr = 0.00000543 * Math.sin(u1);
    dr += 0.00001575 * Math.sin(u2);
    dr += 0.00001627 * Math.sin(u3);
    dr += 0.00003076 * Math.cos(u4);
    dr += 9.26999999e-6 * Math.sin(u6);

    // true len of sun (deg)
    let il = ls + dl + truanom - ms;

    // corrections to abberations links
    let r1 =
      (1.0000002 * (1 - ex * ex)) / (1 + ex * Math.cos(truanom * this.d2r));
    let rs = r1 + dr; // radius vector
    let ab = (20.496 * (1 - ex * ex)) / rs / 3600;
    ls = il + this.nutation(jd) - ab; // app len sun
    this.LsunYoga = ls;

    ls = this.fix360(ls);

    return ls;
  }

  //----------------------------------------------------------------------------
  // cal start and end of tithi (len = 12)and karana (len = 6)
  //----------------------------------------------------------------------------
  tithi(jd: number, n1: number, tzone: number, len: number) {
    var s_t: any = {};
    var flag;
    let jdt = jd;
    let knv = Math.floor(((jd - 2415020) / 365.25) * 12.3685);

    for (let itit = n1; itit < n1 + 2; ++itit) {
      let aspect = len * itit; // sun n moon in the early tithi
      flag = 0;
      if (aspect === 0) {
        jdt = this.novolun(jd, knv);
        flag = 1;
      }
      if (aspect === 360) {
        jdt = this.novolun(jd, knv + 1);
        flag = 1;
      }
      while (flag < 1) {
        let Lsun0 = this.sun(jdt);
        let Lmoon0 = this.moon(jdt);
        let a = this.fix360(Lsun0 + aspect); // pt should be where luna
        let asp1 = a - Lmoon0; // assymptots of the moon to ur point
        if (asp1 > 180) asp1 -= 360;
        if (asp1 < -180) asp1 += 360;
        flag = 1;

        if (Math.abs(asp1) > 0.001) {
          jdt += asp1 / (this.skor - 1);
          flag = 0;
        }
      }
      if (itit === n1) s_t.start = this.calData(jdt + (tzone - this.dt) / 24);
      if (itit === n1 + 1) s_t.end = this.calData(jdt + (tzone - this.dt) / 24);
    }
    return s_t;
  }

  //----------------------------------------------------------------------------
  // cal entry and exit moon in nakshatra
  //----------------------------------------------------------------------------
  nakshatra(jd: number, n_naksh: number, tzone: number) {
    var s_t: any = {};
    var flag;
    let jdt = jd;

    for (let inak = n_naksh; inak < n_naksh + 2; ++inak) {
      let n1 = this.fix360((inak * 80) / 6); // co-ordinate start of nakshatra
      flag = 0;
      while (flag < 1) {
        let Lmoon0 = this.fix360(this.moon(jdt) + this.ayanamsa);
        let asp1 = n1 - Lmoon0; // distance frm moon before nakshatra(degree)
        if (asp1 > 180) asp1 -= 360;
        if (asp1 < -180) asp1 += 360;
        flag = 1;
        if (Math.abs(asp1) > 0.001) {
          jdt += asp1 / this.skor;
          flag = 0;
        }
      }
      if (inak === n_naksh)
        s_t.start = this.calData(jdt + (tzone - this.dt) / 24);
      if (inak === n_naksh + 1)
        s_t.end = this.calData(jdt + (tzone - this.dt) / 24);
    }
    return s_t;
  }

  //----------------------------------------------------------------------------
  // cal begin and end of yoga
  //----------------------------------------------------------------------------
  yoga(jd: number, zyoga: number, tzone: number) {
    var s_t: any = {};
    var flag;
    let jdt = jd;
    let z = zyoga;
    var nn_yoga = new Array(2);
    nn_yoga[0] = (Math.floor((z * 6) / 80) * 80) / 6;
    nn_yoga[1] = ((Math.floor((z * 6) / 80) + 1) * 80) / 6;
    for (let iyog = 0; iyog < 2; ++iyog) {
      flag = 0;
      while (flag < 1) {
        this.sun(jdt);
        this.moon(jdt);
        let dmoonYoga = this.LmoonYoga + this.ayanamsa - 491143.07698973856;
        let dsunYoga = this.LsunYoga + this.ayanamsa - 36976.91240579201;
        //alert(LmoonYoga+"\r"+LsunYoga+"\r"+ayanamsa);
        z = dmoonYoga + dsunYoga;
        let asp1 = nn_yoga[iyog] - z;
        flag = 1;
        if (Math.abs(asp1) > 0.001) {
          jdt += asp1 / (this.skor + 1.0145616633);
          flag = 0;
        }
        //if (Math.abs(asp1) > 0.001) {jdt += (asp1 / skor) + (58.13 * Math.sin(asp1*d2r)); flag = 0;}
      }
      if (iyog === 0) s_t.start = this.calData(jdt + (tzone - this.dt) / 24);
      if (iyog === 1) s_t.end = this.calData(jdt + (tzone - this.dt) / 24);
    }
    return s_t;
  }

  //-----------------------------------------------------------------------------
  //cal time in the near past novoluna (err less then 2 min)
  //-----------------------------------------------------------------------------
  novolun(jd: number, knv: number) {
    let t = (jd - 2415020) / 36525;
    let t2 = t * t;
    let t3 = t * t * t;

    let jdnv =
      2415020.75933 + 29.53058868 * knv + 0.0001178 * t2 - 0.000000155 * t3;
    jdnv +=
      0.00033 * Math.sin((166.56 + 132.87 * t - 0.009173 * t2) * this.d2r);
    let m = 359.2242 + 29.10535608 * knv - 0.0000333 * t2 - 0.00000347 * t3;
    let ml = 306.0253 + 385.81691806 * knv + 0.0107306 * t2 + 0.00001236 * t3;
    let f = 21.2964 + 390.67050646 * knv - 0.0016528 * t2 - 0.00000239 * t3;
    m *= this.d2r;
    ml *= this.d2r;
    f *= this.d2r;

    let djd = (0.1734 - 0.000393 * t) * Math.sin(m);
    djd += 0.0021 * Math.sin(2 * m);
    djd -= 0.4068 * Math.sin(ml);
    djd += 0.0161 * Math.sin(2 * ml);
    djd -= 0.0004 * Math.sin(3 * ml);
    djd += 0.0104 * Math.sin(2 * f);
    djd -= 0.0051 * Math.sin(m + ml);
    djd -= 0.0074 * Math.sin(m - ml);
    djd += 0.0004 * Math.sin(2 * f + m);
    djd -= 0.0004 * Math.sin(2 * f - m);
    djd -= 0.0006 * Math.sin(2 * f + ml);
    djd += 0.001 * Math.sin(2 * f - ml);
    djd += 0.0005 * Math.sin(m + 2 * ml);

    jdnv += djd;
    return jdnv;
  }

  //-----------------------------------------------------
  // decision equation kepler (in rad)
  //-----------------------------------------------------
  kepler(m: number, ex: number, err: number) {
    //val u0, delta;

    m *= this.d2r;
    let u0 = m;
    err *= this.d2r;
    let delta = 1;
    while (Math.abs(delta) >= err) {
      delta = (m + ex * Math.sin(u0) - u0) / (1 - ex * Math.cos(u0));
      u0 += delta;
    }
    return u0;
  }

  //-----------------------------------------------------
  // cal nutation in len
  //-----------------------------------------------------
  nutation(jd: number) {
    let t = (jd - 2415020) / 36525;
    let t2 = t * t;

    // avg len sun
    let ls = 279.6967 + 36000.7689 * t + 0.000303 * t2;
    // avg len moon
    let l = 270.4341639 + 481267.8831417 * t - 0.0011333333 * t2;
    // avg anomaly sun
    let ms =
      358.4758333333334 + 35999.04974999958 * t - t2 * 1.500000059604645e-4;
    // avg anomaly moon
    let ml =
      296.1046083333757 + 477198.8491083336 * t + 0.0091916667090522 * t2;
    // the diff medium len of moon and sun (avg elongation moon)
    let d =
      350.7374861110581 + 445267.1142166667 * t - t2 * 1.436111132303874e-3;

    let om = 259.1832750002543 - 1934.142008333206 * t + 0.0020777778 * t2;
    ls *= this.d2r;
    l *= this.d2r;
    ms *= this.d2r;
    ml *= this.d2r;
    d *= this.d2r;
    om *= this.d2r;
    let d2 = d * d;
    let l2 = l * l;
    let ls2 = ls * ls;

    let nut = (-17.2327 - 0.01737 * t) * Math.sin(om);
    nut += 0.2088 * Math.sin(2.0 * om);
    nut += 0.0675 * Math.sin(ml);
    nut -= 0.0149 * Math.sin(ml - d2);
    nut -= 0.0342 * Math.sin(l2 - om);
    nut += 0.0114 * Math.sin(l2 - ml);
    nut -= 0.2037 * Math.sin(l2);
    nut -= 0.0261 * Math.sin(l2 + ml);
    nut += 0.0124 * Math.sin(ls2 - om);
    nut += 0.0214 * Math.sin(ls2 - ms);
    nut -= 1.2729 * Math.sin(ls2);
    nut -= 0.0497 * Math.sin(ls2 + ms);
    nut += 0.1261 * Math.sin(ms);
    nut = nut / 3600.0;

    return nut;
  }

  //-----------------------------------------------------
  // Calculation ayanamsa (degrees)
  //-----------------------------------------------------
  calcayan(jd: number) {
    let t = (jd - 2415020) / 36525;
    // avg node len moon
    let om =
      259.183275 -
      1934.142008333206 * t +
      0.0020777778 * t * t +
      0.0000022222222 * t * t * t;
    // avg len sun
    let ls = 279.696678 + 36000.76892 * t + 0.0003025 * t * t;
    let aya =
      17.23 * Math.sin(this.d2r * om) +
      1.27 * Math.sin(this.d2r * ls * 2) -
      (5025.64 + 1.11 * t) * t;
    aya = (aya - 80861.27) / 3600.0; // 84038.27 = Fagan-Bradley, 80861.27 = Lahiri

    return aya;
  }

  //------------------------------------------------------------------------------------------
  // cal date by number of date mon and year
  //------------------------------------------------------------------------------------------
  mdy2julian(m: number, d: number, y: number) {
    let im = 12 * (y + 4800) + m - 3;
    let j = (2 * (im - Math.floor(im / 12) * 12) + 7 + 365 * im) / 12;
    j = Math.floor(j) + d + Math.floor(im / 48) - 32083;
    if (j > 2299171) j += Math.floor(im / 4800) - Math.floor(im / 1200) + 38;
    j -= 0.5;

    return j;
  }

  dTime(jd: number) {
    var efdt = [
      124,
      85,
      62,
      48,
      37,
      26,
      16,
      10,
      9,
      10,
      11,
      11,
      12,
      13,
      15,
      16,
      17,
      17,
      13.7,
      12.5,
      12,
      7.5,
      5.7,
      7.1,
      7.9,
      1.6,
      -5.4,
      -5.9,
      -2.7,
      10.5,
      21.2,
      24,
      24.3,
      29.2,
      33.2,
      40.2,
      50.5,
      56.9,
      65.7,
      75.5,
    ];
    this.calData(jd);
    let dgod = this.kyear + (this.kmon - 1) / 12 + (this.kday - 1) / 365.25;
    let t = (jd - 2378497) / 36525; // IN centuries rejection of 1800 bc
    //t = (jd - 2415020)/36525; // in cent rejection of 1900 bc
    if (dgod >= 1620 && dgod < 2010) {
      let i1 = Math.floor((dgod - 1620) / 10);
      let di = dgod - (1620 + i1 * 10);
      this.dt = efdt[i1] + ((efdt[i1 + 1] - efdt[i1]) * di) / 10;
    } else {
      if (dgod >= 2010) this.dt = 25.5 * t * t - 39;
      //if (dgod >= 2010) dt = 29.949 * t * t - 56.796;
      //if (dgod < 1620) dt = 5 + 24.349 + 72.3165 * t + 29.949 * t * t;
      if (dgod >= 948 && dgod < 1620) this.dt = 25.5 * t * t;
      if (dgod < 948) this.dt = 1361.7 + 320 * t + 44.3 * t * t;
    }
    this.dt /= 3600;
    return this.dt;
  }

  //------------------------------------------------------------------------------------------
  // cal date on calendar date
  //------------------------------------------------------------------------------------------
  calData(jd: number) {
    let z1 = jd + 0.5;
    let z2 = Math.floor(z1);
    let f = z1 - z2;

    let a, alf;
    if (z2 < 2299161) a = z2;
    else {
      alf = Math.floor((z2 - 1867216.25) / 36524.25);
      a = z2 + 1 + alf - Math.floor(alf / 4);
    }

    let b = a + 1524;
    let c = Math.floor((b - 122.1) / 365.25);
    let d = Math.floor(365.25 * c);
    let e = Math.floor((b - d) / 30.6001);

    let days = b - d - Math.floor(30.6001 * e) + f;
    this.kday = Math.floor(days);

    if (e < 13.5) this.kmon = e - 1;
    else this.kmon = e - 13;

    if (this.kmon > 2.5) this.kyear = c - 4716;
    if (this.kmon < 2.5) this.kyear = c - 4715;

    let hh1 = (days - this.kday) * 24;
    let khr = Math.floor(hh1);
    let kmin = hh1 - khr;
    let ksek = kmin * 60;
    kmin = Math.floor(ksek);
    ksek = Math.floor((ksek - kmin) * 60);
    let s = new Date(this.kyear, this.kmon - 1, this.kday, khr, kmin, ksek, 0);

    return s;
  }

  //------------------------------------------------------------------------------------------
  // transalation deg logitudinal in degrees,min and sec
  //------------------------------------------------------------------------------------------
  lon2dmsz(x: number) {
    var d, m, s;
    x = Math.abs(x);
    d = Math.floor(x);
    let ss0 = Math.round((x - d) * 3600);
    m = Math.floor(ss0 / 60);
    s = (ss0 % 60) % 60;
    d %= 30;
    let str = d + ' ' + m + "'" + s + '" ';
    return str;
  }

  //------------------------------------------------------------------------------------------
  // translation degrees in deg, min and sec
  //------------------------------------------------------------------------------------------
  lon2dms(x: number) {
    var d, m, s;
    x = Math.abs(x);
    d = Math.floor(x);
    let ss0 = Math.round((x - d) * 3600);
    m = Math.floor(ss0 / 60);
    s = (ss0 % 60) % 60;
    let str = d + ' ' + m + "'" + s + '"';

    return str;
  }

  //------------------------------------------------------------------------------------------
  // fixing the angle within 360 degrees
  //------------------------------------------------------------------------------------------
  fix360(v: number) {
    while (v < 0.0) v += 360.0;
    while (v > 360.0) v -= 360.0;
    return v;
  }

  //------------------------------------------------------------------------------------------
  // Day of the Week
  //------------------------------------------------------------------------------------------
  weekDay(jd: number) {
    // Julian date for the begin of the day
    let jd0 = Math.floor(jd) + 0.5;
    if (jd < jd0) jd0 -= 1;

    // day
    let jdn = jd0 + 1.5;
    let dn1 = Math.floor(jdn / 7) * 7;

    let wday = Math.floor(jdn - dn1);

    return wday;
  }

  lunarPhase(jd: number): number {
    let Lmoon = this.moon(jd); // Logitudinal Moon
    let Lsun = this.sun(jd); // Logitudinal Sun
    return this.fix360(Lmoon - Lsun);
  }
}
