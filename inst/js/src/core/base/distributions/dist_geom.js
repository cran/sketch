/*--------------------------------------------------------
Geometric distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { discrete_inverse } from "../stats"
import { create, randomDependencies } from "mathjs";
const { random } = create({ randomDependencies }, {matrix: 'Array'})



// Geometric
function dgeom0(x, prob) {
    if (prob < 0 || prob > 1) throw new Error("Probability must be between 0 an 1.")
    return ((1 - prob) ** x) * prob
}

function pgeom0(q, prob) {
    if (prob < 0 || prob > 1) throw new Error("Probability must be between 0 an 1.")
    return 1 - (1 - prob) ** (q + 1)
}

function qgeom0(p, prob) {
    if (prob < 0 || prob > 1) throw new Error("Probability must be between 0 an 1.")
    let f = x => dgeom0(x, prob);
    return discrete_inverse(p, f, 0);
}

function rgeom0(prob) {
    if (prob < 0 || prob > 1) throw new Error("Probability must be between 0 an 1.")
    return qgeom0(random(), prob);
}



const dgeom = function(x, prob, log = false) {
    // Provides names for the extended function
    let f = (x, prob) => ddist(dgeom0)(x, prob, log);
    return broadcast(f)(x, prob);
}

const pgeom = function(q, prob, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, prob) => pdist(pgeom0)(q, prob, lower_tail, log_p);
    return broadcast(f)(q, prob);
}

const qgeom = function(p, prob, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, prob) => qdist(qgeom0)(p, prob, lower_tail, log_p);
    return broadcast(f)(p, prob);
}

const rgeom = function(n, prob) {
    // Provides names for the extended function
    let f = (n, prob) => rgeom0(prob);
    return broadcast(f)(Array.from({length: n}), prob);
}



export { dgeom, pgeom, qgeom, rgeom }
