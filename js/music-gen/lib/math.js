System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var m;
    function getMathLib() {
        return m;
    }
    exports_1("getMathLib", getMathLib);
    return {
        setters:[],
        execute: function() {
            /// <reference path="../../../typings/browser.d.ts" />
            m = math;
        }
    }
});
//# sourceMappingURL=math.js.map