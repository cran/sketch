const R = require("JEST_CONFIG_NAME_MAPPER/node-R_array.js");

/*===================================================== 
  Test functions for R vector and R matrix
=====================================================*/
test("Testing vector: constructor", () => {
    let result = R.c(1,2,3);
    let expected = [1,2,3];
    expect(result).toStrictEqual(expected);

    result = R.c(1,2, R.c(3,4), R.c(5,6, R.c(7,8)));
    expected = [1,2,3,4,5,6,7,8];
    expect(result).toStrictEqual(expected);

    result = R.c();
    expected = [];
    expect(result).toStrictEqual(expected);
})

test("Testing vector: extract", () => {
    let input, result, expected;
    input = [1,2,3];
    result = R.extract(input, 0);
    expected = 1;
    expect(result).toBe(expected);

    input = [1,2,3];
    result = R.extract(input, [0]);
    expected = 1;
    expect(result).toBe(expected);

    result = R.extract(input, [0,1]);
    expected = [1,2];
    expect(result).toStrictEqual(expected);

    result = R.extract(input, R.emptyIndex(input, 0));
    expected = [1,2,3];
    expect(result).toStrictEqual(expected);
})

test("Testing vector: extractAssign", () => {
    let input, result, expected;
    input = [1,2,3];
    result = R.extractAssign(input, 99, 0);
    expected = [99,2,3];
    expect(result).toStrictEqual(expected);

    input = [1,2,3];
    result = R.extractAssign(input, 99, [0]);
    expected = [99,2,3];
    expect(result).toStrictEqual(expected);

    input = [1,2,3];
    result = R.extractAssign(input, [99,-99], [0,1]);
    expected = [99,-99,3];
    expect(result).toStrictEqual(expected);

    input = [1,2,3];
    result = R.extractAssign(input, 99, [0,1]);
    expected = [99,99,3];
    expect(result).toStrictEqual(expected);

    input = [1,2,3];
    result = R.extractAssign(input, 99, R.emptyIndex(input, 0));
    expected = [99,99,99];
    expect(result).toStrictEqual(expected);
})


test("Testing matrix: constructor", () => {
    let result, expected;
    result = R.matrix2(99, 2, 2);
    expected = [[99,99], [99,99]];
    expect(result).toStrictEqual(expected);

    result = R.matrix2(R.c(1,2,3,4), 2, 2);
    expected = [[1,3], [2,4]];
    expect(result).toStrictEqual(expected);
    
    result = R.matrix2(R.c('a','b','c','d'), 2, 2);
    expected = [['a','c'], ['b','d']];
    expect(result).toStrictEqual(expected);

    result = R.matrix2(R.c(1,2,3,4), 2, 2, false);
    expected = [[1,3], [2,4]];
    expect(result).toStrictEqual(expected);

    result = R.matrix2(R.c(1,2,3,4), 2, 2, true);
    expected = [[1,2], [3,4]];
    expect(result).toStrictEqual(expected);
})

test("Testing matrix: extract", () => {
    let input, result, expected;
    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extract(input, 0, 0);
    expected = 1;
    expect(result).toBe(expected);

    result = R.extract(input, 0, [0,1]);
    expected = [[1,3]];
    expect(result).toStrictEqual(expected);

    result = R.extract(input, [0], [0,1]);
    expected = [[1,3]];
    expect(result).toStrictEqual(expected);

    result = R.extract(input, 0, R.emptyIndex(input, 1));
    expected = [[1,3]];
    expect(result).toStrictEqual(expected);

    result = R.extract(input, R.emptyIndex(input, 0), 0);
    expected = [[1],[2]];
    expect(result).toStrictEqual(expected);
})

test("Testing matrix: extractAssign", () => {
    let input, result, expected;
    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, 99, 0, 0);
    expected = [[99,3],[2,4]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, [[99,-99]], 0, [0,1]);
    expected = [[99,-99],[2,4]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, 99, 0, [0,1]);
    expected = [[99,99],[2,4]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, [[4,3],[2,1]], [0,1], [0,1]);
    expected = [[4,3],[2,1]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, [4,3,2,1], [0,1], [0,1]);
    expected = [[4,3],[2,1]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, [4,3,2,1], [0,1,2,3]);
    expected = [[4,3],[2,1]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, [[4,3]], 0, R.emptyIndex(input, 1));
    expected = [[4,3],[2,4]];
    expect(result).toStrictEqual(expected);

    input = R.matrix2(R.c(1,2,3,4), 2, 2);
    result = R.extractAssign(input, [[4],[2]], R.emptyIndex(input, 0), 0);
    expected = [[4,3],[2,4]];
    expect(result).toStrictEqual(expected);
})


test("Testing array: constructor", () => {
    let result, expected;
    result = R.array(99, [2, 3, 4]);
    expected = [ [ [ 99, 99, 99, 99 ], [ 99, 99, 99, 99 ], [ 99, 99, 99, 99 ] ],
                 [ [ 99, 99, 99, 99 ], [ 99, 99, 99, 99 ], [ 99, 99, 99, 99 ] ] ];
    expect(result).toStrictEqual(expected);

    result = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    expected = [[[1,2], [3,4]], [[5,6], [7, 8]]];
    expect(result).toStrictEqual(expected);
    
    result = R.array(R.c('a','b','c','d'), [2,2]);
    expected = [['a','b'], ['c','d']];
    expect(result).toStrictEqual(expected);

    result = R.array(R.c('a','b','c','d'), [2,2,1]);
    expected = [[['a'],['b']], [['c'],['d']]];
    expect(result).toStrictEqual(expected);
    
    result = R.array(R.c('a','b','c','d'), [1,2,2]);
    expected = [[['a','b'], ['c','d']]];
    expect(result).toStrictEqual(expected);
})

test("Testing array: extract", () => {
    let input, result, expected;
    input = R.array(R.c(1,2,3,4), [2,2]);
    result = R.extract(input, 0, 0);
    expected = 1;
    expect(result).toBe(expected);

    result = R.extract(input, 0, [0,1]);
    expected = [[1,2]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extract(input, 0, 0, 0);
    expected = 1;
    expect(result).toBe(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extract(input, 0, 0, [0,1]);
    expected = [[[1, 2]]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extract(input, [0,1], 0, 0);
    expected = [[[1]], [[5]]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extract(input, R.emptyIndex(input, 0), 0, 0);
    expected = [[[1]], [[5]]];
    expect(result).toStrictEqual(expected);
})

test("Testing array: extractAssign", () => {
    let input, result, expected;
    // the 2-dimensional case should align with `matrix2`
    input = R.array(R.c(1,2,3,4), [2,2]);
    result = R.extractAssign(input, 99, 0, 0);
    expected = [[99,2],[3,4]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4), [2,2]);
    result = R.extractAssign(input, [[99,-99]], 0, [0,1]);
    expected = [[99,-99],[3,4]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4), [2,2]);
    result = R.extractAssign(input, 99, 0, [0,1]);
    expected = [[99,99],[3,4]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4), [2,2]);
    result = R.extractAssign(input, [[4,3],[2,1]], [0,1], [0,1]);
    expected = [[4,3],[2,1]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4), [2,2]);
    result = R.extractAssign(input, [[4,3],[2,1]], R.emptyIndex(input, 0), R.emptyIndex(input, 1));
    expected = [[4,3],[2,1]];
    expect(result).toStrictEqual(expected);

    // 3 dimensions
    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extractAssign(input, 99, 0, 0, 0);
    expected = [[[99,2],[3,4]], [[5,6],[7,8]]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extractAssign(input, [[99,-99]], 0, 0, [0,1]);
    expected = [[[99,-99],[3,4]], [[5,6],[7,8]]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extractAssign(input, 99, 0, [0,1], 0);
    expected = [[[99,2], [99,4]], [[5,6], [7,8]]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extractAssign(input, [[4,3],[2,1]], 0, [0,1], [0,1]);
    expected = [[[4,3], [2,1]], [[5,6], [7,8]]];
    expect(result).toStrictEqual(expected);

    input = R.array(R.c(1,2,3,4,5,6,7,8), [2,2,2]);
    result = R.extractAssign(input, [[4,3],[2,1]], 0, R.emptyIndex(input, 0), R.emptyIndex(input, 1));
    expected = [[[4,3], [2,1]], [[5,6], [7,8]]];
    expect(result).toStrictEqual(expected);
})


test("Testing matrix: dim", () => {
    let input, result, expected;
    input = R.matrix2([1,2,3,4,5,6], 2, 3);
    result = R.dim(input);
    expected = [2, 3];
    expect(result).toStrictEqual(expected);

    input = R.matrix2([1,2,3,4,5,6], 3, 2);
    result = R.dim(input);
    expected = [3, 2];
    expect(result).toStrictEqual(expected);
})
