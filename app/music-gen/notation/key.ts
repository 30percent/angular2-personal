/// <reference path="../../../typings/browser.d.ts" />
//import _ from "lodash"
//import {getMathLib} from "../lib/math"
//var math = getMathLib();
//var math = require("mathjs");
//var math = Libs.math;
var Note = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

// This ensures no measure is greater than mCount (typically 8), doesn't properly work
// TODO: cleanup and...actually make it work properly, migrate into Key
function matchToSum(list: number[], mCount: number){
    var finalDeq: number[] = [],
        sum = 0;
    _.forEach(list, (item, ind) => {
        var temp = sum + item,
            tempMatch: number;
        if(temp > mCount){
            if((mCount-sum) < temp){
                tempMatch = finalDeq.pop() | 0;
                tempMatch += mCount - sum;
            } else {
                tempMatch = list.shift();
                tempMatch -= temp - mCount;
            }
            sum = 0;
        } else {
            tempMatch = list.shift();
            sum += tempMatch;
        }
        finalDeq.push(tempMatch);
    });

    return finalDeq;
}


var MajorKey = [0,2,4,5,7,9,11],
    NatMinor = [0,2,3,4,7,8,10],
    HarmMinor = [0,2,3,5,7,8,11];

/**
 * Class representing a "Key" from standard notation. Notes returned by functions are represented
 * by strings in the form of "f#".
 */
export class Key {
    baseInd: number;
    private _octaves: number;
    /**
     *
     * @param baseNote The "base" for the key
     * @param key The list of indices from the Note list that repr notes in the key
     * @param octaves The list of octaves available to the key
     */
    constructor(public baseNote: string, private key: number[] = MajorKey, octaves: number){
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
    getOctave(value: number) : number {
        var num = (value % (this.octaves * this.key.length)) % this.octaves;
        var totalNotes = this.octaves*this.key.length,
            keyL = this.key.length,
            num = (math.floor((value%totalNotes)/keyL) % this.octaves);
        return num;
    }

    // we fail silently, I don't like throwing though; maybe alternate solution?
    set octaves(newOct: number) {
        if(newOct > 0 && newOct < 4){
            this._octaves = newOct;
        } else if(this._octaves == null){
            this._octaves = 1;
        }
    }

    get octaves() {
        return this._octaves;
    }

    /**
     * Takes integer, finds note that matches within set key. The index may be greater than
     * 12, though it's just modulus if so.
     * @param index {number}
     * @returns {string}
     */
    getNoteFromKey(index: number) : string {
        var modInd = index%this.key.length,
            num = (this.baseInd + this.key[modInd])%12;
        return Note[num];
    }

    /**
     *
     * @returns {string[]} the list of notes "available" within Key.key
     */
    getScale() : string[]{
        var myThis = this;
        return _.times(this.key.length, myThis.getNoteFromKey);
    }

    temporary(list: number[], mCount: number) {
        return matchToSum(list, mCount);
    }

    // This would be used to determine what key signature we would be using based on the amount of accidentals
    sigFromAccidentals(count, scale="major"){
        //TODO: do...
    }

    matchingScale(){
        //TODO: finds appropriate minor for major (or vis versa)
    }

}