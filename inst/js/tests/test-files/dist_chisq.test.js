const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_chisq.js");

test("Testing dchisq functions", () => {
    let result, expected;
    result = R.dchisq(1, 5)
    expected = 0.0806569081730478;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dchisq([2, 3], 3)
    expected = [0.207553748710297, 0.154180329803769];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dchisq([1, 5], [3, 8])
    expected = [0.241970724519143, 0.106881508624868];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dchisq([3, 4], [2, 5])
    expected = [0.111565080074215, 0.143975910701835];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));    
})

test("Testing pchisq functions", () => {
    let result, expected;
    result = R.pchisq(1, 5)
    expected = 0.0374342267527036;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.pchisq([2, 3], 3)
    expected = [0.427593295529121, 0.608374823728911];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pchisq([1, 5], [3, 8])
    expected = [0.198748043098799, 0.242423866866934];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pchisq([3, 4], [2, 5])
    expected = [0.77686983985157, 0.45058404864722];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));    
})

test("Testing qchisq functions", () => {
    let result, expected;
    result = R.qchisq(0.7, 5)
    expected = 6.0644299841549; 
    let rel_err = (x, y) => (x - y) / Math.max(x, y);
    expect(rel_err(result, expected)).toBeCloseTo(0, 8);
    
    result = R.qchisq([0.25, 0.65], 3)
    expected = [1.21253290304567, 3.2831124635255];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));
    
    result = R.qchisq([0.1, 0.2], [3, 8])
    expected = [0.584374374155183, 4.59357361205617];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));
    
    result = R.qchisq([0.1, 0.2], [2, 5])
    expected = [0.210721031315653, 2.34253430584112];
    result.map((x,i) => expect(rel_err(result[i], expected[i])).toBeCloseTo(0, 8));
})

test("Testing rchisq functions", () => {
    let result, expected;
    result = [R.rchisq(1, 5)]
    expected = [2.62376837075471];
    expect(result.length).toStrictEqual(expected.length)

    result = R.rchisq(2, 3)
    expected = [1.81423161700299, 2.03523705372558];
    expect(result.length).toStrictEqual(expected.length)

    result = R.rchisq(2, [3, 8])
    expected = [3.78411357844824, 8.42152500814609];
    expect(result.length).toStrictEqual(expected.length)

    result = R.rchisq(2, [2, 5])
    expected = [0.343674132134099, 4.63473267297701];
    expect(result.length).toStrictEqual(expected.length)
})
