% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/utils-helpers.R
\name{local}
\alias{local}
\title{A helper function to enable debugger option}
\usage{
local(x, from_local = TRUE)
}
\arguments{
\item{x}{TRUE / FALSE; whether to attach a debugging console to
the sketch application.}

\item{from_local}{TRUE / FALSE; whether to load the debugger console
from the local package. If FALSE, the console will be loaded from
a Content Delivery Network (CDN) link.}
}
\description{
A helper function to enable debugger option
}
\note{
Use `from_local=TRUE` for self-contained applications, and
`from_local=FALSE` for reduced file size.
}
\examples{
# This function is designed to be used in the configuration header, e.g.
# config(debug = local(TRUE), rules = basic_rules(), deparsers = basic_deparsers())

local(TRUE)

}
