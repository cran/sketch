const R = require("JEST_CONFIG_NAME_MAPPER/node-dist_gamma.js");

test("Testing dgamma functions", () => {
    let result, expected;
    result = R.dgamma(1, 3.5, 1)
    expected = 0.110695332645492;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.dgamma([2, 3], 10, [2, 2.3])
    expected = [0.0264623833821006, 0.226451235574008];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dgamma([1, 5], [1, 2.5], 3)
    expected = [0.149361205103592, 4.01055720214494e-05];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.dgamma([3, 4], [9, 3], [4.8, 0.5])
    expected = [0.122681792068589, 0.135335283236613];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing pgamma functions", () => {
    let result, expected;
    result = R.pgamma(1, 3.5, 1)
    expected = 0.0401596312698984;
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.pgamma([2, 3], 10, [2, 2.3])
    expected = [0.00813224279693386, 0.159510149239014];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pgamma([1, 5], [1, 2.5], 3)
    expected = [0.950212931632136, 0.999985251418962];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.pgamma([3, 4], [9, 3], [4.8, 0.5])
    expected = [0.949121189051532, 0.323323583816937];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));        
})

test("Testing qgamma functions", () => {
    let result, expected;
    result = R.qgamma(0.2, 3.5, 1)
    expected = 1.91116095388307;    
    expect(result).toBeCloseTo(expected, 8);
    
    result = R.qgamma([0.25, 0.65], 10, [2, 2.3])
    expected = [3.86294338476193, 4.74488726875021];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.qgamma([0.1, 0.2], [1, 2.5], 3)
    expected = [0.0351201718859421, 0.390422384306853];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    
    result = R.qgamma([0.1, 0.2], [9, 3], [4.8, 0.5])
    expected = [1.13176417880301, 3.07008840528929];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})

test("Testing rgamma functions", () => {
    let result, expected;
    result = [R.rgamma(1, 3.5, 1)];
    expected = [4.72316069223788];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rgamma(2, 10, [2, 2.3]);
    expected = [5.07213082563444, 3.34565887661914];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rgamma(2, [1, 2.5], 3);
    expected = [0.193242141188084, 0.241796780515037];
    expect(result.length).toStrictEqual(expected.length)
    
    result = R.rgamma(2, [9, 3], [4.8, 0.5]);
    expected = [1.19563973909124, 4.59311472303031];
    expect(result.length).toStrictEqual(expected.length)
})
