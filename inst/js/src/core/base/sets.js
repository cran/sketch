/*--------------------------------------------------------
Set functions
---------------------------------------------------------*/
import { 
    create, typedDependencies, 
    setDistinctDependencies,
    setUnionDependencies, setIntersectDependencies,
    setDifferenceDependencies, setSymDifferenceDependencies,
    setSizeDependencies, setIsSubsetDependencies
} from "mathjs";

const { 
    typed, 
    setDistinct, setUnion, setIntersect, setDifference, setSymDifference,
    setSize, setIsSubset
} = create(
    { typedDependencies, setDistinctDependencies,
        setUnionDependencies, setIntersectDependencies,
        setDifferenceDependencies, setSymDifferenceDependencies,
        setSizeDependencies, setIsSubsetDependencies },
    { matrix: 'Array' }
)


/**
 * The union of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; aA set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const union = function(x, y) {
    return setUnion(setDistinct(x), setDistinct(y))
}


/**
 * The intersection of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const intersect = function(x, y) {
    return setIntersect(setDistinct(x), setDistinct(y))
}


/**
 * The difference of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const setdiff = function(x, y) {
    return setDifference(setDistinct(x), setDistinct(y))
}


/**
 * Equality of two sets
 * @param {Array} x A set; an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return {boolean} true or false.
 * @exports
 */
const setequal = function(x, y) {
    return setSize(setSymDifference(
        setDistinct(x), setDistinct(y)
    )) === 0;
}


/**
 * Check if an element belongs to a set
 * @param x An element, or an array of elements.
 * @param {Array} y A set; an array of elements.
 * @return An array of elements.
 * @exports
 */
const is_element = typed('is_element', {
    'number, Array': function(x, y) {
        return setIsSubset([x], y);
    }, 
    'Array, Array' : function(x, y) {
        return x.map(x => setIsSubset([x], y));
    }
})


/**
 * The symmetric difference of two sets
 * @param {Array} x An array of elements.
 * @param {Array} y An array of elements.
 * @return An array of elements.
 * @exports
 */
const setsymdiff = function(x, y) {
    return setSymDifference(setDistinct(x), setDistinct(y))
}


// table = function(xs) {
//     let set = setDistinct(xs)
//     return {
//         element: set, 
//         count: set.map(el => setMultiplicity(el, xs))
//     };
// }


export {
    setDistinct as unique, 
    union, 
    intersect, 
    setdiff, 
    setequal, 
    is_element, 
    // table
    setIsSubset as is_subset, 
    setsymdiff
}
