const R = require("JEST_CONFIG_NAME_MAPPER/node-group_generic.js");

/*===================================================== 
  Test functions for R-like functions
=====================================================*/
test("Testing Arithmetic operators", () => {
    let input_1, input_2, result, expected;
    // Array-array
    input_1 = [1,2,3,4,5];
    input_2 = [6,5,4,3,2];

    result = R.add(input_1, input_2);
    expected = [7,7,7,7,7];
    expect(result).toStrictEqual(expected);

    result = R.subtract(input_1, input_2);
    expected = [-5,-3,-1,1,3];
    expect(result).toStrictEqual(expected);

    result = R.multiply(input_1, input_2);
    expected = [6,10,12,12,10];
    expect(result).toStrictEqual(expected);

    result = R.pow(input_1, input_2);
    expected = [1,32,81,64,25];
    expect(result).toStrictEqual(expected);

    result = R.mod(input_1, input_2);
    expected = [1,2,3,1,1];
    expect(result).toStrictEqual(expected);

    result = R.intDivide(input_1, input_2);
    expected = [0,0,0,1,2];
    expect(result).toStrictEqual(expected);

    result = R.divide(input_1, input_2);
    expected = [1/6,2/5,3/4,4/3,5/2];
    expect(result).toStrictEqual(expected);

    // Array-number
    input_1 = [1,2,3,4,5];
    input_2 = 10;

    result = R.add(input_1, input_2);
    expected = [11,12,13,14,15];
    expect(result).toStrictEqual(expected);

    result = R.subtract(input_1, input_2);
    expected = [-9,-8,-7,-6,-5];
    expect(result).toStrictEqual(expected);

    result = R.multiply(input_1, input_2);
    expected = [10,20,30,40,50];
    expect(result).toStrictEqual(expected);

    result = R.pow(input_1, input_2);
    expected = [1,1024,59049,1048576,9765625];
    expect(result).toStrictEqual(expected);

    result = R.mod(input_1, 3);
    expected = [1,2,0,1,2];
    expect(result).toStrictEqual(expected);

    result = R.intDivide(input_1, 3);
    expected = [0,0,1,1,1];
    expect(result).toStrictEqual(expected);

    result = R.divide(input_1, input_2);
    expected = [0.1,0.2,0.3,0.4,0.5];
    expect(result).toStrictEqual(expected);

    // Number-array
    input_1 = 10;
    input_2 = [1,2,3,4,5];
    
    result = R.add(input_1, input_2);
    expected = [11,12,13,14,15];
    expect(result).toStrictEqual(expected);

    result = R.subtract(input_1, input_2);
    expected = [9,8,7,6,5];
    expect(result).toStrictEqual(expected);

    result = R.multiply(input_1, input_2);
    expected = [10,20,30,40,50];
    expect(result).toStrictEqual(expected);

    result = R.pow(input_1, input_2);
    expected = [10,100,1000,10000,100000];
    expect(result).toStrictEqual(expected);

    result = R.mod(input_1, input_2);
    expected = [0,0,1,2,0];
    expect(result).toStrictEqual(expected);

    result = R.intDivide(input_1, input_2);
    expected = [10,5,3,2,2];
    expect(result).toStrictEqual(expected);

    result = R.divide(input_1, input_2);
    expected = [10,5,10/3,2.5,2];
    expect(result).toStrictEqual(expected);

    // Number-number
    input_1 = 10;
    input_2 = 5;
    
    result = R.add(input_1, input_2);
    expected = 15;
    expect(result).toStrictEqual(expected);

    result = R.subtract(input_1, input_2);
    expected = 5;
    expect(result).toStrictEqual(expected);

    result = R.multiply(input_1, input_2);
    expected = 50;
    expect(result).toStrictEqual(expected);

    result = R.pow(input_1, input_2);
    expected = 100000;
    expect(result).toStrictEqual(expected);

    result = R.mod(input_1, input_2);
    expected = 0;
    expect(result).toStrictEqual(expected);

    result = R.intDivide(input_1, input_2);
    expected = 2;
    expect(result).toStrictEqual(expected);

    result = R.divide(input_1, input_2);
    expected = 2;
    expect(result).toStrictEqual(expected);
})


test("Testing Matrix Multiplicaton", () => {
    let input_1, input_2, result, expected;
    // Array-array
    input_1 = [[1,2],[3,4]];
    input_2 = [[1],[2]];

    result = R.matMultiply(input_1, input_2);
    expected = [[5],[11]];
    expect(result).toStrictEqual(expected);
})


test("Testing Comparison operators", () => {
    let input_1, input_2, result, expected;
    input_1 = [1,2,3,4,5];
    input_2 = [5,4,3,2,1];

    result = R.EQ(input_1, input_2);
    expected = [false,false,true,false,false];
    expect(result).toStrictEqual(expected);

    result = R.GT(input_1, input_2);
    expected = [false,false,false,true,true];
    expect(result).toStrictEqual(expected);

    result = R.LT(input_1, input_2);
    expected = [true,true,false,false,false];
    expect(result).toStrictEqual(expected);

    result = R.NEQ(input_1, input_2);
    expected = [true,true,false,true,true];
    expect(result).toStrictEqual(expected);

    result = R.LEQ(input_1, input_2);
    expected = [true,true,true,false,false];
    expect(result).toStrictEqual(expected);

    result = R.GEQ(input_1, input_2);
    expected = [false,false,true,true,true];
    expect(result).toStrictEqual(expected);

    // Array-number
    input_1 = [1,2,3,4,5];
    input_2 = 1;

    result = R.EQ(input_1, input_2);
    expected = [true, false, false, false, false];
    expect(result).toStrictEqual(expected);

    result = R.GT(input_1, input_2);
    expected = [false,true,true,true,true];
    expect(result).toStrictEqual(expected);

    result = R.LT(input_1, input_2);
    expected = [false,false,false,false,false];
    expect(result).toStrictEqual(expected);

    result = R.NEQ(input_1, input_2);
    expected = [false,true,true,true,true];
    expect(result).toStrictEqual(expected);

    result = R.LEQ(input_1, input_2);
    expected = [true,false,false,false,false];
    expect(result).toStrictEqual(expected);

    result = R.GEQ(input_1, input_2);
    expected = [true,true,true,true,true];
    expect(result).toStrictEqual(expected);
})



test("Testing Logical operators", () => {
    let input_1, input_2, result, expected;
    input_1 = true;
    input_2 = false;

    expect(R.and(input_1, input_2)).toStrictEqual(false);
    expect(R.or(input_1, input_2)).toStrictEqual(true);
    expect(R.xor(input_1, input_2)).toStrictEqual(true);
    expect(R.not(input_1)).toStrictEqual(false);
    expect(R.not(input_2)).toStrictEqual(true);

    input_1 = [false, false, true];
    input_2 = [false, true, true];
    expect(R.and(input_1, input_2)).toStrictEqual([false, false, true]);
    expect(R.or(input_1, input_2)).toStrictEqual([false, true, true]);
    expect(R.xor(input_1, input_2)).toStrictEqual([false, true, false]);
    expect(R.not(input_1)).toStrictEqual([true, true, false]);
    expect(R.not(input_2)).toStrictEqual([true, false, false]);
})



test("Testing mathematical functions - group 1", () => {
    // pi
    expect(R.pi).toBeCloseTo(3.14159265358979, 8)
    
    // abs, sign, sqrt, floor, ceiling, trunc, round, signif
    let input, result, expected;
    // abs
    input = [0.7076, -0.3637, 0.0597, -0.7046];
    result = R.abs(input)
    expected = [0.7076, 0.3637, 0.0597, 0.7046];
    expect(result).toStrictEqual(expected);
    // sign
    input = [-0.7172, 0.8847, -1.0156, 1.9553];
    result = R.sign(input)
    expected = [-1, 1, -1, 1];
    expect(result).toStrictEqual(expected);
    // sqrt
    input = [0.1277, 0.6782, 0.4289, 0.8344];
    result = R.sqrt(input)
    expected = [0.357351367704113, 0.823528991596531, 0.654904573201318, 0.913454979733539];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // floor
    input = [-0.0903, 0.2145, -0.7385, -0.5744];
    result = R.floor(input)
    expected = [-1, 0, -1, -1];
    expect(result).toStrictEqual(expected);
    // ceiling
    input = [-1.317, -0.1829, 0.419, 0.3243];
    result = R.ceiling(input)
    expected = [-1, -0, 1, 1];
    expect(result).toStrictEqual(expected);
    // trunc
    input = [-0.7815, -0.7886, -0.5022, 1.4961];
    result = R.trunc(input)
    expected = [-0, -0, -0, 1];
    expect(result).toStrictEqual(expected);
    // round
    input = [0.08694, 0.99294, 0.2531, 0.04954];
    result = R.round(input, 3)
    expected = [0.087, 0.993, 0.253, 0.05];
    expect(result).toStrictEqual(expected);
    // signif
    input = [0.68632, 0.78693, 0.35361, 0.36644];
    result = R.signif(input, 3)
    expected = [0.686, 0.787, 0.354, 0.366];
    expect(result).toStrictEqual(expected);
})



test("Testing mathematical functions - group 2", () => {
    // cummax, cummin, cumprod, cumsum
    let input, result, expected;
    input = [0.134, 0.221, 1.6408, -0.2191];
    result = R.cummax(input)
    expected = [0.134, 0.221, 1.6408, 1.6408];
    expect(result).toStrictEqual(expected);

    input = [0.1681, 1.1684, 1.0542, 1.1453];
    result = R.cummin(input)
    expected = [0.1681, 0.1681, 0.1681, 0.1681];
    expect(result).toStrictEqual(expected);

    input = [-0.5775, 2.0025, 0.0667, 1.8669];
    result = R.cumprod(input)
    expected = [-0.5775, -1.15644375, -0.077134798125, -0.144002954619563];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    input = [-1.3509, 0.021, 1.2499, -0.7152];
    result = R.cumsum(input)
    expected = [-1.3509, -1.3299, -0.08, -0.7952];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})



test("Testing mathematical functions - group 3", () => {
    // exp, expm1, log, log10, log2, log1p
    let input, result, expected;
    input = [0.7529, 0.9171, 0.4758, 0.5671];
    result = R.exp(input)
    expected = [2.12314822725742, 2.50202398917912, 1.60930112354556, 1.76314650536503];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    input = [0.7366, 0.8574, 0.9091, 0.0564];
    result = R.expm1(input)
    expected = [1.08882143453425, 1.35702445646732, 1.48208764895362, 0.0580208074292028];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    input = [0.5029, 0.3505, 0.8456, 0.8064];
    result = R.log(input)
    expected = [-0.687363935804218, -1.04839457250749, -0.167708844426109, -0.215175381665033];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    input = [0.1173, 0.7127, 0.2353, 0.075];
    result = R.log10(input)
    expected = [-0.930701987884471, -0.147093241203046, -0.628378072823979, -1.1249387366083];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    input = [0.9356, 0.1572, 0.6471, 0.1735];
    result = R.log2(input)
    expected = [-0.0960362331970218, -2.66932687729084, -0.627939417667839, -2.52699243208383];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    input = [0.0201, 0.5213, 0.0863, 0.283];
    result = R.log1p(input)
    expected = [0.0199006617063362, 0.419565232486946, 0.0827774264575682, 0.249201085633499];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})



test("Testing mathematical functions - group 4", () => {
    // cos, sin, tan, cospi, sinpi, tanpi, acos, asin, atan, atan2
    // cosh, sinh, tanh, acosh, asinh, atanh
    let input, result, expected;
    // cos
    input = [0.4868, 0.3845, 0.0068, 0.0037];
    result = R.cos(input)
    expected = [0.883834341341645, 0.926986096383933, 0.999976880089089, 0.999993155007809];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // sin
    input = [0.9949, 0.1079, 0.4187, 0.7179];
    result = R.sin(input)
    expected = [0.838704511686789, 0.107690752504572, 0.406573093213973, 0.657804427158022];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // tan
    input = [0.7425, 0.872, 0.6079, 0.7562];
    result = R.tan(input)
    expected = [0.917684362813202, 1.1901462866914, 0.695797614926616, 0.943244694389724];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // cospi
    input = [0.8472, 0.6128, 0.7932, 0.0229];
    result = R.cospi(input)
    expected = [-0.886978594882186, -0.34700112772745, -0.796276594267164, 0.997413256355035];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // sinpi
    input = [0.4169, 0.8749, 0.6473, 0.9245];
    result = R.sinpi(input)
    expected = [0.966115291023484, 0.382973658790859, 0.89482530819372, 0.234972470325421];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // tanpi
    input = [0.1722, 0.3158, 0.8043, 0.989];
    result = R.tanpi(input)
    expected = [0.600765604950987, 1.53072449473491, -0.706102217434322, -0.0345712822153897];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // acos
    input = [0.3224, 0.0012, 0.9922, 0.1484];
    result = R.acos(input)
    expected = [1.24253255014919, 1.5695963265069, 0.124981287753213, 1.42184616566556];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // asin
    input = [0.0494, 0.5974, 0.3213, 0.5279];
    result = R.asin(input)
    expected = [0.049420114394035, 0.640255054415161, 0.327101956915875, 0.556126054341421];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // atan
    input = [0.7954, 0.0689, 0.695, 0.9486];
    result = R.atan(input)
    expected = [0.671929763552827, 0.068791281907305, 0.607362371288824, 0.75902636636399];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // atan2
    input_1 = [0.1594, 0.0716, 0.5574];
    input_2 = [0.4898, 0.4943, 0.8884];
    result = R.atan2(input_1, input_2);
    expected = [0.31462886733372, 0.143850785447879, 0.560337705781784];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    // cosh
    input = [0.4885, 0.4778, 0.7488, 0.6676];
    result = R.cosh(input)
    expected = [1.12170780219424, 1.11633458018218, 1.29369743653377, 1.23124546402183];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // sinh
    input = [0.0494, 0.6951, 0.3633, 0.8841];
    result = R.sinh(input)
    expected = [0.0494200947490977, 0.752442455915911, 0.37134471291588, 1.00385945165658];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // tanh
    input = [0.7753, 0.1392, 0.295, 0.1261];
    result = R.tanh(input)
    expected = [0.650000747165647, 0.138307838106452, 0.286730291388804, 0.125435843178858];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // acosh
    input = [2.8047, 1.2141, 2.3582];
    result = R.acosh(input)
    expected = [1.69103091347117, 0.643223875709709, 1.5027153342543];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // asinh
    input = [0.5899, 0.5617, 0.6887, 0.3113];
    result = R.asinh(input)
    expected = [0.560144947600508, 0.535706796548374, 0.643384675590096, 0.306479495947321];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
    // atanh
    input = [0.6056, 0.991, 0.7432, 0.0759];
    result = R.atanh(input)
    expected = [0.701943587376824, 2.69958386336399, 0.957590105907302, 0.0760462543529344];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})



test("Testing mathematical functions - group 5", () => {
    // gamma, lgamma, digamma, trigamma
    let input, result, expected;
    // gamma
    input = [0.2628, 0.8984, 0.0092, 0.2362];
    result = R.gamma(input)
    expected = [3.43932893367865, 1.06992289581804, 108.127459772629, 3.84994165271246];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    // lgamma
    input = [0.13, 0.3262, 0.7264, 0.9917];
    result = R.lgamma(input)
    expected = [1.97827249633176, 1.00802273056497, 0.229627009250007, 0.00484778017180809];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    // digamma
    input = [0.7151, 0.5044, 0.436, 0.9488];
    result = R.digamma(input)
    expected = [-1.17794848958627, -1.94195842808459, -2.31867682061096, -0.664740178937587];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    // trigamma
    input = [0.1202, 0.0751, 0.889, 0.4245];
    result = R.trigamma(input)
    expected = [70.610137842603, 178.785739921654, 1.95835834535003, 6.55103949182969];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));
})


test("Testing mathematical functions - group 6", () => {
    // max, min, range, prod, sum, any, all
    let input, result, expected;
    // max
    input = [0.0424, 0.6474, 0.4686, 0.6179];
    result = R.max(input)
    expected = 0.6474;
    expect(result).toBeCloseTo(expected, 8);

    // min
    input = [0.2708, 0.1573, 0.1143, 0.5077];
    result = R.min(input)
    expected = 0.1143;
    expect(result).toBeCloseTo(expected, 8);

    // range
    input = [0.548, 0.1406, 0.1698, 0.762];
    result = R.range2(input)
    expected = [0.1406, 0.762];
    result.map((x,i) => expect(result[i]).toBeCloseTo(expected[i], 8));

    // prod
    input = [0.5274, 0.861, 0.6736, 0.013];
    result = R.prod(input)
    expected = 0.00397638757152;
    expect(result).toBeCloseTo(expected, 8);

    // sum
    input = [0.6932, 0.8917, 0.6319, 0.1073];
    result = R.sum(input)
    expected = 2.3241;
    expect(result).toBeCloseTo(expected, 8);

    // any
    input = [true, false, true, true];
    result = R.any(input)
    expected = true;
    expect(result).toStrictEqual(expected);

    // all
    input = [true, false, true, true];
    result = R.all(input)
    expected = false;
    expect(result).toStrictEqual(expected);
})


test("Testing mathematical functions - group 7", () => {
    // complex, Re, Im, Mod, Arg, Conj
    let input, result, expected;
    // complex
    result = R.complex(3, -4)
    expected = {re: 3, im: -4};
    expect(result).toStrictEqual(expected);
    // Re
    input = R.complex(3, -4);
    result = R.Re(input)
    expected = 3;
    expect(result).toStrictEqual(expected);
    // Im
    input = R.complex(3, -4);
    result = R.Im(input)
    expected = -4;
    expect(result).toStrictEqual(expected);
    // Mod
    input = R.complex(3, -4);
    result = R.Mod(input)
    expected = 5;
    expect(result).toStrictEqual(expected);
    // Arg
    input = R.complex(3, -4);
    result = R.Arg(input)
    expected = -0.927295218001612;
    expect(result).toBeCloseTo(expected, 8);
    // Conj
    input = R.complex(3, -4);
    result = R.Conj(input)
    expected = R.complex(3, 4);
    expect(result).toStrictEqual(expected);
})
