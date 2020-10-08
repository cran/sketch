const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_geom.js");

test("Testing dgeom functions", () => {
    let result, expected;
    result = R.dgeom(1, 0.5)
    expected = 0.25;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dgeom([2, 3], 0.25)
    expected = [0.140625, 0.10546875];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dgeom([1, 5], [0.3, 0.5])
    expected = [0.21, 0.015625];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dgeom([3, 4], [0.2, 0.5])
    expected = [0.1024, 0.03125];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));    
})

test("Testing pgeom functions", () => {
    let result, expected;
    result = R.pgeom(1, 0.5)
    expected = 0.75;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.pgeom([2, 3], 0.25)
    expected = [0.578125, 0.68359375];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pgeom([1, 5], [0.3, 0.5])
    expected = [0.51, 0.984375];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pgeom([3, 4], [0.2, 0.5])
    expected = [0.5904, 0.96875];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));    
})

test("Testing qgeom functions", () => {
    let result, expected;
    result = R.qgeom(0.7, 0.5)
    expected = 1;
    expect(result).toStrictEqual(expected);
    
    result = R.qgeom([0.25, 0.65], 0.25)
    expected = [0, 3];
    expect(result).toStrictEqual(expected);
    
    result = R.qgeom([0.7, 0.6], [0.5, 0.4])
    expected = [1, 1];
    expect(result).toStrictEqual(expected);
    
    result = R.qgeom([0.9, 0.6], [0.2, 0.3])
    expected = [10, 2];
    expect(result).toStrictEqual(expected);
})

test("Testing rgeom functions", () => {
    let result, expected;
    result = [R.rgeom(1, 0.5)]
    expected = [0];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rgeom(2, 0.25)
    expected = [4, 0];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rgeom(2, [0.5, 0.4])
    expected = [2, 2];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rgeom(2, [0.2, 0.3])
    expected = [0, 1];
    expect(result.length).toStrictEqual(expected.length)
})
