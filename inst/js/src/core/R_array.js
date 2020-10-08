import {
    create, 
    typedDependencies,
    flattenDependencies,
    transposeDependencies,
    reshapeDependencies,
    subsetDependencies,
    indexDependencies,
    prodDependencies,
    rangeDependencies,
    sizeDependencies,
    deepEqualDependencies
} from "mathjs";
import { length } from  "./base.js";

const {
    typed, flatten, transpose, reshape, subset, index, prod, range, size,
    deepEqual
} = create({
    typedDependencies,
    flattenDependencies,
    transposeDependencies,
    reshapeDependencies,
    subsetDependencies,
    indexDependencies,
    prodDependencies,
    rangeDependencies,
    sizeDependencies,
    deepEqualDependencies
}, { matrix: 'Array' })

// Combine values into a vector
function c() {
    return flatten([...arguments]);
}

// Matrices
const matrix2 = typed('matrix2', {
    'null | undefined | number | string | boolean | Array, number, number': function(x, nrow, ncol) {
        return matrix2(x, nrow, ncol, false);
    },
    'null | undefined | number | string | boolean, number, number, boolean': function(x, nrow, ncol, byrow = false) {
        let y = Array(nrow * ncol).fill(x);
        return matrix2(y, nrow, ncol, byrow);
    },
    'Array, number, number, boolean': function(x, nrow, ncol, byrow = false) {
        return byrow?
            reshape(x, [nrow, ncol]):
            transpose(reshape(x, [ncol, nrow]));
    }
})

// Array
const array = typed('array', {
    'number, Array': function(x, dims) {
        let y = Array(prod(dims)).fill(x);
        return array(y, dims);
    },
    'Array, Array': (x, dims) => reshape(x, dims)
})


/* Extractor
The array class (including vectors and matrices) supports 
only the `[` extractor, but not the `[[` extractor.
The extractor takes any number of arguments, and each of them 
can be a number or a (R-)vector. 
*/
const arrayExtract = typed('extract', {
    'Array, ...number | Array': function(x, indices) {
        return subset(x, index(...indices));
    }
})

const emptyIndex = typed('emptyIndex', {
    'Array, number': function(x, index) {
        return range(0, size(x)[index])
    }
})


// Extract-Assignment
const arrayExtractAssign = typed('extractAssign', {
    'Array, Array, ...number | Array': function(x, value, indices) {
        // Convert if index dimension is 1 and x dimension > 1
        if ((indices.length == 1) && (size(x).length > 1)) {
            return reshape(
                subset(flatten(x), index(...indices), flatten(value)),
                size(x));
        }

        // Reshape if the dimension of the replacement value does not 
        // match the index
        let indicesShape = indices.map(x => length(x));
        if (!deepEqual(size(value), indicesShape)) { 
            value = reshape(value, indicesShape);
        }

        // Replace array by value
        return subset(x, index(...indices), value);
    },
    'Array, any, ...number | Array': function(x, value, indices) {
        let indexArray = index(...indices),
            indexArrayDim = indexArray.size(),
            indexArrayLen = prod(indexArrayDim),
            indexArrayIsScaler = indexArrayLen === 1;
        if (indexArrayIsScaler) {
            // Both target and source are scalars
            return subset(x, index(...indices), value);
        } else {
            // Construct Array if target is Array but source is scalar 
            let values = Array(indexArrayLen).fill(value),
                valueArray = reshape(values, indexArrayDim);
            return subset(x, indexArray, valueArray);
        }
    }
})

// const copy = function(from, to) {
//     from.map((el,i) => to[i] = el);
// }


const dim = typed('dim', {
    'null | undefined | number | string | boolean | Object': x => null,
    'Array': x => size(x)
})

const print = typed("print", {
    "null | undefined | number | string | boolean | Object | Array": x => console.log(x)
})


export {
    c,
    matrix2,   // name clash with math.js
    array,
    arrayExtract as extract,
    emptyIndex,
    arrayExtractAssign as extractAssign,
    dim,
    print
}
