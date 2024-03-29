verify(/ca(t|r)/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

verify(/ferr(et|ari|y)/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/\b\w+ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[.|,|:|;]/,
       ["bad punctuation ."],
       ["escape the period"]);

verify(/\w{7,}/,
       ["Siebentausenddreihundertzweiundzwanzig"],
       ["no", "three small words"]);

verify(/\b[^eE\s]+\b/,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);

function verify(regexp, yes, no) {
       for (let str of yes) {
              if (!regexp.test(str)) {
                     console.log(`Failure to match '${str}'`);
              }
       }
       for (let str of no) {
              if (regexp.test(str)) {
                     console.log(`Unexpected match for '${str}'`);
              }
       }
}

console.log("Done!");
