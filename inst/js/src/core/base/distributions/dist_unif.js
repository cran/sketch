/*--------------------------------------------------------
Uniform distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { create, randomDependencies } from "mathjs";
const { random } = create({ randomDependencies }, {matrix: 'Array'})


// Remove default arguments to correct test-coverage / Istanbul issue:
// https://github.com/facebook/jest/issues/6827
const dunif0 = function(x, min, max) {
    return ((min <= x) && (x <= max)) ? 1 / (max - min) : 0;
}

const punif0 = function(q, min, max) {
    if (q < min) return 0;
    if (q > max) return 1;
    return (q - min) / (max - min);
}

const qunif0 = function(p, min, max) {
    return min + p * (max - min);
}

const runif0 = function(min, max) {
    return random(min, max);
}



const dunif = function(x, min = 0, max = 1, log = false) {
    // Provides names for the extended function
    let f = (x, min, max) => ddist(dunif0)(x, min, max, log);
    return broadcast(f)(x, min, max);
}
const punif = function(q, min = 0, max = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, min, max) => pdist(punif0)(q, min, max, lower_tail, log_p);
    return broadcast(f)(q, min, max);
}
const qunif = function(p, min = 0, max = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, min, max) => qdist(qunif0)(p, min, max, lower_tail, log_p);
    return broadcast(f)(p, min, max);
}
const runif = function(n, min = 0, max = 1) {
    // Provides names for the extended function
    let f = (n, min, max) => runif0(min, max);
    return broadcast(f)(Array.from({length: n}), min, max);
}


export { dunif, punif, qunif, runif }
    