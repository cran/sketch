const R = require("JEST_CONFIG_NAME_MAPPER/node-funprog.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing map", () => {
    let input, result, expected;
    let addOne = x => x + 1;
    input = [1,2,3,4,5];
    result = R.map(input, addOne);
    expected = [2,3,4,5,6];
    expect(result).toStrictEqual(expected);

    let addS = x => x + 's';
    input = ["apple", "orange"];
    result = R.map(input, addS);
    expected = ["apples", "oranges"];
    expect(result).toStrictEqual(expected);
})

test("Testing map2", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    input_2 = [2,4,6,8,10];
    result = R.map2(input, input_2, (a,b) => a + b);
    expected = [3,6,9,12,15];
    expect(result).toStrictEqual(expected);

    input = ["apple", "orange"];
    input_2 = ["s", "s"];
    result = R.map2(input, input_2, (a,b) => a + b);
    expected = ["apples", "oranges"];
    expect(result).toStrictEqual(expected);
})


test("Testing pmap", () => {
    let input, result, expected;
    input = [[1,2,3,4,5], [1,2,3,4,5], [1,2,3,4,5]];
    result = R.pmap(input, (a,b,c) => a + b + c);
    expected = [3,6,9,12,15];
    expect(result).toStrictEqual(expected);

    let addS = x => x + 's';
    input = [["apples", "oranges"],
             ["are", "are"],
             ["apples", "oranges"]];
    result = R.pmap(input, (a,b,c) => a + " " + b + " " + c);
    expected = ["apples are apples", "oranges are oranges"];
    expect(result).toStrictEqual(expected);
})


test("Testing reduce", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.reduce(input, (a,b) => a + b);
    expected = 15;
    expect(result).toStrictEqual(expected);
})

test("Testing reduce_right", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.reduce(input, (a,b) => a + b);
    expected = 15;
    expect(result).toStrictEqual(expected);
})

test("Testing filter", () => {
    let input, result, expected;
    let isOdd = x => x % 2 == 1;
    input = [1,2,3,4,5];
    result = R.filter(input, isOdd);
    expected = [1,3,5];
    expect(result).toStrictEqual(expected);
})

test("Testing compose", () => {
    let input, result, expected;
    let addOne = x => x + 1;
    let timesTwo = x => 2 * x;
    input = [1,2,3,4,5];
    result = input.map(R.compose(addOne, timesTwo));
    expected = [3,5,7,9,11];
    expect(result).toStrictEqual(expected);

    result = input.map(R.compose(timesTwo, addOne));
    expected = [4,6,8,10,12];
    expect(result).toStrictEqual(expected);
})
