/*--------------------------------------------------------
Lognormal distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { uniroot } from "../stats"
import { create, randomDependencies, erfDependencies } from "mathjs";
const { random, erf } = create({
    randomDependencies, erfDependencies 
}, {matrix: 'Array'})


// Remove default arguments to correct test-coverage / Istanbul issue:
// https://github.com/facebook/jest/issues/6827
function dlnorm0(x, meanlog, sdlog) {
    if (sdlog <= 0) throw new Error("Standard deviation must be a positive number.")
    return 1 / (x * sdlog * Math.sqrt(2 * Math.PI)) * Math.exp(- ((Math.log(x) - meanlog) ** 2) / (2 * sdlog ** 2));
}

function plnorm0(q, meanlog, sdlog) {
    if (sdlog <= 0) throw new Error("Standard deviation must be a positive number.")
    return 0.5 + 0.5 * erf( (Math.log(q) - meanlog) / (Math.sqrt(2) * sdlog) )
}

function qlnorm0(p, meanlog, sdlog) {
    if (sdlog <= 0) throw new Error("Standard deviation must be a positive number.")
    let f = q => plnorm0(q, meanlog, sdlog) - p
    let result = uniroot(f, [0, 10*sdlog], 1e-10, 1e3, "upX", false);
    if (result.status == "failed") {
        throw new Error("The uniroot procedure returns failure.")
    }
    return result.root;
}

function rlnorm0(meanlog, sdlog) {
    if (sdlog <= 0) throw new Error("Standard deviation must be a positive number.")
    return qlnorm0(random(), meanlog, sdlog);
}



const dlnorm = function(x, meanlog = 0, sdlog = 1, log = false) {
    // Provides names for the extended function
    let f = (x, meanlog, sdlog) => ddist(dlnorm0)(x, meanlog, sdlog, log);
    return broadcast(f)(x, meanlog, sdlog);
}

const plnorm = function(q, meanlog = 0, sdlog = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, meanlog, sdlog) => pdist(plnorm0)(q, meanlog, sdlog, lower_tail, log_p);
    return broadcast(f)(q, meanlog, sdlog);
}

const qlnorm = function(p, meanlog = 0, sdlog = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, meanlog, sdlog) => qdist(qlnorm0)(p, meanlog, sdlog, lower_tail, log_p);
    return broadcast(f)(p, meanlog, sdlog);
}

const rlnorm = function(n, meanlog = 0, sdlog = 1) {
    // Provides names for the extended function
    let f = (n, meanlog, sdlog) => rlnorm0(meanlog, sdlog);
    return broadcast(f)(Array.from({length: n}), meanlog, sdlog);
}



export { dlnorm, plnorm, qlnorm, rlnorm }
