/*--------------------------------------------------------
Poisson distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { discrete_inverse } from "../stats"
import { create, randomDependencies, factorialDependencies } from "mathjs";
const { random, factorial } = create({ 
    randomDependencies, factorialDependencies 
}, {matrix: 'Array'})



// Poisson
function dpois0(x, lambda) {
    if (lambda <= 0) throw new Error("The parameter 'lambda' must be positive.")
    return (lambda ** x) * Math.exp(-lambda) / factorial(x);
}

function ppois0(q, lambda) {
    if (lambda <= 0) throw new Error("The parameter 'lambda' must be positive.")
    let sum = 0;
    for (let k = 0; k <= q; k++) {
        sum += dpois(k, lambda)
    }
    return sum;
}

function qpois0(p, lambda) {
    if (lambda <= 0) throw new Error("The parameter 'lambda' must be positive.")
    let f = x => dpois0(x, lambda);
    return discrete_inverse(p, f, 0);
}

function rpois0(lambda) {
    if (lambda <= 0) throw new Error("The parameter 'lambda' must be positive.")
    return qpois0(random(), lambda);
}



const dpois = function(x, lambda, log = false) {
    // Provides names for the extended function
    let f = (x, lambda) => ddist(dpois0)(x, lambda, log);
    return broadcast(f)(x, lambda);
}

const ppois = function(q, lambda, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, lambda) => pdist(ppois0)(q, lambda, lower_tail, log_p);
    return broadcast(f)(q, lambda);
}

const qpois = function(p, lambda, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, lambda) => qdist(qpois0)(p, lambda, lower_tail, log_p);
    return broadcast(f)(p, lambda);
}

const rpois = function(n, lambda) {
    // Provides names for the extended function
    let f = (n, lambda) => rpois0(lambda);
    return broadcast(f)(Array.from({length: n}), lambda);
}



export { dpois, ppois, qpois, rpois }
