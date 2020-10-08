const R = require("JEST_CONFIG_NAME_MAPPER/node-utils.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing walk", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.walk(input, x => x+1);
    expected = [2,3,4,5,6];
    expect(result).toStrictEqual(expected);

    input = [1,2,[3,4],5];
    result = R.walk(input, x => x+1);
    expected = [2,3,[4,5],6];
    expect(result).toStrictEqual(expected);
})

test("Testing first", () => {
    let input, result, expected;
    input = null;
    result = R.first(input);
    expected = null;
    expect(result).toStrictEqual(expected);

    input = undefined;
    result = R.first(input);
    expected = undefined;
    expect(result).toStrictEqual(expected);
    
    input = 3;
    result = R.first(input);
    expected = 3;
    expect(result).toStrictEqual(expected);
    
    input = "hi";
    result = R.first(input);
    expected = "hi";
    expect(result).toStrictEqual(expected);
    
    input = true;
    result = R.first(input);
    expected = true;
    expect(result).toStrictEqual(expected);

    input = [1,2,3,4,5];
    result = R.first(input);
    expected = 1;
    expect(result).toStrictEqual(expected);

    input = {x:1, y:2};
    result = R.first(input);
    expected = 1;
    expect(result).toStrictEqual(expected);
})
