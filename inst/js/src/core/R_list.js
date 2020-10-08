import { pick, mergeAll } from "ramda";
import { first, all, length as base_length } from "./base.js";
import { create, typedDependencies, typeOfDependencies, rangeDependencies } from "mathjs";
const { 
    typed, typeOf, range 
} = create({
    typedDependencies, typeOfDependencies, rangeDependencies
}, { matrix: 'Array' })


// Add functions with 'list' signature
typed.addType({
    name: 'list',
    test: x => x && 
        (typeOf(x) === 'Object')
        //(Object.prototype.toString.call(x) === '[object Object]')
        //(x.RClass === 'list')
})

// Constructor
const list = typed('list', {
    'Object': x => x
})

// Create a standlone class
// const list = typed('list', {
//     'Object': function(x) {
//         let res = Object.create({RClass: "list"});
//         return Object.assign(res, x);
//     }
// })


/* Extractor
The list class supports both the `[` and `[[` extractors. Both 
of them take only one index argument, which can be a number, 
string or a (R-)vector. 
*/
// Extractor and Assignment
const listExtract = typed('extract', { 
    'list, number': (x, index) => pick([Object.keys(x)[index]], x),
    'list, string': (x, index) => pick([index], x),
    'list, Array': (x, index) => mergeAll(index.map(ind => listExtract(x, ind)))
})

const emptyIndex = typed('emptyIndex', {
    'list, number': function(x, index) {
        return range(0, length(x))
    }
})

const listExtractAssign = typed('extractAssign', {
    'list, any, number | string': function(x, value, index) {
        if (base_length(value) > 1) {
            throw new Error("Number of items to replace does not match the replacement length")
        }
        x[indexName(x, index)] = first(value);
        return x;
    },

    'list, any, Array': function(x, value, index) {
        if (base_length(value) == 1) {
            value = Array(index.length).fill(value);
        }

        let matchLength = (index.length === base_length(value));
        if (!matchLength) {
            throw new Error("Number of items to replace does not match the replacement length.")
        }
        let validIndex = isValidIndex(index);
        if (!validIndex) {
            throw new Error("Invalid subscripts: a subscript must be a number or a string.")
        }
    
        index.forEach((ind, i) => listExtractAssign(x, value[indexName(value, i)], ind))
        return x;
    }
}); 

function isValidIndex(index) {
    return all(index.map(function(x) {
        let types = typeOf(x)
        return (types === 'number') || (types === 'string')
    }))
} 

// Extractor 2 and Assignment 2
const listExtract2 = typed('extract2', { 
    'list, number': (x, index) => x[Object.keys(x)[index]],
    'list, string': (x, index) => x[index],
    'list, Array': function(x, index) {
        if (index.length == 0) {
            return x;
        } else if (index.length == 1) {
            return listExtract2(x, index.shift());
        } else if (index.length > 1) {
            let el = listExtract2(x, index.shift());
            return listExtract2(el, index);
        }
    }
})

const listExtract2Assign = typed('extract2Assign', {
    'list, any, number': function(x, value, index) {
        x[Object.keys(x)[index]] = value;
        return x;
    },

    'list, any, string': function(x, value, index) {
        x[index] = value;
        return x;
    },

    'list, any, Array': function(x, value, index) {
       let y = x;
       while (index.length > 1) { // must leave the last one to modify by reference
            y = y[indexName(y, index.shift())]
       }
       y[indexName(y, index[0])] = value; // modify object
       return x; // return updated object
    },
}); 

const indexName = function(x, i) {
    let indexType = typeOf(i);
    if (indexType == 'string') return i;
    if (indexType == 'number') return Object.keys(x)[i];
    throw new Error("Index must be a number or a string.")
};

// Methods
const length = typed('length', {
    'list': x => Object.keys(x).length
})

// const unlist = typed('length', {
//     'list': function(x) {
//         let res = []

//     }
// })

const names = typed('names', { 
    // 'Array': x => x.names,
    'list': Object.keys
})

// Shallow copy
const append = typed('append', { 
    'list, list': function(x, values) {
        return {...x, ...values} 
    }
})

const print = typed("print", {
    "list": x => console.log(x)
})

// // Implement unlist and relist instead
// const as_vector = typed('as_vector', { 
//     'list': function(x) {
//         let res = Object.keys(x).map(key => x[key]);
//         res.names = Object.keys(x);
//         return res;
//     },
//     // typed.js doesn't support optional parameter yet.
//     'list, boolean': function(x, drop = false) {
//         let res = Object.keys(x).map(key => x[key]);
//         if (!drop) res.names = Object.keys(x);
//         return res;
//     }
// })

export {
    list,
    listExtract as extract,
    emptyIndex,
    listExtract2 as extract2,
    listExtractAssign as extractAssign,
    listExtract2Assign as extract2Assign,
    length,
    // as_vector: as_vector,
    append,
    names,
    print
};
