const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_lnorm.js");

test("Testing dlnorm functions", () => {
    let result, expected;
    result = R.dlnorm(1, 3.5, 1)
    expected = 0.00087268269504576;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dlnorm([2, 3], -3, [2, 2.3])
    expected = [0.018130677127009, 0.0118168184976715];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dlnorm([1, 5], [1, -2.5], 3)
    expected = [0.125794409230998, 0.0104079841024977];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dlnorm([3, 4], [9, 3], [4.8, 0.5])
    expected = [0.00714725949406315, 0.00109152716810354];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing plnorm functions", () => {
    let result, expected;
    result = R.plnorm(1, 3.5, 1)
    expected = 0.000232629079035525;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.plnorm([2, 3], -3, [2, 2.3])
    expected = [0.967595517640307, 0.962625819774105];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.plnorm([1, 5], [1, -2.5], 3)
    expected = [0.369441340181764, 0.914627301939289];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.plnorm([3, 4], [9, 3], [4.8, 0.5])
    expected = [0.0498692766611773, 0.00062457886300401];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing qlnorm functions", () => {
    let result, expected;
    let rel_err = (x, y) => (x - y) / Math.max(x, y);

    result = R.qlnorm(0.2, 3.5, 1)
    expected = 14.2731302528445;
    expect(rel_err(result, expected)).toBeCloseTo(0, 8);
    
    result = R.qlnorm([0.25, 0.65], -3, [2, 2.3])
    expected = [0.0129199907006462, 0.120782614050477];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));
    
    result = R.qlnorm([0.3, 0.45], [1, -2.5], 3)
    expected = [0.563717782631305, 0.0563043185597942];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));
    
    result = R.qlnorm([0.7, 0.9], [9, 3], [4.8, 0.5])
    expected = [100420.581575066, 38.1213991816353];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));
})

test("Testing rlnorm functions", () => {
    let result, expected;
    result = [R.rlnorm(1, 3.5, 1)]
    expected = [49.9126808882732];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rlnorm(2, -3, [2, 2.3])
    expected = [0.0162947253011459, 0.20035841095765];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rlnorm(2, [1, -2.5], 3)
    expected = [0.59511499299759, 0.00115726419256129];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rlnorm(2, [9, 3], [4.8, 0.5])
    expected = [14978.4268562333, 53.1397698263979];
    expect(result.length).toStrictEqual(expected.length)
})
