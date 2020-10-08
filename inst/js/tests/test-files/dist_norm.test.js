const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_norm.js");

test("Testing dnorm functions", () => {
    let result, expected;
    result = R.dnorm(1, 3.5, 1)
    expected = 0.0175283004935685;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dnorm([2, 3], -3, [2, 2.3])
    expected = [0.00876415024678427, 0.00577339975903677];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dnorm([1, 5], [1, -2.5], 3)
    expected = [0.132980760133811, 0.00584276683118951];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dnorm([3, 4], [9, 3], [4.8, 0.5])
    expected = [0.0380518927893796, 0.107981933026376];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));         
})

test("Testing pnorm functions", () => {
    let result, expected;
    result = R.pnorm(1, 3.5, 1)
    expected = 0.00620966532577613;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.pnorm([2, 3], -3, [2, 2.3])
    expected = [0.993790334674224, 0.995455598106518];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pnorm([1, 5], [1, -2.5], 3)
    expected = [0.5, 0.993790334674224];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pnorm([3, 4], [9, 3], [4.8, 0.5])
    expected = [0.105649773666855, 0.977249868051821];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing qnorm functions", () => {
    let result, expected;
    let rel_err = (x, y) => (x - y) / Math.max(x, y);

    result = R.qnorm(0.2, 3.5, 1)
    expected = 2.65837876642709;
    expect(rel_err(result, expected)).toBeCloseTo(0, 8);

    result = R.qnorm([0.25, 0.65], -3, [2, 2.3])
    expected = [-4.34897950039216, -2.11376292726259];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));

    result = R.qnorm([0.3, 0.45], [1, -2.5], 3)
    expected = [-0.573201538124122, -2.87698404056522];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));

    result = R.qnorm([0.7, 0.9], [9, 3], [4.8, 0.5])
    expected = [11.5171224609986, 3.6407757827723];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));   
})

test("Testing rnorm functions", () => {
    let result, expected;
    result = [R.rnorm(1, 3.5, 1)];
    expected = [3.39171990876551];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rnorm(2, -3, [2, 2.3])
    expected = [-4.39684133518878, -3.63467388737874];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rnorm(2, [1, -2.5], 3)
    expected = [4.34394563608594, -0.849868116357592];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rnorm(2, [9, 3], [4.8, 0.5])
    expected = [14.9360438403917, 3.06954892858089];
    expect(result.length).toStrictEqual(expected.length)
})
