% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/interface-source_file.R
\name{source_js}
\alias{source_js}
\title{Serve a compiled 'sketch' JavaScript file}
\usage{
source_js(file, debug = FALSE, asset_tags = default_tags(), launch_browser)
}
\arguments{
\item{file}{A character string; path to the compiled JS file.}

\item{debug}{TRUE or FALSE; if TRUE, a console for debugging is attached to your app.}

\item{asset_tags}{An optional list of 'shiny.tag' objects to be added to the html
template. The list must have signature / structure of a named list:
    \code{[head = [shiny.tag], body = [shiny.tag]]},
containing the \code{head} and \code{body} elements, each of which is a
list of \code{shiny.tag} object.}

\item{launch_browser}{A character string; "viewer" or "browser", which
calls `rstudioapi::viewer` and `utils::browseURL` respectively; use
NULL to suppress display.}
}
\description{
Serve a compiled 'sketch' JavaScript file
}
\examples{
\dontrun{
file <- system.file("test_files/test_source.js", package = "sketch")
# The next line launches the default HTML browser
source_js(file, debug = TRUE, launch_browser = "browser")
}
}
