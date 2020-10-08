/*--------------------------------------------------------
Statistics functions
---------------------------------------------------------*/
import {
    create, 
    typedDependencies,
    minDependencies, maxDependencies,
    meanDependencies, medianDependencies, stdDependencies, 
    varianceDependencies, quantileSeqDependencies
} from "mathjs";

const {min, max, mean, median, std, variance, quantileSeq} = create({
    typedDependencies, 
    minDependencies, maxDependencies,
    meanDependencies, medianDependencies, stdDependencies, 
    varianceDependencies, quantileSeqDependencies
}, {matrix: 'Array'})


const uniroot = function(f, interval, tol = 1e-8, maxiter = 1e3, extendInt = "no", trace = false) {
    let lower = min(interval) 
    ,   upper = max(interval)
    ,   f_lower = f(lower)
    ,   f_upper = f(upper)
    
    let goodEnough = x => Math.abs(x) < tol
    if (goodEnough(f_lower)) return {
        root: lower, f_root: f_lower, status: "success", iter: 0, prec: undefined
    };
    if (goodEnough(f_upper)) return {
        root: upper, f_root: f_upper, status: "success", iter: 0, prec: undefined
    };
    
    let retry = 0;
    while (Math.sign(f_lower) * Math.sign(f_upper) > 0) {
        if (retry > maxiter) {
            throw new Error(`No sign change found in ${maxiter} iterations.`)
        }
        let step = (upper - lower) / 2.0;
        switch(extendInt) {
            case "yes": 
                lower = lower - step
                upper = upper + step
                f_lower = f(lower)
                f_upper = f(upper)
                break
            case "downX":
                lower = lower - step
                f_lower = f(lower)
                break
            case "upX":
                upper = upper + step
                f_upper = f(upper)
                break
            default:
                throw new Error("Values at end points not of opposite sign.")
        }
        if (trace) {
            console.log(`New interval: [${lower}, ${upper}]`)
        }
        retry++;
    }
    // Begin search
    let    iter = 1
    ,     midpt = (lower + upper) / 2.0
    ,   f_midpt = f(midpt);
    while (!goodEnough(f_midpt)) {
        if (iter > maxiter) {
            console.log("Maximum iteration is reached.")
            return {
                root: midpt, f_root: f_midpt, status: "failed", iter: maxiter, 
                prec: (upper - lower) / 2.0
            }
        }

        if (Math.sign(f_midpt) * Math.sign(f_upper) > 0) {
            upper = midpt
            f_upper = f_midpt
        } else {
            lower = midpt
            f_lower = f_midpt
        }
        midpt = (lower + upper) / 2.0
        f_midpt = f(midpt);
        iter++;
    }
    return {
        root: midpt, f_root: f_midpt, status: "success", iter: iter,
        prec: (upper - lower) / 2.0
    }
}

const discrete_inverse = function(p, pmf, init) {
    let ind = init, sum = pmf(init);
    while (sum < p) {
        ind += 1;
        sum += pmf(ind)
    }
    return ind;
} 


export {
    mean, median, std as sd, variance as var, quantileSeq as quantile, 
    uniroot, discrete_inverse 
}
