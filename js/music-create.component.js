System.register(['angular2/core', "angular2/router", "./music-gen/notation/key", "./music-gen/notation/sheet", "./music-gen/utilities/mathutils"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, key_1, sheet_1, mathutils_1;
    var ISheet, MusicCreateComponent;
    function simpleXEval(eq, val) {
        return math.eval(eq, { x: val });
    }
    function generate(abc, sheet) {
        var lengthEQ = sheet.lengthEQ, noteEQ = sheet.noteEQ, count = sheet.count, octave = sheet.octaves;
        var lengthCurry = _.curry(simpleXEval)(lengthEQ.toLowerCase());
        var notes = abc.createNoteList(mathutils_1.MathUtils.getList(noteEQ.toLowerCase(), count));
        var zipped = [];
        notes.forEach(function (n, ind) {
            zipped.push({ note: n.note, octave: n.octave, length: abc.numToNoteDuration(lengthCurry(ind)) });
        });
        var gened = abc.generateABC(zipped);
        return gened;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (key_1_1) {
                key_1 = key_1_1;
            },
            function (sheet_1_1) {
                sheet_1 = sheet_1_1;
            },
            function (mathutils_1_1) {
                mathutils_1 = mathutils_1_1;
            }],
        execute: function() {
            ISheet = (function () {
                function ISheet() {
                    this.count = 50;
                    this.octaves = 1;
                }
                return ISheet;
            }());
            MusicCreateComponent = (function () {
                function MusicCreateComponent(_routeParams) {
                    this._routeParams = _routeParams;
                    this.sheet = new ISheet();
                }
                MusicCreateComponent.prototype.ngOnInit = function () {
                    var name = "";
                    if (this._routeParams.get('name')) {
                        name = this._routeParams.get('name');
                    }
                    this.sheet.title = name;
                    this.sheet.lengthEQ = "1";
                    this.sheet.noteEQ = "x";
                    this.showEditor = false;
                    this.myABC = new sheet_1.ABCSheet(new key_1.Key("d", undefined, 1), "No Title");
                    this.createSVG(this.sheet);
                };
                MusicCreateComponent.prototype.generateMusic = function (sheet) {
                    this.myABC.title = sheet.title;
                    this.myABC.key.octaves = sheet.octaves; //we're probably breaking some serious rules here...
                    return generate(this.myABC, sheet);
                };
                MusicCreateComponent.prototype.createSVG = function (sheet) {
                    ABCJS.renderAbc("sheetout", this.generateMusic(sheet));
                };
                MusicCreateComponent.prototype.createMidi = function (sheet) {
                    ABCJS.renderMidi("midiout", this.generateMusic(sheet), {}, {});
                };
                MusicCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-music-generator',
                        inputs: ['sheetName'],
                        templateUrl: "app/music-create.component.html",
                        styles: []
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], MusicCreateComponent);
                return MusicCreateComponent;
            }());
            exports_1("MusicCreateComponent", MusicCreateComponent);
        }
    }
});
//# sourceMappingURL=music-create.component.js.map