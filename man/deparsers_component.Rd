% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/core-components.R
\name{deparse_Family}
\alias{deparse_Family}
\alias{deparse_sym}
\alias{deparse_NULL}
\alias{deparse_NA}
\alias{deparse_NaN}
\alias{deparse_call}
\alias{deparse_infix}
\alias{deparse_wrap}
\alias{deparse_for}
\alias{deparse_if}
\alias{deparse_while}
\alias{deparse_function}
\alias{deparse_function_with_return}
\alias{deparse_return}
\alias{deparse_assignment}
\alias{deparse_assignment_auto}
\alias{deparse_next}
\alias{deparse_try}
\alias{deparse_tryCatch}
\alias{deparse_throw}
\alias{deparse_list}
\alias{deparse_df}
\alias{deparse_df_summarise}
\alias{deparse_df_mutate}
\alias{deparse_R6Class}
\alias{deparse_new}
\alias{deparse_typeof}
\alias{deparse_export}
\alias{deparse_async_await}
\alias{deparse_let}
\alias{deparse_const}
\alias{deparse_var}
\alias{deparse_dataURI}
\alias{deparse_ifelse}
\alias{deparse_lambda}
\alias{deparse_pipe}
\alias{deparse_assignment_pipe}
\alias{deparse_raw_string}
\alias{deparse_formula}
\alias{deparse_add}
\alias{deparse_subtract}
\alias{deparse_extract}
\alias{deparse_extractAssign}
\alias{deparse_extract2}
\alias{deparse_extract2Assign}
\alias{deparse_html_tags}
\alias{deparse_d3_attr}
\alias{deparse_d3_style}
\alias{deparse_macro}
\alias{deparse_data}
\title{Deparsers (specialised)}
\usage{
deparse_sym(ast, ...)

deparse_NULL(ast, ...)

deparse_NA(ast, ...)

deparse_NaN(ast, ...)

deparse_call(ast, ...)

deparse_infix(ast, ...)

deparse_wrap(ast, ...)

deparse_for(ast, ...)

deparse_if(ast, ...)

deparse_while(ast, ...)

deparse_function(ast, ...)

deparse_function_with_return(ast, ...)

deparse_return(ast, ...)

deparse_assignment(ast, ...)

deparse_assignment_auto(ast, ...)

deparse_next(ast, ...)

deparse_try(ast, ...)

deparse_tryCatch(ast, ...)

deparse_throw(ast, ...)

deparse_list(ast, ...)

deparse_df(ast, ...)

deparse_df_summarise(ast, ...)

deparse_df_mutate(ast, ...)

deparse_R6Class(ast, ...)

deparse_new(ast, ...)

deparse_typeof(ast, ...)

deparse_export(ast, ...)

deparse_async_await(ast, ...)

deparse_let(ast, ...)

deparse_const(ast, ...)

deparse_var(ast, ...)

deparse_dataURI(ast, ...)

deparse_ifelse(ast, ...)

deparse_lambda(ast, ...)

deparse_pipe(ast, ...)

deparse_assignment_pipe(ast, ...)

deparse_raw_string(ast, ...)

deparse_formula(ast, ...)

deparse_add(ast, ...)

deparse_subtract(ast, ...)

deparse_extract(ast, ...)

deparse_extractAssign(ast, ...)

deparse_extract2(ast, ...)

deparse_extract2Assign(ast, ...)

deparse_html_tags(ast, ...)

deparse_d3_attr(ast, ...)

deparse_d3_style(ast, ...)

deparse_macro(ast, ...)

deparse_data(ast, ...)
}
\arguments{
\item{ast}{A language object.}

\item{...}{The contextual information to be passed on to
the next call.}
}
\value{
A character string.
}
\description{
Deparsers (specialised)

Deparser for NULL

Deparser for NA

Deparser for NaN

Deparser for calls

Deparser for infix operators

Deparser for brackets

Deparser for the 'for' keyword

Deparser for the 'if' keyword

Deparser for the 'while' keyword

Deparser for the "function" keyword

Deparser for the "function" keyword with explicit return

Deparser for return

Deparser for assignments

Deparser for assignments (automatic variable declaration)

Deparser for the "next" keyword

Deparser for the "try" keyword

Deparser for the "tryCatch" keyword

Deparser for the "throw" keyword

Deparser for the "list" operator

Deparser for the "data.frame" operators

Deparser for the "summarise" operators

Deparser for the "mutate" operators

Deparser for the "R6Class" function

Deparser for the "new" operator

Deparser for the "typeof" operator

Deparser for the "export" operator

Deparser for the ""async" and "await" operators

Deparser for the "let" operator

Deparser for the "const" operator

Deparser for the "var" operator

Deparser for the "dataURI" operator

Deparser for the "ifelse" operator

Deparser for the "lambda" operator

Deparser for the "pipe" operator

Deparser for the "assignment pipe" operator

Deparser for the raw string operator

Deparser for formula

Deparser for the "add" operator

Deparser for the "subtract" operator

Deparser for the "extract" operator

Deparser for the "extractAssign" operator

Deparser for the "extract2" operator

Deparser for the "extract2Assign" operator

Deparser for the HTML tags

Deparser for the d3.js `attr` function

Deparser for the d3.js `style` function

Deparser for '.macro'

Deparser for '.data'
}
\note{
At the moment, the '.macro' / `deparse_macro` function must be
used with the `compile_exprs` call. This is currently an experimental
feature.

At the moment, the '.data' / `deparse_data` function must be
used with the `compile_exprs` call. This is currently an experimental
feature.
}
