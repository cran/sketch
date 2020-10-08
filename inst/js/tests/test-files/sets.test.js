const R = require("JEST_CONFIG_NAME_MAPPER/node-sets.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing unique", () => {
    let input, result, expected;
    input = [1,1,2,3,3];
    result = R.unique(input);
    expected = [1,2,3];
    expect(result).toStrictEqual(expected);
})

test("Testing union", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,1,2,3,3];
    input_2 = [4,4,5]
    result = R.union(input_1, input_2);
    expected = [1,2,3,4,5];
    expect(result).toStrictEqual(expected);
})

test("Testing intersect", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,1,2,3,3];
    input_2 = [4,4,5]
    result = R.intersect(input_1, input_2);
    expected = [];
    expect(result).toStrictEqual(expected);

    input_1 = [1,1,2,3,3];
    input_2 = [3,3,4,4,5]
    result = R.intersect(input_1, input_2);
    expected = [3];
    expect(result).toStrictEqual(expected);
})

test("Testing setdiff", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,1,2,3,3];
    input_2 = [4,4,5]
    result = R.setdiff(input_1, input_2);
    expected = [1,2,3];
    expect(result).toStrictEqual(expected);

    input_1 = [1,1,2,3,3];
    input_2 = [3,3,4,4,5]
    result = R.setdiff(input_1, input_2);
    expected = [1,2];
    expect(result).toStrictEqual(expected);

    input_1 = [1,1,2,3,3];
    input_2 = [1,2,3,4,4,5]
    result = R.setdiff(input_1, input_2);
    expected = [];
    expect(result).toStrictEqual(expected);
})

test("Testing setequal", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,1,2,3,3];
    input_2 = [1,2,3]
    result = R.setequal(input_1, input_2);
    expected = true;
    expect(result).toStrictEqual(expected);

    input_1 = [1,1,2,3,3];
    input_2 = [3,3,4,4,5]
    result = R.setequal(input_1, input_2);
    expected = false;
    expect(result).toStrictEqual(expected);
})

test("Testing is_element", () => {
    let input_1, input_2, result, expected;
    input_1 = 1;
    input_2 = [1,2,3];
    result = R.is_element(input_1, input_2);
    expected = true;
    expect(result).toStrictEqual(expected);

    input_1 = 99;
    input_2 = [1,2,3];
    result = R.is_element(input_1, input_2);
    expected = false;
    expect(result).toStrictEqual(expected);
})

test("Testing is_subset", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,2];
    input_2 = [1,2,3];
    result = R.is_subset(input_1, input_2);
    expected = true;
    expect(result).toStrictEqual(expected);

    input_1 = [2,3,4];
    input_2 = [1,2,3];
    result = R.is_subset(input_1, input_2);
    expected = false;
    expect(result).toStrictEqual(expected);
})

test("Testing setsymdiff", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,2];
    input_2 = [1,2,3];
    result = R.setsymdiff(input_1, input_2);
    expected = [3];
    expect(result).toStrictEqual(expected);

    input_1 = [2,3,4];
    input_2 = [1,2,3];
    result = R.setsymdiff(input_1, input_2);
    expected = [4,1];
    expect(result).toStrictEqual(expected);
})

// test("Testing count", () => {
//     let input_1, input_2, result, expected;
//     input = [1,2,2,3,3,3];
//     result = R.count(1, input);
//     expected = 1;
//     expect(result).toStrictEqual(expected);

//     result = R.count(2, input);
//     expected = 2;
//     expect(result).toStrictEqual(expected);
    
//     result = R.count(3, input);
//     expected = 3;
//     expect(result).toStrictEqual(expected);

//     result = R.count(4, input);
//     expected = 0;
//     expect(result).toStrictEqual(expected);
// })
