var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");

init();

function init() {
  modeListeners();
  squareListeners();
  reset();
}

function modeListeners() {
  //mode buttons event listener
  for(var i = 0; i<modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function() {
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent==="Easy" ? numSquares = 3: numSquares = 6;
      reset();
    });
  };
}

function squareListeners() {
  //set up squares listeners
    for (var i = 0; i<squares.length; i++) {
      //add click listeners to squares
      squares[i].addEventListener("click", function() {
        //grab color of clicked squares
        var clickedColor =  this.style.backgroundColor;
        //compare color to pickedColor
        if (clickedColor === pickedColor) {
          messageDisplay.textContent = "Correct!"
          changeColors(clickedColor);
          h1.style.backgroundColor = clickedColor;
          resetBtn.textContent = "Play Again?";
        } else {
          this.style.backgroundColor = "#232323";
          messageDisplay.textContent = "Try Again"
        }
      })
    };
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for(var i = 0; i<squares.length; i++) {
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  //reset h1 bg color
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = '';
  resetBtn.textContent = "New Colors";
}

resetBtn.addEventListener("click", function() {
  reset();
});

function changeColors(color) {
  //loop through squares
  for(var i=0; i < colors.length; i++) {
    //change each color to match given color
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to array
  for (var i = 0; i < num; i++) {
  //get random color and push into arr
  arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor() {
  //pick a red from 0 to 255
  var r = Math.floor(Math.random() * 256);
  //pick a green from 0 to 255
  var g = Math.floor(Math.random() * 256);
  //pick a blue from 0 to 255
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
