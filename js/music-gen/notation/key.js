System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Note, MajorKey, NatMinor, HarmMinor, Key;
    // This ensures no measure is greater than mCount (typically 8), doesn't properly work
    // TODO: cleanup and...actually make it work properly, migrate into Key
    function matchToSum(list, mCount) {
        var finalDeq = [], sum = 0;
        _.forEach(list, function (item, ind) {
            var temp = sum + item, tempMatch;
            if (temp > mCount) {
                if ((mCount - sum) < temp) {
                    tempMatch = finalDeq.pop() | 0;
                    tempMatch += mCount - sum;
                }
                else {
                    tempMatch = list.shift();
                    tempMatch -= temp - mCount;
                }
                sum = 0;
            }
            else {
                tempMatch = list.shift();
                sum += tempMatch;
            }
            finalDeq.push(tempMatch);
        });
        return finalDeq;
    }
    return {
        setters:[],
        execute: function() {
            /// <reference path="../../../typings/browser.d.ts" />
            //import _ from "lodash"
            //import {getMathLib} from "../lib/math"
            //var math = getMathLib();
            //var math = require("mathjs");
            //var math = Libs.math;
            Note = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
            MajorKey = [0, 2, 4, 5, 7, 9, 11], NatMinor = [0, 2, 3, 4, 7, 8, 10], HarmMinor = [0, 2, 3, 5, 7, 8, 11];
            /**
             * Class representing a "Key" from standard notation. Notes returned by functions are represented
             * by strings in the form of "f#".
             */
            Key = (function () {
                /**
                 *
                 * @param baseNote The "base" for the key
                 * @param key The list of indices from the Note list that repr notes in the key
                 * @param octaves The list of octaves available to the key
                 */
                function Key(baseNote, key, octaves) {
                    if (key === void 0) { key = MajorKey; }
                    this.baseNote = baseNote;
                    this.key = key;
                    this.baseInd = _.findIndex(Note, function (note) {
                        return note.toLowerCase() === baseNote.toLowerCase();
                    });
                    this.octaves = octaves;
                }
                /**
                 * Given a number, determine which 'octave' it is within. This is based on Key.octaves.
                 * @param value
                 * @returns {number}
                 */
                Key.prototype.getOctave = function (value) {
                    var num = (value % (this.octaves * this.key.length)) % this.octaves;
                    var totalNotes = this.octaves * this.key.length, keyL = this.key.length, num = (math.floor((value % totalNotes) / keyL) % this.octaves);
                    return num;
                };
                Object.defineProperty(Key.prototype, "octaves", {
                    get: function () {
                        return this.octaves;
                    },
                    // we fail silently, I don't like throwing though; maybe alternate solution?
                    set: function (newOct) {
                        if (newOct > 0 && newOct < 4) {
                            this.octaves = newOct;
                        }
                        else if (this.octaves == null) {
                            this.octaves = 1;
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * Takes integer, finds note that matches within set key. The index may be greater than
                 * 12, though it's just modulus if so.
                 * @param index {number}
                 * @returns {string}
                 */
                Key.prototype.getNoteFromKey = function (index) {
                    var modInd = index % this.key.length, num = (this.baseInd + this.key[modInd]) % 12;
                    return Note[num];
                };
                /**
                 *
                 * @returns {string[]} the list of notes "available" within Key.key
                 */
                Key.prototype.getScale = function () {
                    var myThis = this;
                    return _.times(this.key.length, myThis.getNoteFromKey);
                };
                Key.prototype.temporary = function (list, mCount) {
                    return matchToSum(list, mCount);
                };
                // This would be used to determine what key signature we would be using based on the amount of accidentals
                Key.prototype.sigFromAccidentals = function (count, scale) {
                    if (scale === void 0) { scale = "major"; }
                    //TODO: do...
                };
                Key.prototype.matchingScale = function () {
                    //TODO: finds appropriate minor for major (or vis versa)
                };
                return Key;
            }());
            exports_1("Key", Key);
        }
    }
});
//# sourceMappingURL=key.js.map