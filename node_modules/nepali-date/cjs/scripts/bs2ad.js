#!/usr/bin/env node
'use strict';

/* eslint-disable no-console */
var NepaliDate = require('../NepaliDate').default;

function pad(n) {
  if (n < 10) {
    return '0' + n;
  }
  return '' + n;
}

function formatDate(d) {
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

try {
  var bs = process.argv[2] ? new NepaliDate(process.argv[2]) : new NepaliDate();
  console.log(formatDate(bs.getEnglishDate()));
} catch (err) {
  console.log(err.message);
  process.exit(1);
}