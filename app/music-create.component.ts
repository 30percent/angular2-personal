/**
 * Created by MARKTODD on 2/25/2016.
 */
import {Component, OnInit} from 'angular2/core';
import {RouteParams} from "angular2/router";
import {Key} from "./music-gen/notation/key";
import {ABCSheet} from "./music-gen/notation/sheet";
import {MathUtils} from "./music-gen/utilities/mathutils";

class ISheet {
    noteEQ: string;
    lengthEQ: string;
    title: string;
    count: number = 50;
    octaves: number = 1;
}

@Component({
    selector: 'sheet-music-generator',
    inputs: ['sheetName'],
    template: `<div>
        <div *ngIf="showEditor">
            <label>
                Title:
                <input type="text" [(ngModel)]="sheet.title">
            </label> <br />
            <label>
                Note Equation:
                <input type="text" [(ngModel)]="sheet.noteEQ">
            </label>
            <label>
                Length Equation:
                <input type="text" [(ngModel)]="sheet.lengthEQ">
            </label>
            <button (click)="generateSVG(sheet)">Generate Sheet!</button>
            <button (click)="generateMidi(sheet)">Create a Midi</button>
        </div>
        <button (click)="showEditor = !showEditor">Edit</button>
        <div id="sheetout"></div>
    </div>`,
    styles: []
})
export class MusicCreateComponent implements OnInit {
    ngOnInit(): any {
        let name = "";
        if(this._routeParams.get('name')){
            name = this._routeParams.get('name');
        }
        this.sheet.title = name;
        this.sheet.lengthEQ = "1";
        this.sheet.noteEQ = "x";
        this.showEditor = false;
        this.myABC = new ABCSheet(new Key("d", undefined, 1), "No Title");
        this.generateSVG(this.sheet);
    }
    constructor (
        private _routeParams: RouteParams
    ){}
    generateMusic(sheet: ISheet){
        this.myABC.title = sheet.title;
        this.myABC.key.octaves = sheet.octaves; //we're probably breaking some serious rules here...
        return generate(this.myABC, sheet);
    }
    generateSVG(sheet:ISheet) {
        ABCJS.renderAbc("sheetout", this.generateMusic(sheet));
    }
    createMidi(sheet: ISheet) {
        ABCJS.renderMidi("midiout", this.generateMusic(sheet), {}, {});
    }
    public sheet: ISheet = new ISheet();
    protected showEditor: boolean;
    myABC: ABCSheet;
}
function simpleXEval(eq: string, val: number){
    return math.eval(eq, {x: val});
}
function generate(abc: ABCSheet, sheet: ISheet) : string{
    let lengthEQ = sheet.lengthEQ,
        noteEQ = sheet.noteEQ,
        count = sheet.count,
        octave = sheet.octaves;
    var lengthCurry = _.curry(simpleXEval)(lengthEQ.toLowerCase());

    var notes = abc.createNoteList(MathUtils.getList(noteEQ.toLowerCase(), count));
    var zipped = [];
    notes.forEach(function (n, ind){
        zipped.push({note: n.note, octave: n.octave, length: abc.numToNoteDuration(lengthCurry(ind))});
    });
    var gened = abc.generateABC(zipped);
    return gened;
}