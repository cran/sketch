const R = require("JEST_CONFIG_NAME_MAPPER/node-base.js");

test("Testing base::length", () => {
    let input, result, expected;
    input = null;
    result = R.length(input);
    expected = 0;
    expect(result).toBe(expected);
    
    input = undefined;
    result = R.length(input);
    expected = 0;
    expect(result).toBe(expected);
    
    input = 9999;
    result = R.length(input);
    expected = 1;
    expect(result).toBe(expected);
 
    input = "abcde";
    result = R.length(input);
    expected = 1;
    expect(result).toBe(expected);
 
    input = true;
    result = R.length(input);
    expected = 1;
    expect(result).toBe(expected);

    input = [1,2,[3,4],[5,[6,7],8]];
    result = R.length(input);
    expected = 4;
    expect(result).toBe(expected);

    input = {x:1, y:2, z:3}
    result = R.length(input);
    expected = 3;
    expect(result).toBe(expected);    
})


test("Testing base::which", () => {
    let input, result, expected;
    input = [true, false, true];
    result = R.which(input);
    expected = [0, 2];
    expect(result).toStrictEqual(expected);
})


test("Testing base::seq_by", () => {
    let input, result, expected;
    result = R.seq(1, 10, 2); 
    expected = [1,3,5,7,9];
    expect(result).toStrictEqual(expected);

    result = R.seq(10, 1, 2); 
    expected = [];
    expect(result).toStrictEqual(expected);

    result = R.seq(5, 1); 
    expected = [5, 4, 3, 2, 1];
    expect(result).toStrictEqual(expected);
})


test("Testing base::rep", () => {
    let input, result, expected;
    result = R.rep(1, 3); 
    expected = [1, 1, 1];
    expect(result).toStrictEqual(expected);

    result = R.rep([1,2], 2); 
    expected = [1, 2, 1, 2];
    expect(result).toStrictEqual(expected);

    result = R.rep([1, 2], [3, 4]); 
    expected = [1, 1, 1, 2, 2, 2, 2];
    expect(result).toStrictEqual(expected);
})

// test("Testing base::digamma", () => {
//     let input, result, expected;
//     input = 123;
//     result = R.digamma(input);
//     expected = 4.808113806573255;
//     expect(result).toBe(expected);

//     input = 1e-7;
//     result = R.digamma(input);
//     expected = -10000000.577215664;
//     expect(result).toBe(expected);

//     input = 0.0;
//     result = R.digamma(input);
//     expected = undefined;
//     expect(result).toBe(expected);

//     input = true;
//     result = R.digamma(input);
//     expected = R.digamma(1.0);
//     expect(result).toBe(expected);

//     input = false;
//     result = R.digamma(input);
//     expected = R.digamma(0.0);
//     expect(result).toBe(expected);

//     input = [12, 123];
//     result = R.digamma(input);
//     expected = [2.4426616799662653, 4.808113806573255];   // cross-checked with R
//     expect(result).toStrictEqual(expected);

//     expect(() => { R.digamma(null) }).toThrow();
//     expect(() => { R.digamma(undefined) }).toThrow();
//     expect(() => { R.digamma("a") }).toThrow();
//     expect(() => { R.digamma({x:1}) }).toThrow();
// })

// test("Testing base::trigamma", () => {
//     let input, result, expected;
//     input = 123;
//     result = R.trigamma(input);
//     expected = 0.008163219974594384;
//     expect(result).toBe(expected);

//     input = 1e-7;
//     result = R.trigamma(input);
//     expected = 100000000000000.02;
//     expect(result).toBe(expected);

//     input = 0.0;
//     result = R.trigamma(input);
//     expected = undefined;
//     expect(result).toBe(expected);

//     input = [12, 123];
//     result = R.trigamma(input);
//     expected = [0.08690187287168802, 0.008163219974594384]; // cross-checked with R
//     expect(result).toStrictEqual(expected);

//     input = true;
//     result = R.trigamma(input);
//     expected = R.trigamma(1.0);
//     expect(result).toBe(expected);

//     input = false;
//     result = R.trigamma(input);
//     expected = R.trigamma(0.0);
//     expect(result).toBe(expected);

//     expect(() => { R.trigamma(null) }).toThrow();
//     expect(() => { R.trigamma(undefined) }).toThrow();
//     expect(() => { R.trigamma("a") }).toThrow();
//     expect(() => { R.trigamma({x:1}) }).toThrow();
// })

// test("Testing base::range2", () => {
//     let input, result, expected;
//     input = 1;
//     result = R.range2(input);
//     expected = [1,1];
//     expect(result).toStrictEqual(expected);

//     input = [1,2,3,4,5];
//     result = R.range2(input);
//     expected = [1,5];
//     expect(result).toStrictEqual(expected);

//     input = [1,2,[3,8],5];
//     result = R.range2(input);
//     expected = [1,8];
//     expect(result).toStrictEqual(expected);
// })


// // Continue from here
// test("Testing base::all", () => {
//     let input, result, expected;
//     input = [true, true];
//     result = R.all(input);
//     expected = true;
//     expect(result).toStrictEqual(expected);

//     input = [true, [false, true]];
//     result = R.all(input);
//     expected = false;
//     expect(result).toStrictEqual(expected);

//     result = R.all(true, false);
//     expected = false;
//     expect(result).toStrictEqual(expected);

//     result = R.all(false, false);
//     expected = false;
//     expect(result).toStrictEqual(expected);
// })


// test("Testing base::any", () => {
//     let input, result, expected;
//     input = [true, true];
//     result = R.any(input);
//     expected = true;
//     expect(result).toStrictEqual(expected);

//     input = [true, [false, true]];
//     result = R.any(input);
//     expected = true;
//     expect(result).toStrictEqual(expected);

//     result = R.any(true, false);
//     expected = true;
//     expect(result).toStrictEqual(expected);

//     result = R.any(false, false);
//     expected = false;
//     expect(result).toStrictEqual(expected);
// })
