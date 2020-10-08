const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_exp.js");

test("Testing dexp functions", () => {
    let result, expected;
    result = R.dexp(1, 5)
    expected = 0.0336897349954273;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dexp([2, 3], 2.5)
    expected = [0.0168448674977137, 0.00138271092536958];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dexp([1, 5], [3, 5])
    expected = [0.149361205103592, 6.94397193248201e-11];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dexp([3, 4], [2, 5])
    expected = [0.00495750435333272, 1.03057681121928e-08];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));    
})

test("Testing pexp functions", () => {
    let result, expected;
    result = R.pexp(1, 5)
    expected = 0.993262053000915;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.pexp([2, 3], 2.5)
    expected = [0.993262053000915, 0.999446915629852];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pexp([1, 5], [3, 5])
    expected = [0.950212931632136, 0.999999999986112];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pexp([3, 4], [2, 5])
    expected = [0.997521247823334, 0.999999997938846];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8)); 
})

test("Testing qexp functions", () => {
    let result, expected;
    result = R.qexp(0.7, 5)
    expected = 0.240794560865187;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.qexp([0.25, 0.65], 2.5)
    expected = [0.115072828980712, 0.419928849799471];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8)); 
    
    result = R.qexp([0.1, 0.2], [3, 5])
    expected = [0.0351201718859421, 0.044628710262842];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8)); 
    
    result = R.qexp([0.1, 0.2], [2, 5])
    expected = [0.0526802578289132, 0.044628710262842];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8)); 
})

test("Testing rexp functions", () => {
    let result, expected;
    result = [R.rexp(1, 5)]
    expected = [0.0568455277942121];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rexp(2, 2.5)
    expected = [0.503656874952798, 0.167663883790374];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rexp(2, [3, 5])
    expected = [0.756367456151642, 0.333554573712831];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rexp(2, [2, 5])
    expected = [0.165622948365487, 0.109476848971099];
    expect(result.length).toStrictEqual(expected.length)    
})
