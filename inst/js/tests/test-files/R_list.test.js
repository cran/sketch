const R = require("JEST_CONFIG_NAME_MAPPER/node-R_list.js");

/*===================================================== 
  Test functions for R list
=====================================================*/
test("Testing list: constructor", () => {
    let result = R.list({x1:1, y1:2, z1:3})
    let expected = {x1:1, y1:2, z1:3}
    expect(result).toStrictEqual(expected);
})

test("Testing list: extract", () => {
    let input, result, expected;
    input = {x1:1, y1:2, z1:3};
    result = R.extract(input, 0);
    expected = {x1:1};
    expect(result).toStrictEqual(expected);

    result = R.extract(input, [0,1]);
    expected = {x1:1, y1:2};
    expect(result).toStrictEqual(expected);

    result = R.extract(input, R.emptyIndex(input, 0));
    expected = {x1:1, y1:2, z1:3};
    expect(result).toStrictEqual(expected);

    result = R.extract(input, 'z1');
    expected = {z1:3};
    expect(result).toStrictEqual(expected);

    result = R.extract(input, ['x1','z1']);
    expected = {x1:1, z1:3};
    expect(result).toStrictEqual(expected);
})

test("Testing list: extract2", () => {
    let input, result, expected;
    input = {x1:1, y1:2, z1:3};
    result = R.extract2(input, 0);
    expected = 1;
    expect(result).toBe(expected);

    result = R.extract2(input, 'z1');
    expected = 3;
    expect(result).toBe(expected);

    input = {x1: {x2:4, x3:5}, y1:2, z1:3};
    result = R.extract2(input, [0,1]);
    expected = 5;
    expect(result).toStrictEqual(expected);    

    result = R.extract2(input, ['x1','x2']);
    expected = 4;
    expect(result).toStrictEqual(expected);
})

test("Testing list: extractAssign", () => {
    let input, result, expected;
    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, 99, 0);
    expected = {x1:99, y1:2, z1:3};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, 99, 'z1');
    expected = {x1:1, y1:2, z1:99};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, [99], 'z1');
    expected = {x1:1, y1:2, z1:99};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, {a:99}, 'z1');
    expected = {x1:1, y1:2, z1:99};
    expect(result).toStrictEqual(expected);

    // Array index
    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, [99, -99], [0,1]);
    expected = {x1:99, y1:-99, z1:3};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, {a:99, b:-99}, ['x1','z1']);
    expected = {x1:99, y1:2, z1:-99};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, 123, ['x1','z1']);
    expected = {x1:123, y1:2, z1:123};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, [123], ['x1','z1']);
    expected = {x1:123, y1:2, z1:123};
    expect(result).toStrictEqual(expected);

    input = {x1:1, y1:2, z1:3};
    result = R.extractAssign(input, {a:123}, ['x1','z1']);
    expected = {x1:123, y1:2, z1:123};
    expect(result).toStrictEqual(expected);

    // Expect errors
    expect(() => { R.extractAssign({x1:1, y1:2, z1:3}, [1,2], 0) }).toThrow();
    expect(() => { R.extractAssign({x1:1, y1:2, z1:3}, [1,2,3], [0,1]) }).toThrow();
    expect(() => { R.extractAssign({x1:1, y1:2, z1:3}, [1,2,3], [true,false]) }).toThrow();
})

test("Testing list: extract2Assign", () => {
    let input, result, expected;
    input = {x1:1, y1:2, z1:3};
    result = R.extract2Assign(input, 99, 0);
    expected = {x1:99, y1:2, z1:3};
    expect(result).toStrictEqual(expected);
    
    input = {x1:1, y1:2, z1:3};
    result = R.extract2Assign(input, 99, 'z1');
    expected = {x1:1, y1:2, z1:99};
    expect(result).toStrictEqual(expected);

    input = {x1: {x2:4, x3:5}, y1:2, z1:3};
    result = R.extract2Assign(input, 99, [0,1]);
    expected = {x1: {x2:4, x3:99}, y1:2, z1:3};
    expect(result).toStrictEqual(expected);

    input = {x1: {x2:4, x3:5}, y1:2, z1:3};
    result = R.extract2Assign(input, 99, ['x1','x2']);
    expected = {x1: {x2:99, x3:5}, y1:2, z1:3};
    expect(result).toStrictEqual(expected);
})

test("Testing list: names", () => {
    let result = R.names({x1:1, y1:2, z1:3});
    let expected = ['x1', 'y1', 'z1'];
    expect(result).toStrictEqual(expected);
})

test("Testing list: append", () => {
    let result = R.append(
        {x1:1, y1:2, z1:3},
        {x2:1, y2:2, z2:3}
    )
    let expected = {
        x1:1, y1:2, z1:3, 
        x2:1, y2:2, z2:3
    }
    expect(result).toStrictEqual(expected);
})

// test("Testing list: as_vector", () => {
//     let result, expected;
//     // Keep names by default
//     result = R.as_vector({x1:1, y1:2, z1:3});
//     expected = [1,2,3];
//     expect(result.map(x => x)).toStrictEqual(expected);
//     expect(result.names).toStrictEqual(['x1','y1','z1']);
//     expect(R.names(result)).toStrictEqual(['x1','y1','z1']);
    
//     // Drop names
//     result = R.as_vector({x1:1, y1:2, z1:3}, drop = true);
//     expected = [1,2,3];
//     expect(result).toStrictEqual(expected);
//     expect(result.names).toBe(undefined);
// })
