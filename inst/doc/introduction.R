## ---- include = FALSE---------------------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>"
)

## ---- eval = FALSE------------------------------------------------------------
#  install.packages("sketch")
#  
#  # Or for the latest development
#  install.packages("devtools")
#  remotes::install_github("kcf-jackson/sketch")

## ---- eval = FALSE------------------------------------------------------------
#  sketch::insert_sketch(
#    file = "main.R", id = "sketch_1",
#    width = 800, height = 600
#  )

## ---- eval = FALSE------------------------------------------------------------
#  #! load_script(src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js")
#  setup <- function() {
#      createCanvas(400, 300)
#  }
#  
#  draw <- function() {
#      background(0, 0, 33)    # RGB colors
#  
#      for (i in 1:3) {
#          dia <- sin(frameCount * 0.025) * 30 * i
#          fill(255, 70 * i, 0)       # RGB colors
#          circle(100 * i, 150, dia)   # (x, y, diameter)
#      }
#  }

## ---- eval = FALSE------------------------------------------------------------
#  # Create a new DOM element with an innerText
#  dom <- function(tag_name, inner_text) {
#      declare (el)   # Declare variable before use
#      el <- document$createElement(tag_name)   # document and its methods are available
#      el$innerText <- inner_text   # attributes work as expected
#      return (el)   # return must be explicit
#  }
#  
#  # Insert a DOM element into another
#  insert_into <- function(x, y) {
#      document$querySelector(y)$appendChild(x)
#  }

## ---- eval = FALSE------------------------------------------------------------
#  #! load_script("helper.R")
#  # Textbox
#  textbox <- dom("div", "Hello World!")
#  
#  # Two buttons
#  button_1 <- dom("button", "1")
#  button_1$onclick <- function() { textbox$innerText <- "Hello again!" }
#  
#  button_2 <- dom("button", "2")
#  button_2$onclick <- function() { textbox$innerText <- "Bye!" }
#  
#  # HTML
#  insert_into(textbox, "body")
#  insert_into(button_1, "body")
#  insert_into(button_2, "body")

## ---- eval = FALSE------------------------------------------------------------
#  declare (x)
#  x <- 3
#  # alternatively
#  let (x = 3)

## ---- eval = FALSE------------------------------------------------------------
#  `%+%` <- paste0
#  "a" %+% "b" %+% "c"  # gives "abc"

