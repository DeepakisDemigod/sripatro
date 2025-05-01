#!/usr/bin/env node
'use strict';

/* eslint-disable no-console */
var NepaliDate = require('../NepaliDate').default;

var ad = process.argv[2] ? new Date(process.argv[2]) : new Date();
if (Number.isNaN(ad.getTime())) {
  console.log('Invalid date input \'' + process.argv[2] + '\'');
  process.exit(1);
}
if (ad < NepaliDate.minimum() || ad > NepaliDate.maximum()) {
  console.log('Date must be within ' + NepaliDate.minimum().toDateString() + ' to ' + NepaliDate.maximum().toDateString());
  process.exit(1);
}

var n = new NepaliDate(ad);
console.log(n.toString());