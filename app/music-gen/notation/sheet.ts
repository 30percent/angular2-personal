/**
 * Created by MARKTODD on 1/26/2016.
 */
import {Key} from "./key";

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
function _ensureSumLessMax(list : number[], max: number) : number[]{
    var curr;
    var newRes = list.map((elem) => {
        var newSet = curr + elem;
        if(newSet > max) {
            let rollover = newSet - max;
            elem = elem - rollover;
            curr = 0;
        } else if(newSet === max){
            curr = 0;
        }
        curr += elem;
        return elem;
    });
    return newRes;
}

interface Sheet {
    key: Key,
    title: string,
    author: string
}

/**
 * Simple sheet that just holds authorship data and a key. Used for general functionality
 */
class BasicSheet implements Sheet {

    constructor(public key: Key, public title: string = "No Title", public author = "Trad"){

    }

    /**
     * For any positive number, determines which note length 'best fits' it. This is essentially an arbitrary but
     * deterministic method.
     * @param num
     * @returns {number} a multiple of .125 <= 1
     */
    numToNoteDuration(num: number){
        var diction = [.125, .25, .375, .5, .75, 1];
        return diction[(<number> math.round(num))%diction.length];
    }

    /**
     * For each item in list, calls numToNoteDuration.
     * @see _ensureSumLessMax
     * @param list
     * @returns {number[]} a list of multiples of .125 <= 1
     */
    listToNoteDuration(list: number[]) : number[]{
        var res = list.map((elem) => {
            return this.numToNoteDuration(elem);
        });
        return _ensureSumLessMax(res, 1);
    }

    /**
     * Creates a list repr of specific notes
     * @param list
     * @returns {{note: string, octave: number}[]}
     */
    createNoteList(list: number[]) : {note: string, octave: number}[]{
        return list.map((elem) => {
            return { note: this.key.getNoteFromKey(elem), octave: this.key.getOctave(elem)};
        })
    }

    createLengthList(list: number[]) : number[] {
        var res = list.map((elem) => {
            return this.numToNoteDuration(elem);
        });
        //ensure sequence always adds up to 1 before roll over;
        return _ensureSumLessMax(res, 1);
    }
}

/**
 * An implementation of Sheet for ABC notation
 */
export class ABCSheet extends BasicSheet{

    /**
     * ABC uses capitalization to represent octaves. This function returns the appropriate string that represents the
     * the octave in ABC.
     * TODO: setup the additional two octave levels
     * @param note
     * @param octave
     * @returns {string}
     */
    setNoteOctave(note: string, octave?: number){
        if(octave === 1) {
            return note.toUpperCase();
        } else {
            return note.toLowerCase();
        }
    }

    /**
     * ABC uses ^ to represent sharps (and places the symbol <i>before</i> the note). This performs that conversion.
     * @param note
     * @returns {string}
     */
    private convAccidental(note: string): string{
        if(note.charAt(1) === "#"){
            return "^" + note.charAt(0);
        } else
            return note;
    }

    /**
     * Creates a properly formed ABC notation given a list of note, octave, note length tuples.
     * @param noteRepr
     * @returns {string}
     */
    generateABC(noteRepr: {note: string, octave?: number, length: number}[]) {
        var options = {
            X: "1",
            T: this.title,
            M: "4/4",
            C: this.author,
            K: this.key.baseNote.toUpperCase(),
            L: "4/4"
        };
        var final : string = _.reduce(options, (result : string, value, key) =>{
            return result += key + ":" + value + "\n";
        }, "");
        var count = 0;
        var lineLength = 0;

        var obj = noteRepr.reduce((prev, curr, ind) => {
            if(count >= 1){
                prev += "|";
                if(lineLength > 20) {
                    prev += "\n|";
                    lineLength = 0;
                }
                count = 0;
            }
            lineLength++;
            count += curr.length;

            let abcnote = this.convAccidental(curr.note);
            return prev += this.setNoteOctave(abcnote, curr.octave) + "" + math.format(math.fraction(curr.length));
        }, "") + "|";

        return final + obj;
    }
}