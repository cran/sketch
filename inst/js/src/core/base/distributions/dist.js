/*--------------------------------------------------------
Distribution functions constructor
---------------------------------------------------------*/
import {zipWith, curry, __ as _, reduce, head, tail} from "ramda";


/**
 * Return the name of the function arguments.
 * @param {function} func 
 */
function formalArgs(func) {
    let funStr = func.toString();
    let args = funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')'));
    return args.split(",").map(x => x.split("=")[0].trim());
}


/**
 * A "factory" for density functions
 * The function extends the function by the argument `log`.
 * @param {function} f A function that performs the density calculation.
 */
const ddist = function(f) {
    let nargs = formalArgs(f).length
    return function() {
        let args = [...arguments]
        ,   log = args[nargs] || false
        ,   dens = f(...args);
        return (log ? Math.log(dens) : dens);
    };
} 


/**
 * A "factory" for cumulative density functions (CDF)
 * The function extends the function by the arguments `lower_tail` and `log_p`.
 * @param {function} f A function that performs the CDF calculation.
 */
const pdist = function(f) {
    let nargs = formalArgs(f).length
    return function() {
        let args = [...arguments]
        ,   lower_tail = args[nargs] || true
        ,   log_p = args[nargs + 1] || false
        ,   prob = f(...args);
        if (!lower_tail) {
            prob = 1 - prob;
        }
        return log_p ? Math.log(prob) : prob;
    };
} 


/**
 * A "factory" for quantile functions (CDF)
 * The function extends the function by the arguments `lower_tail` and `log_p`.
 * The first argument of the function must be the probability at which the quantile is seeked.
 * @param {function} f A function that performs the quantile calculation.
 */
const qdist = function(f) {
    let nargs = formalArgs(f).length
    return function() {
        let args = [...arguments]
        ,   lower_tail = args[nargs] || true
        ,   log_p = args[nargs + 1] || false;
        // args[0] must be the probability.
        let p = args[0];
        if (log_p) {
            p = Math.exp(p)
        }
        if ((p < 0) || (p > 1)) {
            return undefined;
        }
        if (!lower_tail) {
            p = 1 - p;
        }
        args[0] = p;
        return f(...args);
    };
} 


// Extension is not needed for rdist


//====================================================================
// Broadcasting (handles different shape of data) for pdf, cdf and qf
const broadcast = function(f) {
    let argNames = formalArgs(f);
    let g = curry(f)
    function h(fs, maybe_b, id) {
        let b_is_Arr = Array.isArray(maybe_b)
        if (b_is_Arr && (fs.length != maybe_b.length)) {
            throw new Error(`Length of '${argNames[id + 1]}' do not match '${argNames[0]}'.`)
        }
        return b_is_Arr ? 
            zipWith((f,x) => f(x), fs, maybe_b) :
            fs.map(f => f(maybe_b));
    }
    return function() {
        let  args = [...arguments]
        , fstArgs = head(args)
        ,    init = Array.isArray(fstArgs) ? fstArgs : [fstArgs];   
        
        let result = reduce(h, init.map(x => g(x)), tail(args));
        return Array.isArray(fstArgs) ? result : result[0];
    }
}

export { ddist, pdist, qdist, broadcast, formalArgs }
