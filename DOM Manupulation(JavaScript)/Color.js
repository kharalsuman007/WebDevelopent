var colors;
var correctColor;
var numOfSquares = 6;
var bodyColor = "rgb(22, 22, 22)";

var squares = document.querySelectorAll(".square");
var heading = document.querySelector("h1");
var userAnswer = document.getElementById("userAnswer");
var correctRgbText = document.querySelector("#correctRGB");
var playAgainButton = document.querySelector("#playagain");
var difficultyMode = document.querySelectorAll(".modes");

initialize();

function initialize()
{
    initializeSquares();
    initalizeDifficulty();
    reset();
}

function reset()
{
    colors = generateRandomRGB(numOfSquares);
    correctColor = colors[randomIndex()];
    correctRgbText.textContent = correctColor.toUpperCase();
    heading.style.backgroundColor = "slateblue";
    userAnswer.textContent = "";
    for (var i = 0; i < squares.length; i++)
    {
        console.log(colors[i]);
        // Adding the background color
        if(colors[i])
        {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }      
        else
        {
            squares[i].style.display = "none";
        }
    }
    
}

function initializeSquares()
{
    for (var i = 0; i < squares.length; i++)
    {
        // Adding event listener to each element
        squares[i].addEventListener("click" , function()
        {
            if(this.style.backgroundColor === correctColor)
            {
                userAnswer.textContent = "Correct";
                changeColors(this.style.backgroundColor);
                heading.style.backgroundColor = this.style.backgroundColor;               
            }
            else
            {
                userAnswer.textContent = "Wrong";
                this.style.background = bodyColor;
            } 
        }
        );
    }
}

playAgainButton.addEventListener("click" , reset);

function initalizeDifficulty()
{
    for (var i = 0; i < difficultyMode.length; i++)
    {
        difficultyMode[i].addEventListener("click" , function()
        {
            difficultyMode[0].classList.remove("selected");
            difficultyMode[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numOfSquares = 3 :numOfSquares = 6;
            reset();
        });
    }
}

function changeColors(color)
{
    for (var i= 0 ; i< squares.length ; i++)
    {
        squares[i].style.backgroundColor = color;
    }
}

function randomIndex()
{
   return Math.floor(Math.random() * colors.length);
}

function generateRandomRGB(number)
{
   var arry = [];
   for(var i = 0 ; i<number ; i++)
   {
     arry.push(randomColor());
   }
   return arry;
}

function randomColor()
{
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

