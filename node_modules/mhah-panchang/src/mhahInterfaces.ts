export class corr {
  mlcor: number;
  mscor: number;
  fcor: number;
  dcor: number;
  lcor: number;
  constructor(
    mlcor: number,
    mscor: number,
    fcor: number,
    dcor: number,
    lcor: number
  ) {
    this.mlcor = mlcor;
    this.mscor = mscor;
    this.fcor = fcor;
    this.dcor = dcor;
    this.lcor = lcor;
  }
}

export class corr2 {
  l: number;
  ml: number;
  ms: number;
  f: number;
  d: number;
  constructor(l: number, ml: number, ms: number, f: number, d: number) {
    this.l = l;
    this.ml = ml;
    this.ms = ms;
    this.f = f;
    this.d = d;
  }
}
