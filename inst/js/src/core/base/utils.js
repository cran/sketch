/*========================================================= 
Helper functions
=========================================================*/
import { create, typedDependencies } from "mathjs";
const { typed } = create({ typedDependencies }, { matrix: 'Array' })


/**
 * A map function for nested Arrays.
 * @param {Array} x An Array (or a nested Array).
 * @param {function} f A function.
 * @return An Array (or a nested Array).
 * @example walk([ 1, [2,3], [4,5] ], x => x + 1)  // returns [ 2, [ 3, 4 ], [ 5, 6 ] ]
 * @exports
 */
const walk = function(x, f) {
    return Array.isArray(x) ?
        x.map(el => walk(el, f)) : 
        f(x)
}


/**
 * Return the first element of an object
 * @param x A JavaScript object.
 * @return The first element of an object.
 * @exports
 */
const first = typed('first', {
    'null | undefined | number | string | boolean': x => x,
    'Array': x => x[0],
    'Object': x => x[Object.keys(x)[0]]
})


export { walk, first }
