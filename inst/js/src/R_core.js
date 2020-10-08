import * as RBase from './core/base.js';
import * as RArray from './core/R_array.js';
import * as RList from './core/R_list.js';
import * as RDataFrame from "./core/R_dataframe.js";
import { DataFrame } from 'dataframe-js';

import { create, typedDependencies } from "mathjs";
const R = create({ typedDependencies }, { matrix: 'Array' });

// 1. R base functions
R.import(RBase);

// 2. R data structure
// a. Vector, Matrix and Array
R.import(RArray);

// b. DataFrame
const isRDataFrame = x => (x && (x instanceof DataFrame))
const isRGroupedDataFrame = x => (x && x.df && (x.df instanceof DataFrame))
R.typed.addType({name: 'dataframe', test: isRDataFrame}) 
R.typed.addType({name: 'dataframe-grouped', test: isRGroupedDataFrame})
R.import(RDataFrame)

// c. List
const isRList = x => x && (Object.prototype.toString.call(x) === '[object Object]')
R.typed.addType({name: 'list', test: isRList})  // See note 1
R.import(RList)

export default R

/*
Note 1: 
The type dispatch list in the variable 'typed' indicates that the 
dispatch follows the order in which the types are added.
List must be added after DataFrame because List is just an
alias of Object in JavaScript, and it will intercept the DataFrame
type, which is an Object with additional constraints.
*/
