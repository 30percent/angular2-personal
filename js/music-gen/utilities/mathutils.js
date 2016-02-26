System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MathUtils;
    return {
        setters:[],
        execute: function() {
            MathUtils = (function () {
                function MathUtils() {
                }
                MathUtils.getList = function (expr, amount) {
                    return _.times(amount, this.evalGenerator(expr).next);
                };
                MathUtils.evalGenerator = function (expr) {
                    var index = -1;
                    return {
                        next: function (someX) {
                            var val = (_.isNumber(someX)) ? someX : index;
                            return math.eval(expr, { x: val });
                        }
                    };
                };
                MathUtils.simpleXEval = function (eq, val) {
                    return math.eval(eq, { x: val });
                };
                return MathUtils;
            }());
            exports_1("MathUtils", MathUtils);
        }
    }
});
//# sourceMappingURL=mathutils.js.map