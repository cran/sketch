import DataFrame from 'dataframe-js';
import * as R_array from "./R_array.js";
import { all, intersection } from "ramda";
import { create, typedDependencies, typeOfDependencies } from "mathjs";
const { typed, typeOf } = create({
    typedDependencies, typeOfDependencies
}, { matrix: 'Array' })


// Add functions with 'dataframe' signature
typed.addType({
    name: 'dataframe',
    test: x => (x && (x instanceof DataFrame))
}) 

typed.addType({
    name: 'dataframe-grouped',
    test: x => (x && x.df && (x.df instanceof DataFrame))
}) 

// Constructor
function data_frame(x) {
    return new DataFrame(x);
}


/* Extractor
The dataframe class supports both the `[` and `[[` extractors.
The extractor takes at most two arguments. When only one argument
is provided, it is treated as the column index; when two arguments
are provided, it is treated as (row, column) index. For `[`, the 
column index can be a number, a string or a (R-)vector, while the 
row index can only be a number or a (R-)vector. In other words, 
our dataframe has no rownames. `[[` is the same as `[` except that
vector is not allowed.
*/
// Extractor
const dfExtract = typed('extract', { 
    // By column
    'dataframe, number': (x, ind) => x.select(colnames(x)[ind]),
    'dataframe, string': (x, ind) => x.select(ind),
    'dataframe, Array': function(x, ind) {
        if (!assertType(ind, ['number', 'string'])) {
            throw new Error("Column index must be a string or a number.")
        }     
        let strIndex = getIndexInStr(x, ind);
        return x.select(...strIndex);
    },
    // By row and column
    'dataframe, number, number | string | Array': function(x, i, j) {
        return dfExtract(x.slice(i, i+1), j);
    },
    'dataframe, Array, number | string | Array': function(x, i, j) {
        if (!assertType(i, ['number'])) {
            throw new Error("Row index must be a number.")
        }
        return i.map(r => dfExtract(x, r, j))
                .reduce((x, y) => rbind(x, y));
    }
})

// getIndexInStr :: dataframe -> [number | string] | number | string -> [string]
function getIndexInStr(x, ind) {
    const indexMap = i => typeOf(i) == 'number'? colnames(x)[i] : i;
    return Array.isArray(ind) ? ind.map(indexMap) : indexMap(ind)
}

const dfExtract2 = typed('extract2', { 
    // By column  (1 argument)
    'dataframe, number': (x, ind) => R_array.c(x.select(colnames(x)[ind]).toArray()),
    'dataframe, string': (x, ind) => R_array.c(x.select(ind).toArray()),
    // By row and column (2 argument)
    'dataframe, number, number | string': function(x, i, j) {
        return R_array.c(dfExtract(x, i, j).toArray());
    } 
})

// assertType :: Array -> Array -> boolean
function assertType(x, types) {
    return x.map(i => types.includes(typeOf(i)))
            .reduce((x, y) => x && y);
}

const colnames = typed('colnames', {
    'dataframe': x => x.listColumns()
})

const dim = typed('dim', {
    'dataframe': x => x.dim()
})


// Extract-Assignment
const dfExtractAssign = typed('extractAssign', {
    // By column (one-argument index)
    'dataframe, null | undefined | number | string | boolean, string': function(x, val, ind) {
        return x.withColumn(ind, () => val);
    },
    'dataframe, Array, string': function(x, val, ind) {
        if (val.length != x.count()) {
            throw new Error("Length of the replacement does not match the dataframe.")
        }
        return x.withColumn(ind, (row, index) => val[index]);
    },
    'dataframe, null | undefined | number | string | boolean | Array, number': function(x, val, ind) {
        return dfExtractAssign(x, val, colnames(x)[ind]);
    },
    'dataframe, null | undefined | number | string | boolean, Array': function(x, val, ind) {
        let strInd = getIndexInStr(x, ind);
        return strInd.reduce((acc, i) => dfExtractAssign(acc, val, i), x);
    },
    'dataframe, Array, Array': function(x, val, ind) {
        let nrow0 = x.count(), ncol0 = colnames(x).length;
        if (R_array.dim(val)[0] != nrow0) {
            throw new Error("The number of rows of the replacement does not match the dataframe.")
        }
        if (R_array.dim(val)[1] != ncol0) {
            throw new Error("The number of columns of the replacement does not match the dataframe.")
        }
        let strInd = getIndexInStr(x, ind);
        return strInd.reduce(
            function(acc, i, index) {
                // :: dataframe -> column string -> column index -> dataframe
                let rhs = R_array.extract(val, R_array.emptyIndex(val, 0), index);
                return dfExtractAssign(acc, R_array.c(rhs), i);
            },
            x // initial value
        );
        
    },
    // By row and column (two-argument index)
    'dataframe, null | undefined | number | string | boolean, number, number | string': 
        function(x, val, i, j) {
            return x.setRow(i, row => row.set(getIndexInStr(x, j), val));
        },
    'dataframe, Array, number, number | string': 
        function(x, val, i, j) {
            if (val.length != 1) {
                throw new Error("Replacement length does not match index length.")
            }
            return x.setRow(i, row => row.set(getIndexInStr(x, j), val[0]));
        },
    'dataframe, null | undefined | number | string | boolean, Array, number | string': 
        function(x, val, i, j) {
            return i.reduce(
                // :: dataframe -> integer -> dataframe
                (acc, rowIndex) => dfExtractAssign(acc, val, rowIndex, j),
                x  // initial value
            )
        },
    'dataframe, Array, Array, number | string': 
        function(x, val, i, j) {
            if (i.length != val.length) {
                throw new Error("Replacement length does not matcht the row index length.")
            }
            return i.reduce(
                // :: dataframe -> integer -> dataframe
                (acc, rowIndex, ind) => dfExtractAssign(acc, val[ind], rowIndex, j),
                x  // initial value
            )
        },
    'dataframe, null | undefined | number | string | boolean | Array, number, Array': 
        function(x, val, i, j) {
            let str_j = getIndexInStr(x, j)
            return x.setRow(i, row => setMultipleColumns(row, str_j, val));
        },
    'dataframe, null | undefined | number | string | boolean, Array, Array': 
        function(x, val, i, j) {
            return i.reduce(
                // :: dataframe -> integer -> dataframe
                (acc, rowIndex) => dfExtractAssign(acc, val, rowIndex, j),
                x  // initial value
            )
        },
    'dataframe, Array, Array, Array': 
        function(x, val, i, j) {
            let nrow0 = i.length, ncol0 = j.length;
            if (R_array.dim(val)[0] != nrow0) {
                throw new Error("The number of rows of the replacement does not match the dataframe.")
            }
            if (R_array.dim(val)[1] != ncol0) {
                throw new Error("The number of columns of the replacement does not match the dataframe.")
            }
            return i.reduce(
                // :: dataframe -> integer -> dataframe
                function(acc, rowIndex) {
                    let rowVal = R_array.extract(val, rowIndex, R_array.emptyIndex(val, 1));
                    return dfExtractAssign(acc, R_array.c(rowVal), rowIndex, j);
                },
                x  // initial value
            )
        },
}); 

function setMultipleColumns(row, columnIndices, values) {
    if (Array.isArray(values)) {
        if (columnIndices.length != values.length) {
            throw new Error("Replacement length does not match index length.")
        }
        return columnIndices.reduce(
            (acc, colInd, ind) => acc.set(colInd, values[ind]),
            row // initial value
        )
    } else {
        return columnIndices.reduce(
            (acc, colInd) => acc.set(colInd, values), 
            row // initial value
        )
    } 
}


const rbind = typed('rbind', {
    'dataframe, dataframe': (df1, df2) => df1.union(df2)
})

const mutate = typed('mutate', {
    'dataframe, string, function': function(df0, columnName, func) {
        return df0.withColumn(columnName, func);
    },
    'dataframe, Array, Array': function(df0, columnName, func) {
        let col = columnName.shift()
        ,   fun = func.shift();
        let res = df0.withColumn(col, fun); 
        if (columnName.length == 0) {
            return res;
        }
        return mutate(res, columnName, func);
    }
})

const select = typed('select', {
    'dataframe, ...string': function(df0, values) {
        return df0.select(...values);
    }
})

const filter = typed('filter', {
    'dataframe, function': function(df0, func) {
        return df0.filter(func);
    }
})

const group_by = typed('group_by', {
    'dataframe, ...string': function(df0, columnName) {
        return df0.groupBy(...columnName);
    }
})

const count = typed('count', {
    'dataframe, ...string': function(df0, columnName) {
        return df0.groupBy(...columnName).
                   aggregate(group => group.count()).
                   rename('aggregation', 'n');
    }
})

const summarise = typed('summarise', {
    'dataframe-grouped, string, function': function(grouped_df0, columnName, func) {
        return grouped_df0.aggregate(func).rename('aggregation', columnName);
    },
    'dataframe-grouped, Array, Array': function(grouped_df0, columnName, func) {
        let dfs = columnName.map(function(cname, i) {
            grouped_df0.aggregate(func[i]).rename('aggregation', cname);
        });
        let groupColumnNames = dfs.map(listColumns).reduce(intersection);
        return dfs.reduce((df1, df2) => df1.leftJoin(df2, groupColumnNames));
    },
})

const arrange = typed('arrange', {
    'dataframe, string': function(df0, colNames) {
        df0.sortBy(colNames);
        return df0;
    },
    // duplicate for optional arguments
    'dataframe, string, boolean': function(df0, colNames, reverse = false) {
        df0.sortBy(colNames, reverse);
        return df0;
    },
    'dataframe, Array': function(df0, colNames) {
        if (!all(colNames.map(x => typeOf(x) === 'string'))) {
            throw "colNames must contain only strings."
        }
        df0.sortBy(colNames);
        return df0;
    },
    // duplicate for optional arguments
    'dataframe, Array, boolean': function(df0, colNames, reverse = false) {
        if (!all(colNames.map(x => typeOf(x) === 'string'))) {
            throw "colNames must contain only strings."
        }
        df0.sortBy(colNames, reverse);
        return df0;
    }
})

const print = typed("print", {
    "dataframe": x => x.show()
})


export {
    data_frame,
    dfExtract as extract,
    dfExtract2 as extract2,
    dfExtractAssign as extractAssign,
    //extract2Assign: dfextract2Assign,
    colnames,
    dim,
    print,
    rbind,
    mutate,
    filter,
    select,
    arrange,
    group_by,
    summarise,
    count
}
