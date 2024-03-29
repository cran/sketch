# typed-deparser := (predicate, deparse)
# where
#   predicate :: ast -> bool
#   deparse   :: ast -> string
#
# The corresponding types in R are:
#   ast <--> lang; bool <--> logical; string <--> character.
#
# A list of typed-deparser must satisfy that
# 1. it is non-empty,
# 2. each member is a typed-deparser


#' Expression deparsing for JavaScript
#'
#' @description This is the "master" deparser that dispatches
#' the "worker" deparsers based on the type of the input.
#'
#' @param ast language object.
#' @param deparsers A list of "typed" deparsers.
#' @return A character string.
#'
#' @examples
#' expr_1 <- parse_expr("R.extract(x, 3, )")
#' deparse_js(expr_1, basic_deparsers())
#' deparse_js(expr_1, default_deparsers())
#'
#' expr_2 <- parse_expr("R.data_frame(x = 1, y = 2)")
#' deparse_js(expr_2, basic_deparsers())
#' deparse_js(expr_2, default_deparsers())
#'
#' expr_3 <- parse_expr("lambda(x, x + 1)")
#' deparse_js(expr_3, basic_deparsers())
#'
#' @export
# deparse_js :: ast -> [typed-deparser] -> char
deparse_js <- function(ast, deparsers) {
  for (deparser in deparsers) { # use for-loop to avoid nested recursion
    if (deparser$predicate(ast)) {
      return(deparser$deparse(ast, deparsers))
    }
  }
  stop("The program reaches the end of the list of deparsers you provided; it means you have provided an input that no deparser in the list can handle. You should check your input or add the relevant deparser to the list of deparsers.")
}


#' A minimal list of deparsers for deparsing JavaScript
#'
#' @note This is used as input to \link{deparse_js}, \link{compile_r} and \link{compile_exprs}.
#'
#' @examples
#' basic_deparsers()
#'
#' @export
basic_deparsers <- function() {
  # Order is strict and the deparsers must be arranged such that the
  # specialised ones are at the top and the general ones are at the
  # bottom. This list acts like a sieve, and only inputs that do not
  # get caught at the top will fall to the bottom.
  list(
    "assignment" = make_deparser(is_call_assignment, deparse_assignment),
    # JavaScript template literal
    "raw_string" = make_deparser(is_call_raw_string, deparse_raw_string),
    # JavaScript object literal
    "list"    = make_deparser(is_call_list, deparse_list),
    # Keywords
    "pipe" = make_deparser(is_call_pipe, deparse_pipe),
    "assignment_pipe" = make_deparser(is_call_assignment_pipe, deparse_assignment_pipe),
    "lambda" = make_deparser(is_call_lambda, deparse_lambda),
    "ifelse" = make_deparser(is_call_ifelse, deparse_ifelse),
    "dataURI" = make_deparser(is_call_dataURI, deparse_dataURI),
    "new"  = make_deparser(is_call_new, deparse_new),
    "typeof"  = make_deparser(is_call_typeof, deparse_typeof),
    "export"  = make_deparser(is_call_export, deparse_export),
    "async_await"  = make_deparser(is_call_async_await, deparse_async_await),
    "let"    = make_deparser(is_call_let, deparse_let),
    "const"  = make_deparser(is_call_const, deparse_const),
    "for"    = make_deparser(is_call_for, deparse_for),
    "if"     = make_deparser(is_call_if, deparse_if),
    "while"  = make_deparser(is_call_while, deparse_while),
    "function" = make_deparser(is_call_function, deparse_function),
    "break" = make_deparser(is_call_break, deparse_sym),
    "next" = make_deparser(is_call_next, deparse_next),
    "try" = make_deparser(is_call_try, deparse_try),
    "tryCatch" = make_deparser(is_call_tryCatch, deparse_tryCatch),
    "throw" = make_deparser(is_call_throw, deparse_throw),
    "R6Class" = make_deparser(is_call_R6Class, deparse_R6Class),
    # Operators
    "formula" = make_deparser(is_call_formula, deparse_formula),
    "infix"  = make_deparser(is_call %&&% is_infix, deparse_infix),
    "wrap"   = make_deparser(is_call %&&% is_wrap, deparse_wrap),
    # Syntactic literal
    "NULL" = make_deparser(is_syntactic_literal %&&% is.null, deparse_NULL),
    "NaN" = make_deparser(is_syntactic_literal %&&% is.nan, deparse_NaN),
    "NA" = make_deparser(is_syntactic_literal %&&% is.na, deparse_NA),
    # Basic
    "call"   = make_deparser(is_call, deparse_call),
    "symbol" = make_deparser(is_sym, deparse_sym)
  )
}


#' A list of default deparsers for deparsing JavaScript
#'
#' @note This is used as input to \link{compile_r} and \link{compile_exprs}.
#'
#' @examples
#' default_deparsers()
#'
#' @export
default_deparsers <- function() {
  (basic_deparsers %<% dp_r_support)()
}


#' A list of deparsers with additional features
#'
#' @description Support automatic variable declaration, automatic `return`
#' and shorthand notation for the DOM module.
#' @note lifecycle: experimental
#' @note This is used as input to \link{compile_r} and \link{compile_exprs}.
#'
#' @examples
#' default_2_deparsers()
#'
#' @export
default_2_deparsers <- function() {
  (default_deparsers %<% dp_auto %<% dp_dom)()
}


# For internal reference, deparsers shall be referred to as `dp`.

#' Low-level lists of deparsers
#' @name list-of-deparsers
#' @description Support of R functionalities
dp_r_support <- function() {
  list(
    # Library functions
    "R.add" = make_deparser(is_call_add, deparse_add),
    "R.subtract" = make_deparser(is_call_subtract, deparse_subtract),
    "R.extract2Assign" = make_deparser(is_call_extract2Assign, deparse_extract2Assign),
    "R.extractAssign" = make_deparser(is_call_extractAssign, deparse_extractAssign),
    "R.extract2" = make_deparser(is_call_extract2, deparse_extract2),
    "R.extract" = make_deparser(is_call_extract, deparse_extract),
    # Data structure
    "R.data.frame" = make_deparser(is_call_df, deparse_df),
    "R.summarise" = make_deparser(is_call_df_summarise, deparse_df_summarise),
    "R.mutate" = make_deparser(is_call_df_mutate, deparse_df_mutate)
  )
}

#' Automatic variable declaration and return
#' @rdname list-of-deparsers
dp_auto <- function() {
  list(
    "assignment_auto" = make_deparser(is_call_assignment_auto, deparse_assignment_auto),
    "function" = make_deparser(is_call_function, deparse_function_with_return),
    "return" = make_deparser(is_call_return, deparse_return)
  )
}

#' Shorthand notation for the 'dom' module
#' @rdname list-of-deparsers
dp_dom <- function() {
  list("dom" = make_deparser(is_html_tags, deparse_html_tags))
}

#' Shorthand notation for the 'd3' library
#' @rdname list-of-deparsers
dp_d3 <- function() {
  list("d3_attr" = make_deparser(is_d3_attr, deparse_d3_attr),
       "d3_style" = make_deparser(is_d3_style, deparse_d3_style))
}

#' Macro
#' @rdname list-of-deparsers
dp_macro <- function() {
  list("macro" = make_deparser(is_macro, deparse_macro),
       "data" = make_deparser(is_data, deparse_data))
}


#' Constructor function to combine low-level deparsers
#'
#' @note lifecycle: experimental
#'
#' @param ... character strings indicating the features needed
#' of the deparsers. The supported features are "basic", "r",
#' "auto" and "dom" corresponding to the basic deparsers, the R
#' support, the automatic variable declaration and return, and
#' the dom shorthand notation.
#'
#' @export
dp <- function(...) {
  current_support <- list(
    "basic" = basic_deparsers,
    "r" = dp_r_support,
    "auto" = dp_auto,
    "dom" = dp_dom,
    "d3" = dp_d3,
    "macro" = dp_macro
  )
  res <- current_support[c(...)] %>%
    purrr::reduce(`%<%`)
  res()
}

# Combinator of functions that return list
`%<%` <- function(f, g) {
  function() { append(g(), f()) }
}



#' A constructor for a "typed" deparser
#'
#' @param predicate_fun A function that takes a "lang" object and return a logical.
#' @param deparse_fun A function that takes a "lang" object and return a character string.
#' @return A list; a deparser ready to be dispatched by "type".
#'
#' @examples
#' str(make_deparser(predicate_fun = rlang::is_call, deparse_fun = deparse))
#'
#' @export
make_deparser <- function(predicate_fun, deparse_fun) {
  list(predicate = predicate_fun, deparse = deparse_fun)
}


`%&&%` <- function(p1, p2) {
  function(ast) p1(ast) && p2(ast)
}
