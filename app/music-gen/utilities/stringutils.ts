export class StringUtils {

    static escapeSpecialChars (string) {
        return string.replace(/\n/g, "\\n")
            .replace(/\'/g, "\\'")
            .replace(/\"/g, '\\"')
            .replace(/\&/g, "\\&")
            .replace(/\r/g, "\\r")
            .replace(/\t/g, "\\t")
            //.replace(/\b/g, "\\n")
            .replace(/\f/g, "\\f");
    }
}