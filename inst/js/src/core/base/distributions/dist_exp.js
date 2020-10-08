/*--------------------------------------------------------
Exponential distribution
---------------------------------------------------------*/
import { ddist, pdist, qdist, broadcast } from "./dist";
import { create, randomDependencies } from "mathjs";
const { random } = create({ randomDependencies }, { matrix: 'Array' })



const dexp0 = function(x, rate = 1) {
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    return (x < 0) ? 0 : rate * Math.exp(-rate * x);
}

const pexp0 = function(q, rate = 1) {
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    return (q < 0) ? 0 : 1 - Math.exp(-rate * q);
} 

const qexp0 = function(p, rate = 1) {
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    return - Math.log(1 - p) / rate;
}

const rexp0 = function(rate = 1) {
    if (rate <= 0) throw new Error("The rate parameter must be a positive number.")
    return qexp(random(), rate);
}



const dexp = function(x, rate = 1, log = false) {
    // Provides names for the extended function
    let f = (x, rate) => ddist(dexp0)(x, rate, log);
    return broadcast(f)(x, rate);
}

const pexp = function(q, rate = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (q, rate) => pdist(pexp0)(q, rate, lower_tail, log_p);
    return broadcast(f)(q, rate);
}

const qexp = function(p, rate = 1, lower_tail = true, log_p = false) {
    // Provides names for the extended function
    let f = (p, rate) => qdist(qexp0)(p, rate, lower_tail, log_p);
    return broadcast(f)(p, rate);
}

const rexp = function(n, rate = 1) {
    // Provides names for the extended function
    let f = (n, rate) => rexp0(rate);
    return broadcast(f)(Array.from({length: n}), rate);
}



export { dexp, pexp, qexp, rexp }
