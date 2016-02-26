declare var ABCJS: abcjs_mod.IABCJSStatic;

declare module abcjs_mod {
    export interface IABCJSStatic {
        renderAbc(title: string, abc: string);
        renderMidi(title: string, abc: string, something: any, somethingelse: any);
    }
}