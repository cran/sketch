const R = require("JEST_CONFIG_NAME_MAPPER/node-stats.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing mean", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.mean(input);
    expected = 3;
    expect(result).toStrictEqual(expected);
})

test("Testing median", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.median(input);
    expected = 3;
    expect(result).toStrictEqual(expected);

    input = [1,2,3,4,5,6];
    result = R.median(input);
    expected = 3.5;
    expect(result).toStrictEqual(expected);
})

test("Testing sd", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.sd(input);
    expected = 1.581139;
    expect(result).toBeCloseTo(expected, 6);
})

test("Testing var", () => {
    let input, result, expected;
    input = [1,2,3,4,5];
    result = R.var(input);
    expected = 2.5;
    expect(result).toStrictEqual(expected);
})

test("Testing quantile", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,2,3,4,5];
    input_2 = 0.6;
    result = R.quantile(input_1, input_2);
    expected = 3.4;
    expect(result).toStrictEqual(expected);

    input_1 = [1,2,3,4,5];
    input_2 = [0.2, 0.6];
    result = R.quantile(input_1, input_2);
    expected = [1.8, 3.4];
    expect(result).toStrictEqual(expected);
})

test("Testing uniroot", () => {
    let input, result, expected;
    input = f = x => x**2 - 4;
    result = R.uniroot(f, [0,10]);
    // expected = { 
    //     root: 2.000000001862645,
    //     f_root: 7.450580596923828e-9,
    //     status: 'success',
    //     iter: 30,
    //     prec: 9.313225746154785e-9
    // };
    expect(result.root).toBeCloseTo(2, 8);
    expect(result.f_root).toBeCloseTo(0, 7);
    expect(result.status).toBe("success");
    expect(result.prec).toBeLessThan(1e-8);

    result = R.uniroot(f, [2,10]);
    expected = { root: 2, f_root: 0, status: 'success', iter: 0, prec: undefined };
    expect(result).toStrictEqual(expected);

    result = R.uniroot(f, [0,2]);
    expected = { root: 2, f_root: 0, status: 'success', iter: 0, prec: undefined };
    expect(result).toStrictEqual(expected);
})

test("Testing discrete_inverse", () => {
    let input, result, expected;
    input = x => [0.25, 0.5, 0.25][x];
    result = R.discrete_inverse(0.1, input, 0);
    expected = 0;
    expect(result).toStrictEqual(expected);

    result = R.discrete_inverse(0.35, input, 0);
    expected = 1;
    expect(result).toStrictEqual(expected);

    result = R.discrete_inverse(0.85, input, 0);
    expected = 2;
    expect(result).toStrictEqual(expected);
})
