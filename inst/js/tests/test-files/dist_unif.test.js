const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_unif.js");

test("Testing dunif functions", () => {
    let result, expected;
    result = R.dunif(1, 0, 1)
    expected = 1;
    expect(result).toStrictEqual(expected);

    result = R.dunif([0.25, 0.65], -1, [2, 3])
    expected = [0.333333333333333, 0.25];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    result = R.dunif([2, 2.5], [1, 2], 3)
    expected = [0.5, 1];
    expect(result).toStrictEqual(expected);

    result = R.dunif([1.5, 2], [1, 1.5], [4, 8])
    expected = [0.333333333333333, 0.153846153846154];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing punif functions", () => {
    let result, expected;
    result = R.punif(1, 0, 1)
    expected = 1;
    expect(result).toStrictEqual(expected);

    result = R.punif([0.25, 0.65], -1, [2, 3])
    expected = [0.416666666666667, 0.4125];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    result = R.punif([2, 2.5], [1, 2], 3)
    expected = [0.5, 0.5];
    expect(result).toStrictEqual(expected);

    result = R.punif([1.5, 2], [1, 1.5], [4, 8])
    expected = [0.166666666666667, 0.0769230769230769];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing qunif functions", () => {
    let result, expected;
    result = R.qunif(1, 0, 1)
    expected = 1;
    expect(result).toStrictEqual(expected);
    
    result = R.qunif([0.25, 0.65], -1, [2, 3])
    expected = [-0.25, 1.6];
    expect(result).toStrictEqual(expected);
    
    result = R.qunif([0.1, 0.2], [1, 2], 3)
    expected = [1.2, 2.2];
    expect(result).toStrictEqual(expected);
    
    result = R.qunif([0.1, 0.2], [1, 1.5], [4, 8])
    expected = [1.3, 2.8];
    expect(result).toStrictEqual(expected);    
})

test("Testing runif functions", () => {
    let result, expected;
    result = [R.runif(1, 0, 1)];
    expected = [0.531409335788339];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.runif(2, -1, [2, 3])
    expected = [0.151810014620423, 0.278212917968631];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.runif(2, [1, 2], 3)
    expected = [2.61677251057699, 2.04191949847154];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.runif(2, [1, 1.5], [4, 8])
    expected = [2.09122808417305, 7.06788028532173];
    expect(result.length).toStrictEqual(expected.length)    
})
