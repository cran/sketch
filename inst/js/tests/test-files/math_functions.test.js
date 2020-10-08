const R = require("JEST_CONFIG_NAME_MAPPER/node-math_functions.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing trigonometric functions", () => {
    let input, result, expected;
    let pi = Math.PI;
    input = [pi/6.0, pi/4.0, pi/3.0];
    result = R.cot(input)
    expected = [Math.sqrt(3), 1, Math.sqrt(3)/ 3];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
    
    result = R.csc(input)
    expected = [2, Math.sqrt(2), 2 / Math.sqrt(3)];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    result = R.sec(input)
    expected = [2 / Math.sqrt(3), Math.sqrt(2), 2];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    input = [Math.sqrt(3), 1, Math.sqrt(3)/ 3];
    result = R.acot(input)
    expected = [pi/6.0, pi/4.0, pi/3.0];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    input = [2, Math.sqrt(2), 2 / Math.sqrt(3)];
    result = R.acsc(input)
    expected = [pi/6.0, pi/4.0, pi/3.0];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    input = [2 / Math.sqrt(3), Math.sqrt(2), 2];
    result = R.asec(input)
    expected = [pi/6.0, pi/4.0, pi/3.0];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})


test("Testing hyperbolic functions", () => {
    let input, result, out_1, out_2, out_3;
    let pi = Math.PI;
    input = [-2*pi, -pi, pi, 2*pi];
    result = R.coth(input);
    out_1 = [-1.00000697470904, -1.00374187319732, 1.00374187319732, 1.00000697470904];
    result.map((x,i) => expect(result[i]).toBeCloseTo(out_1[i], 8))
    
    result = R.csch(input);
    out_2 = [-0.00373489848828567, -0.086589537530047, 0.086589537530047, 0.00373489848828567];
    result.map((x,i) => expect(result[i]).toBeCloseTo(out_2[i], 8))

    result = R.sech(input);
    out_3 = [0.00373487243863713, 0.0862667383340544, 0.0862667383340544, 0.00373487243863713];
    result.map((x,i) => expect(result[i]).toBeCloseTo(out_3[i], 8))

    result = R.acoth(out_1);
    expected = input;
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    result = R.acsch(out_2);
    expected = input;
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    result = R.asech(out_3);
    expected = input.map(Math.abs);
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})


test("Testing erf", () => {
    let input, result, expected;
    input = [0, 0.5, 1];
    result = R.erf(input);
    expected = [0, 0.520499877813047, 0.842700792949715];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})

test("Testing factorial", () => {
    let input, result, expected;
    input = [0, 1, 1.5, 2.5, 3];
    result = R.factorial(input);
    expected = [1, 1, 1.32934038817914, 3.32335097044784, 6];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})

test("Testing choose", () => {
    let input, result, expected;
    input = [11,12,13,14,15];
    result = R.choose(input, 2);
    expected = [55, 66, 78, 91, 105];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    result = R.choose(input, 3);
    expected = [165, 220, 286, 364, 455];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})

test("Testing lchoose", () => {
    let input, result, expected;
    input = [11,12,13,14,15];
    result = R.lchoose(input, 2);
    expected = [4.00733318523247, 4.18965474202643, 4.35670882668959, 4.51085950651685, 4.65396035015752];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    result = R.lchoose(input, 3);
    expected = [5.10594547390058, 5.39362754635236, 5.65599181081985, 5.89715386763674, 6.12029741895095];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})

test("Testing ingamma", () => {
    let input, result, expected;
    input = [1, 2, 3.5, 4.5];
    result = R.ingamma(input, 2);
    expected = [0.864664716763387, 0.593994150290162, 0.731876963256768, 1.03042542723211];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))

    result = R.ingamma(input, 2.5);
    expected = [0.917915001376101, 0.712702504816354, 1.13006153058346, 1.92728131498501];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8))
})
