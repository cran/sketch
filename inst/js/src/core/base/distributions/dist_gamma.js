/*--------------------------------------------------------
Gamma distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { uniroot } from "../stats"
import { ingamma } from "../math_functions";
import { create, randomDependencies, gammaDependencies } from "mathjs";
const { random, gamma } = create({ 
    randomDependencies, gammaDependencies
}, {matrix: 'Array'})



// Gamma
function dgamma0(x, shape, rate = 1) {
    if (shape <= 0) throw new Error("The shape parameter must be a positive number.")
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    let alpha = shape, beta = rate;
    return (beta ** alpha) / gamma(alpha) * (x ** (alpha - 1)) * Math.exp(- beta * x)
}

function pgamma0(q, shape, rate = 1) {
    if (shape <= 0) throw new Error("The shape parameter must be a positive number.")
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    let alpha = shape, beta = rate;
    return ingamma(alpha, beta * q) / gamma(alpha);
}

function qgamma0(p, shape, rate = 1) {
    if (shape <= 0) throw new Error("The shape parameter must be a positive number.")
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    let f = q => pgamma0(q, shape, rate) - p
    let result = uniroot(f, [0,10*shape/rate], 1e-10, 1e3, "upX", false);
    if (result.status == "failed") {
        throw new Error("The uniroot procedure returns failure.")
    }
    return result.root;
}

function rgamma0(shape, rate = 1) {
    if (shape <= 0) throw new Error("The shape parameter must be a positive number.")
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    return qgamma0(random(), shape, rate);
}



const dgamma = function(x, shape, rate = 1, log = false) {
    // Provides names for the extended function
    let f = (x, shape, rate) => ddist(dgamma0)(x, shape, rate, log);
    return broadcast(f)(x, shape, rate);
}

const pgamma = function(q, shape, rate = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, shape, rate) => pdist(pgamma0)(q, shape, rate, lower_tail, log_p);
    return broadcast(f)(q, shape, rate);
}

const qgamma = function(p, shape, rate = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, shape, rate) => qdist(qgamma0)(p, shape, rate, lower_tail, log_p);
    return broadcast(f)(p, shape, rate);
}

const rgamma = function(n, shape, rate = 1) {
    // Provides names for the extended function
    let f = (n, shape, rate) => rgamma0(shape, rate);
    return broadcast(f)(Array.from({length: n}), shape, rate);
}



export { dgamma, pgamma, qgamma, rgamma }
