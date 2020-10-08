const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_pois.js");

test("Testing dpois functions", () => {
    let result, expected;
    result = R.dpois(1, 5)
    expected = 0.0336897349954273;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dpois([2, 3], 2.5)
    expected = [0.256515620699684, 0.213763017249736];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dpois([1, 5], [3, 5])
    expected = [0.149361205103592, 0.175467369767851];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dpois([3, 4], [2, 5])
    expected = [0.180447044315484, 0.175467369767851];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing ppois functions", () => {
    let result, expected;
    result = R.ppois(1, 5)
    expected = 0.0404276819945128;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.ppois([2, 3], 2.5)
    expected = [0.54381311588333, 0.757576133133066];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.ppois([1, 5], [3, 5])
    expected = [0.199148273471456, 0.615960654833063];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.ppois([3, 4], [2, 5])
    expected = [0.857123460498547, 0.440493285065212];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));    
})

test("Testing qpois functions", () => {
    let result, expected;
    result = R.qpois(0.7, 5)
    expected = 6;
    expect(result).toStrictEqual(expected);
    
    result = R.qpois([0.25, 0.65], 2.5)
    expected = [1, 3];
    expect(result).toStrictEqual(expected);
    
    result = R.qpois([0.1, 0.2], [3, 5])
    expected = [1, 3];
    expect(result).toStrictEqual(expected);
    
    result = R.qpois([0.1, 0.2], [2, 5])
    expected = [0, 3];
    expect(result).toStrictEqual(expected);  
})

test("Testing rpois functions", () => {
    let result, expected;
    result = [R.rpois(1, 5)]
    expected = [8];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rpois(2, 2.5)
    expected = [4, 0];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rpois(2, [3, 5])
    expected = [7, 5];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rpois(2, [2, 5])
    expected = [1, 4];
    expect(result.length).toStrictEqual(expected.length)  
})
