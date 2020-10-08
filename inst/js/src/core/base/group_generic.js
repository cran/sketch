/*---------------------------------------------------------- 
S3 & S4 generic functions
-----------------------------------------------------------*/
import { zipWith, mapAccum, all, any, identity, flatten } from "ramda";
import { 
    create, typedDependencies,

    unaryMinusDependencies, 
    unaryPlusDependencies,
    multiplyDependencies, 
    
    addDependencies, 
    subtractDependencies, 
    dotMultiplyDependencies, 
    dotPowDependencies,
    modDependencies,
    dotDivideDependencies,

    equalDependencies,
    equalTextDependencies,
    deepEqualDependencies,
    largerDependencies,
    smallerDependencies,
    unequalDependencies,
    smallerEqDependencies,
    largerEqDependencies,

    andDependencies, 
    orDependencies, 
    notDependencies, 
    xorDependencies, 

    piDependencies, 
    absDependencies,
    signDependencies,
    sqrtDependencies,
    floorDependencies,
    ceilDependencies,
    fixDependencies,
    roundDependencies,
    
    expDependencies,
    expm1Dependencies,
    logDependencies,
    log10Dependencies,
    log2Dependencies,
    log1pDependencies,
    
    cosDependencies,
    sinDependencies,
    tanDependencies,
    acosDependencies,
    asinDependencies,
    atanDependencies,
    atan2Dependencies,
    coshDependencies,
    sinhDependencies,
    tanhDependencies,
    acoshDependencies,
    asinhDependencies,
    atanhDependencies,
    
    gammaDependencies,
    
    maxDependencies,
    minDependencies,
    prodDependencies,
    sumDependencies,
    
    complexDependencies,
    reDependencies,
    imDependencies,
    argDependencies,
    conjDependencies
} from "mathjs";

const { 
    typed, unaryMinus, unaryPlus, 
    add, subtract, multiply, dotMultiply, dotPow, mod, dotDivide,
    equal, equalText, deepEqual, larger, smaller, unequal, smallerEq, largerEq,
    and, or, not, xor, 
    pi, abs, sign, sqrt, floor, ceil, fix, round, 
    exp, expm1, log, log10, log2, log1p, 
    cos, sin, tan, acos, asin, atan, atan2, 
    cosh, sinh, tanh, acosh, asinh, atanh, 
    gamma, 
    max, min, prod, sum, 
    complex, re, im, arg, conj
} = create(
    { 
        typedDependencies,
        unaryMinusDependencies, 
        unaryPlusDependencies,
        addDependencies, 
        subtractDependencies, 
        multiplyDependencies, 
        dotMultiplyDependencies, 
        dotPowDependencies,
        modDependencies,
        dotDivideDependencies,
    
        equalDependencies,
        equalTextDependencies,
        deepEqualDependencies,
        largerDependencies,
        smallerDependencies,
        unequalDependencies,
        smallerEqDependencies,
        largerEqDependencies,
    
        andDependencies, 
        orDependencies, 
        notDependencies, 
        xorDependencies, 
    
        piDependencies, 
        absDependencies,
        signDependencies,
        sqrtDependencies,
        floorDependencies,
        ceilDependencies,
        fixDependencies,
        roundDependencies,
        
        expDependencies,
        expm1Dependencies,
        logDependencies,
        log10Dependencies,
        log2Dependencies,
        log1pDependencies,
        
        cosDependencies,
        sinDependencies,
        tanDependencies,
        acosDependencies,
        asinDependencies,
        atanDependencies,
        atan2Dependencies,
        coshDependencies,
        sinhDependencies,
        tanhDependencies,
        acoshDependencies,
        asinhDependencies,
        atanhDependencies,
        
        gammaDependencies,
        
        maxDependencies,
        minDependencies,
        prodDependencies,
        sumDependencies,
        
        complexDependencies,
        reDependencies,
        imDependencies,
        argDependencies,
        conjDependencies
    },
    {matrix: 'Array'}
)



/*--------------------------------------------------------
Arithmetic functions
---------------------------------------------------------*/

function intDivide(x, y) {
    return floor(dotDivide(x, y));
}




/*--------------------------------------------------------
Math functions
---------------------------------------------------------*/
 
const cumf = f => (x,y) => [f(x,y), f(x,y)]

const cummax = typed('cummax', {
    'number': x => x,
    'Array': x => mapAccum(cumf(max), x[0], x)[1]
})

const cummin = typed('cummin', {
    'number': x => x,
    'Array': x => mapAccum(cumf(min), x[0], x)[1]
})

const cumprod = typed('cumprod', {
    'number': x => x,
    'Array': x => mapAccum(cumf(dotMultiply), 1, x)[1]
})

const cumsum = typed('cumsum', {
    'number': x => x,
    'Array': x => mapAccum(cumf(add), 0, x)[1]
})

const signif0 = (x, n) => parseFloat(x.toPrecision(n));

const signif = typed('signif', {
    'number, number': signif0,
    'number, Array': (x, ns) => ns.map(n => signif0(x, n)),
    'Array, number': (xs, n) => xs.map(x => signif0(x, n)),
    'Array, Array': function(xs, ns) {
        if (xs.length !== ns.length) {
            console.assert("The length of the inputs do not match.")
            return undefined
        }
        return zipWith(signif0, xs, ns)
    }
})




/*--------------------------------------------------------
Trigonometry functions
---------------------------------------------------------*/

function cospi(x) { 
    return cos(dotMultiply(x, pi)); 
}

function sinpi(x) { 
    return sin(dotMultiply(x, pi)); 
}

function tanpi(x) { 
    return tan(dotMultiply(x, pi)); 
}




/*--------------------------------------------------------
Special functions
---------------------------------------------------------*/

/**
 * The digamma function
 * @param {boolean | number | Array} x The input. Numbers should be non-negative. 
 * `true` / `false` are converted into `1` / `0` before proceeding.
 * @return A number or an Array of numbers.
 * @exports
 */
const digamma = typed('digamma', {
    'null | undefined | string | Object': function(x) { 
        throw new Error("non-numeric argument to mathematical function");
    },
    'boolean': x => x ? digamma0(1.0) : digamma0(0.0),
    'number': function (x) { return digamma0(x); }, 
    'Array' : function (x) { return x.map(digamma0); }
})
function digamma0(x) {
    // Reference: 
    // 1. Bernardo, J. M. (1976). Algorithm AS 103: Psi (digamma) function. Journal of the Royal Statistical Society. Series C (Applied Statistics), 25(3), 315-317.   
    // 2. https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant
    let S = 1e-5, C = 8.5, S3 = 8.333333333e-2, S4 = 8.333333333e-3, S5 = 3.968253968e-3, D1 = -0.5772156649;
    
    // Check argument is positive
    let DIGAMMA = 0.0, Y = x;
    if (Y <= 0.0) { 
        return undefined;
    }

    // Use approximation if argument <= S
    if (Y <= S) {
        return D1 - 1.0 / Y;
    }
    
    // 1. Reduce to Digamma(X+N), where (X+N) >= C
    while (Y < C) {
        DIGAMMA = DIGAMMA - 1.0 / Y;
        Y = Y + 1.0;
    }
    // 2. Use Stirling if argument >= C
    let R = 1.0 / Y
    DIGAMMA = DIGAMMA + Math.log(Y) - 0.5 * R;
    R = R * R;
    DIGAMMA = DIGAMMA - R * (S3 - R * (S4 - R * S5))
    return DIGAMMA;
}


/**
 * The trigamma function
 * @param {boolean | number | Array} x The input. Numbers should be non-negative. 
 * `true` / `false` are converted into `1` / `0` before proceeding.
 * @return A number or an Array of numbers.
 * @exports
 */
const trigamma = typed('trigamma', {
    'null | undefined | string | Object': function(x) { 
        throw new Error("non-numeric argument to mathematical function");
    },
    'boolean': x => x ? trigamma0(1.0) : trigamma0(0.0),
    'number': function (x) { return trigamma0(x); }, 
    'Array' : function (x) { return x.map(trigamma0); }
})
function trigamma0(x) {
    // Reference: 
    // Schneider, B. E. (1978). Algorithm AS 121: trigamma function. Journal of the Royal Statistical Society. Series C (Applied Statistics), 27(1), 97-99.
    // Francis, B. J. (1991). A remark on algorithm AS121: the trigamma function. Applied statistics, 40(3), 514-515.
    let A = 1e-4, B = 5.0, ONE = 1.0, HALF = 0.5;
    let B2 =  0.1666666667, B4 = -0.03333333333, B6 =  0.02380952381, B8 = -0.03333333333;
    
    // Check for positive value of x
    let TRIGAM = 0.0;
    if (x <= 0.0) {
        return undefined;
    }
    let Z = x;
    
    // Use small value approximation if x <= A
    if (Z <= A) {
        return 1.0 / (Z * Z);
    }

    // 10. Increase argument to (X + I) >= B
    while (Z < B) {
        TRIGAM = TRIGAM + 1.0 / (Z * Z);
        Z = Z + 1.0;
    }
    // 20. Apply asymptotic formula if argument >= B
    let Y = 1.0 / (Z * Z);
    TRIGAM = TRIGAM + HALF * Y + 
        (ONE + Y * (B2 + Y * (B4 + Y * (B6 + Y * B8)))) / Z;
    return TRIGAM;
}


function lgamma(x) { 
    return log(gamma(x)); 
}




/*--------------------------------------------------------
Summary functions
---------------------------------------------------------*/

/**
 * Return the range of an object.
 * @param {boolean | number | Array} x The input.
 * @return {Array} A 2-element Array containing the minimum and the maximum.
 * @example range( 1 )             # [1,1]
 * @example range([ 1,2,3 ])       # [1,3]
 * @example range([ 1,2,[3,4] ])   # [1,4]
 * @exports
 */
const range = function(x) { 
    return [min(x), max(x)]; 
}


/**
 * Check if all values are true.
 * @param {Array} xs The input.
 * @return {boolean} true or false; whether all vallues are true.
 * @example all([true, true, false])  # false
 * @exports
 */
const all2 = typed('all', {
    '...boolean': xs => all(identity)([...xs]),  // follow R convention, but not recommended
    'Array': xs => all(identity)(flatten(xs))
})


/**
 * Check if any value is true.
 * @param {Array} xs The input.
 * @return {boolean} true or false; whether there is a true value.
 * @example any([true, true, false])  # true
 * @exports
 */
const any2 = typed('any', {
    '...boolean': xs => any(identity)([...xs]),  // follow R convention, but not recommended
    'Array': xs => any(identity)(flatten(xs))
})



/*--------------------------------------------------------
Operators
---------------------------------------------------------*/

const EQ = typed('EQ', {
    'string, string': (x, y) => equalText(x, y),
    'any, any': (x, y) => equal(x, y)
})



/*--------------------------------------------------------
Export
---------------------------------------------------------*/

export {    
    unaryMinus, unaryPlus, 
    // Arith: "+", "-", "*", "^", "%%", "%/%", "/", ("%*%" extra)
    add, subtract,
    multiply as matMultiply,
    dotMultiply as multiply,
    dotPow as pow,
    mod,
    intDivide,
    dotDivide as divide,
    
    // Compare: "==", ">", "<", "!=", "<=", ">="
    deepEqual as identical,
    EQ as EQ,
    larger as GT,
    smaller as LT,
    unequal as NEQ,
    smallerEq as LEQ,
    largerEq as GEQ,

    // Logic: "&", "|", "!", extra
    and, or, not, xor,
    
    /*
    Math:   "abs", "sign", "sqrt", "ceiling", "floor", "trunc",
            "cummax", "cummin", "cumprod", "cumsum", 
            "exp", "expm1", "log", "log10", "log2", "log1p", 
            "cos", "cosh", "cospi", "sin", "sinh", "sinpi", "tan", "tanh", "tanpi", 
            "acos", "acosh", "asin", "asinh", "atan", "atanh", 
            "gamma", "lgamma", "digamma", "trigamma"
    Math2:  "round", "signif"
    */
    pi, abs, sign, sqrt, floor, ceil as ceiling, fix as trunc, round, signif,
    cummax, cummin, cumprod, cumsum,    
    exp, expm1, log, log10, log2, log1p,
    cos, sin, tan, cospi, sinpi, tanpi, acos, asin, atan, atan2, cosh, sinh, tanh, acosh, asinh, atanh,
    gamma, lgamma, digamma, trigamma,
    
    // Summary: "max", "min", "range", "prod", "sum", "any", "all"
    max, min, 
    range as range2,           // name clash with math.js
    prod, sum, 
    any2 as any, all2 as all,  // name clash with Ramda.js
    
    // Complex: "Arg", "Conj", "Im", "Mod", "Re"
    complex, 
    re as Re, 
    im as Im, 
    abs as Mod, 
    arg as Arg, 
    conj as Conj
};
