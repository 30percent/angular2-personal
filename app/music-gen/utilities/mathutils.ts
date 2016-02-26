export class MathUtils {
    static getList(expr: string, amount : number) {
        return _.times(amount, this.evalGenerator(expr).next);
    }

    static evalGenerator(expr: string) {
        var index = -1;
        return {
            next: function(someX) {
                var val = (_.isNumber(someX)) ? someX : index;
                return math.eval(expr, {x: val});
            }
        }
    }

    static simpleXEval(eq: string, val: number){
        return math.eval(eq, {x: val});
    }
}