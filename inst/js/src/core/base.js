import { create, typedDependencies, typeOfDependencies } from "mathjs";
import { flatten, zipWith } from "ramda";
const { typed, typeOf } = create({ 
    typedDependencies, typeOfDependencies
}, { matrix: 'Array' })


/*========================================================= 
R functions
These functions should in general include all the data
types in JavaScript, i.e. null, undefined, number, string,
boolean, Array and Object, when it is appropriate to do so.

Notes:
- `math.typed` rejects all input with the wrong types.
- Functions from "math.js" automatically handles all
data types when applicable.
=========================================================*/

/**
 * Return the length of an object
 * @param x A JavaScript object.
 * @return An integer.
 * @exports
 */
const length = typed('length', {
    'null | undefined': x => 0,
    'number | string | boolean': x => 1,
    'Array': x => x.length,
    'Object': x => Object.keys(x).length
})


const which = typed('which', {
    'Array': function(x) {
        let indexArray = Array.from({length: x.length}).map((_,i) => i);
        return indexArray.filter(i => x[i]);
    }
})


const seq = typed('seq_by', {
    'number, number': function(from, to) {
    	return seq(from, to, Math.sign(to - from));
    },
    'number, number, number': function(from = 1, to = 1, by = 1) {
        let res = [], s = Math.sign(by);
        for (let i = 0; s * (from + i * by) <= s * to; i++) {
    		res.push(from + i * by);
    	}
    	return res;
    }
})


const rep = typed('rep', {
    'number | Array, number': function(x, times) {
    	return flatten(Array(times).fill(x));
    },
    'Array, Array': function(x, times) {
        return flatten(zipWith(rep, x, times));
    }
})


export * from "./base/distributions.js"
export * from "./base/funprog.js"
export * from "./base/group_generic.js"
export * from "./base/math_functions.js"
export * from "./base/sets.js"
export * from "./base/stats.js"
export * from "./base/utils.js"
// export * from "./base/extra.js"
export { length, typeOf as typeof, which, seq, rep }
