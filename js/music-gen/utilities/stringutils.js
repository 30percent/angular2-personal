System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StringUtils;
    return {
        setters:[],
        execute: function() {
            StringUtils = (function () {
                function StringUtils() {
                }
                StringUtils.escapeSpecialChars = function (string) {
                    return string.replace(/\n/g, "\\n")
                        .replace(/\'/g, "\\'")
                        .replace(/\"/g, '\\"')
                        .replace(/\&/g, "\\&")
                        .replace(/\r/g, "\\r")
                        .replace(/\t/g, "\\t")
                        .replace(/\f/g, "\\f");
                };
                return StringUtils;
            }());
            exports_1("StringUtils", StringUtils);
        }
    }
});
//# sourceMappingURL=stringutils.js.map