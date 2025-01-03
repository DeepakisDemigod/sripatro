import { MhahCalculateFunc } from './mhahCalculateFunc';
import { MhahLocalConstant } from './mhahLocalConstant';
import { MhahPkgConstants } from './mhahPkgConstants';
import { MhahSunMoonTimer } from './mhahSunMoonTimer';
import { MhahCalendar } from './mhahCalendar';

export class MhahPanchang {
  private mhahLocalConstant = new MhahLocalConstant();
  private mhahPkgConstants = new MhahPkgConstants();
  private mhahCalculateFunc = new MhahCalculateFunc();
  private mhahSunMoonTimer = new MhahSunMoonTimer();
  private mhahCalendar = new MhahCalendar();
  calculate(dt: Date) {
    return this.mhahCalculateFunc.calculate(dt, this.mhahLocalConstant);
  }

  calendar(dt: Date, lat: number, lng: number, height?: number) {
    return this.mhahCalendar.calendar(
      this.mhahLocalConstant,
      dt,
      lat,
      lng,
      height
    );
  }

  sunTimer(date: Date, lat: number, lng: number, height?: number) {
    height = height || 0;
    return this.mhahSunMoonTimer.sunTimer(date, lat, lng, height);
  }

  getMhahConstant(catgory: string, name: string): Array<string> {
    return this.mhahLocalConstant[catgory][name];
  }

  setMhahConstant(catgory: string, name: string, mhahlist: Array<string>) {
    this.mhahLocalConstant[catgory][name] = mhahlist;
  }

  getGanaMatched(brideIno: number, groomIno: number) {
    return this.mhahPkgConstants.GanaMatched[brideIno][groomIno];
  }
}
