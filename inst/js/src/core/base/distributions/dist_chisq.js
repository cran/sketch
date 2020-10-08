/*--------------------------------------------------------
Chi-square distributions
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { uniroot } from "../stats"
import { ingamma } from "../math_functions";
import { create, randomDependencies, gammaDependencies } from "mathjs";
const { random, gamma } = create({ 
    randomDependencies, gammaDependencies
}, {matrix: 'Array'})


function dchisq0(x, df) {
    if (df <= 0) throw new Error("The degree of freedom must be a positive number.")
    let half_k = df / 2.0;
    return 1 / (2 ** (half_k) * gamma(half_k)) * (x ** (half_k - 1)) * (Math.exp(-x / 2.0));
}

function pchisq0(q, df) {
    if (df <= 0) throw new Error("The degree of freedom must be a positive number.")
    let half_k = df / 2.0;
    return ingamma(half_k, q / 2.0) / gamma(half_k);
}

function qchisq0(p, df) {
    if (df <= 0) throw new Error("The degree of freedom must be a positive number.")
    let f = q => pchisq0(q, df) - p
    let result = uniroot(f, [0,10*df], 1e-10, 1e3, "upX", false);
    if (result.status == "failed") {
        throw new Error("The uniroot procedure returns failure.")
    }
    return result.root;
}

function rchisq0(df) {
    if (df <= 0) throw new Error("The degree of freedom must be a positive number.")
    return qchisq0(random(), df);
}



const dchisq = function(x, df, log = false) {
    // Provides names for the extended function
    let f = (x, df) => ddist(dchisq0)(x, df, log);
    return broadcast(f)(x, df);
}

const pchisq = function(q, df, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, df) => pdist(pchisq0)(q, df, lower_tail, log_p);
    return broadcast(f)(q, df);
}

const qchisq = function(p, df, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, df) => qdist(qchisq0)(p, df, lower_tail, log_p);
    return broadcast(f)(p, df);
}

const rchisq = function(n, df) {
    // Provides names for the extended function
    let f = (n, df) => rchisq0(df);
    return broadcast(f)(Array.from({length: n}), df);
}



export { dchisq, pchisq, qchisq, rchisq }
