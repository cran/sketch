/*--------------------------------------------------------
Normal distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { uniroot } from "../stats"
import { create, randomDependencies, erfDependencies } from "mathjs";
const { random, erf } = create({ randomDependencies, erfDependencies }, {matrix: 'Array'})


// Remove default arguments to correct test-coverage / Istanbul issue:
// https://github.com/facebook/jest/issues/6827
function dnorm0(x, mean, sd) {
    if (sd <= 0) throw new Error("Standard deviation must be a positive number.")
    return 1 / (sd * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * ((x - mean) / sd) ** 2);
}

function pnorm0(q, mean, sd) {
    if (sd <= 0) throw new Error("Standard deviation must be a positive number.")
    return 0.5 * (1 + erf((q - mean) / (sd * Math.sqrt(2))));
}

function qnorm0(p, mean, sd) {
    if (sd <= 0) throw new Error("Standard deviation must be a positive number.")
    let f = q => pnorm0(q, mean, sd) - p
    let result = uniroot(f, [-5 * sd, 5 * sd], 1e-10, 1e3, "yes", false);
    if (result.status == "failed") {
        throw new Error("The uniroot procedure returns failure.")
    }
    return result.root;
}

function rnorm0(mean, sd) {
    if (sd <= 0) throw new Error("Standard deviation must be a positive number.")
    return qnorm0(random(), mean, sd);
}



const dnorm = function(x, mean = 0, sd = 1, log = false) {
    // Provides names for the extended function
    let f = (x, mean, sd) => ddist(dnorm0)(x, mean, sd, log);
    return broadcast(f)(x, mean, sd);
}

const pnorm = function(q, mean = 0, sd = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, mean, sd) => pdist(pnorm0)(q, mean, sd, lower_tail, log_p);
    return broadcast(f)(q, mean, sd);
}

const qnorm = function(p, mean = 0, sd = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, mean, sd) => qdist(qnorm0)(p, mean, sd, lower_tail, log_p);
    return broadcast(f)(p, mean, sd);
}

const rnorm = function(n, mean = 0, sd = 1) {
    // Provides names for the extended function
    let f = (n, mean, sd) => rnorm0(mean, sd);
    return broadcast(f)(Array.from({length: n}), mean, sd);
}



export { dnorm, pnorm, qnorm, rnorm }
