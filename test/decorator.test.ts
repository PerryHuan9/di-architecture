const result = new Map();

class Greeter {
    greeting: string;

    constructor(a: string, @paramDecorator message: string) {
        this.greeting = message;
    }
}


function paramDecorator(
    target: Object,
    propertyKey: string,
    parameterIndex: number
) {
    result.set(target, parameterIndex);
}

var assert = require("assert");

suite("测试参数装饰器", () => {
    test("构造器参数装饰器", () => {
        assert.equal(result.get(Greeter), 1);
    });
});
