const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_binom.js");

test("Testing dbinom functions", () => {
    let result, expected;
    result = R.dbinom(1, 5, 0.2)
    expected = 0.4096;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dbinom([2, 3], 10, [0.2, 0.3])
    expected = [0.301989888, 0.266827932];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dbinom([1, 5], [10, 20], 0.3)
    expected = [0.121060821, 0.17886305056988];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dbinom([3, 4], [10, 15], [0.4, 0.8])
    expected = [0.214990848, 1.145044992e-05];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing pbinom functions", () => {
    let result, expected;
    result = R.pbinom(1, 5, 0.2)
    expected = 0.73728;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.pbinom([2, 3], 10, [0.2, 0.3])
    expected = [0.6777995264, 0.6496107184];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pbinom([1, 5], [10, 20], 0.3)
    expected = [0.1493083459, 0.416370829447481];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pbinom([3, 4], [10, 15], [0.4, 0.8])
    expected = [0.3822806016, 1.2461703168e-05];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing qbinom functions", () => {
    let result, expected;
    result = R.qbinom(1, 5, 0.2)
    expected = 5;
    expect(result).toStrictEqual(expected);
    
    result = R.qbinom([0.25, 0.65], 10, [0.2, 0.3])
    expected = [1, 4];
    expect(result).toStrictEqual(expected);
    
    result = R.qbinom([0.1, 0.2], [10, 20], 0.3)
    expected = [1, 4];
    expect(result).toStrictEqual(expected);
    
    result = R.qbinom([0.1, 0.2], [10, 15], [0.4, 0.8])
    expected = [2, 11];
    expect(result).toStrictEqual(expected);
})

test("Testing rbinom functions", () => {
    let result, expected;
    result = [R.rbinom(1, 5, 0.2)]
    expected = [2];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rbinom(2, 10, [0.2, 0.3])
    expected = [1, 4];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rbinom(2, [10, 20], 0.3)
    expected = [3, 10];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rbinom(2, [10, 15], [0.4, 0.8])
    expected = [2, 12];
    expect(result.length).toStrictEqual(expected.length)
      
})
