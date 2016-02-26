System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var BasicSheet, ABCSheet;
    /**
     * Takes a list of numbers and adjusts the list such that the sequence consistency adds up to <i>max</i> but not
     * surpassing before resetting.
     * E x < list.length; sum(list[0-x] == max); sum(x1-x2) == max; ...)
     * // TODO: form this equation properly
     * @param list
     * @param max
     * @returns {number[]}
     * @private
     */
    function _ensureSumLessMax(list, max) {
        var curr;
        var newRes = list.map(function (elem) {
            var newSet = curr + elem;
            if (newSet > max) {
                var rollover = newSet - max;
                elem = elem - rollover;
                curr = 0;
            }
            else if (newSet === max) {
                curr = 0;
            }
            curr += elem;
            return elem;
        });
        return newRes;
    }
    return {
        setters:[],
        execute: function() {
            /**
             * Simple sheet that just holds authorship data and a key. Used for general functionality
             */
            BasicSheet = (function () {
                function BasicSheet(key, title, author) {
                    if (title === void 0) { title = "No Title"; }
                    if (author === void 0) { author = "Trad"; }
                    this.key = key;
                    this.title = title;
                    this.author = author;
                }
                /**
                 * For any positive number, determines which note length 'best fits' it. This is essentially an arbitrary but
                 * deterministic method.
                 * @param num
                 * @returns {number} a multiple of .125 <= 1
                 */
                BasicSheet.prototype.numToNoteDuration = function (num) {
                    var diction = [.125, .25, .375, .5, .75, 1];
                    return diction[math.round(num) % diction.length];
                };
                /**
                 * For each item in list, calls numToNoteDuration.
                 * @see _ensureSumLessMax
                 * @param list
                 * @returns {number[]} a list of multiples of .125 <= 1
                 */
                BasicSheet.prototype.listToNoteDuration = function (list) {
                    var _this = this;
                    var res = list.map(function (elem) {
                        return _this.numToNoteDuration(elem);
                    });
                    return _ensureSumLessMax(res, 1);
                };
                /**
                 * Creates a list repr of specific notes
                 * @param list
                 * @returns {{note: string, octave: number}[]}
                 */
                BasicSheet.prototype.createNoteList = function (list) {
                    var _this = this;
                    return list.map(function (elem) {
                        return { note: _this.key.getNoteFromKey(elem), octave: _this.key.getOctave(elem) };
                    });
                };
                BasicSheet.prototype.createLengthList = function (list) {
                    var _this = this;
                    var res = list.map(function (elem) {
                        return _this.numToNoteDuration(elem);
                    });
                    //ensure sequence always adds up to 1 before roll over;
                    return _ensureSumLessMax(res, 1);
                };
                return BasicSheet;
            }());
            /**
             * An implementation of Sheet for ABC notation
             */
            ABCSheet = (function (_super) {
                __extends(ABCSheet, _super);
                function ABCSheet() {
                    _super.apply(this, arguments);
                }
                /**
                 * ABC uses capitalization to represent octaves. This function returns the appropriate string that represents the
                 * the octave in ABC.
                 * TODO: setup the additional two octave levels
                 * @param note
                 * @param octave
                 * @returns {string}
                 */
                ABCSheet.prototype.setNoteOctave = function (note, octave) {
                    if (octave === 1) {
                        return note.toUpperCase();
                    }
                    else {
                        return note.toLowerCase();
                    }
                };
                /**
                 * ABC uses ^ to represent sharps (and places the symbol <i>before</i> the note). This performs that conversion.
                 * @param note
                 * @returns {string}
                 */
                ABCSheet.prototype.convAccidental = function (note) {
                    if (note.charAt(1) === "#") {
                        return "^" + note.charAt(0);
                    }
                    else
                        return note;
                };
                /**
                 * Creates a properly formed ABC notation given a list of note, octave, note length tuples.
                 * @param noteRepr
                 * @returns {string}
                 */
                ABCSheet.prototype.generateABC = function (noteRepr) {
                    var _this = this;
                    var options = {
                        X: "1",
                        T: this.title,
                        M: "4/4",
                        C: this.author,
                        //K: this.key.baseNote.toUpperCase(),
                        K: "C",
                        L: "4/4"
                    };
                    var final = _.reduce(options, function (result, value, key) {
                        return result += key + ":" + value + "\n";
                    }, "");
                    var count = 0;
                    var lineLength = 0;
                    var obj = noteRepr.reduce(function (prev, curr, ind) {
                        if (count >= 1) {
                            prev += "|";
                            if (lineLength > 20) {
                                prev += "\n|";
                                lineLength = 0;
                            }
                            count = 0;
                        }
                        lineLength++;
                        count += curr.length;
                        var abcnote = _this.convAccidental(curr.note);
                        return prev += _this.setNoteOctave(abcnote, curr.octave) + "" + math.format(math.fraction(curr.length));
                    }, "") + "|";
                    return final + obj;
                };
                return ABCSheet;
            }(BasicSheet));
            exports_1("ABCSheet", ABCSheet);
        }
    }
});
//# sourceMappingURL=sheet.js.map