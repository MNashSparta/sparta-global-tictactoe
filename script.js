// Variables
var squares = document.getElementsByTagName('td');
var currentTurn = false;
var drawCounter = 0;

// Functions

playerTurn();

function clickSquare() {

  if ($(this).text().length == 0) {
    this.innerHTML = "X";
    decideWinner();
  }
  else {
    console.log("invalid move");
  }
}

function playerTurn() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', clickSquare);
  }
  currentTurn = false;
}

function computerTurn() {
  computerChoice = Math.floor(Math.random()*9)
  currentTurn = true;

  if ($(squares[computerChoice]).text().length === 0) {
    squares[computerChoice].innerHTML = "O";
    decideWinner();
  } else {
    computerTurn();
  }
}

function decideWinner() {
  var winner = false;

  // check rows
  for (var i = 0; i < 7; i = i + 3) {
    if(squares[i].innerHTML === squares[i+1].innerHTML && squares[i].innerHTML === squares[i+2].innerHTML && (squares[i].innerHTML === "O" || squares[i].innerHTML === "X" )) {
      winner = true;
    }
  }

  /// Check columns
  for (var i = 0; i < 3; i++) {
    if(squares[i].innerHTML === squares[i+3].innerHTML && squares[i].innerHTML === squares[i+6].innerHTML && (squares[i].innerHTML === "O" || squares[i].innerHTML === "X" )) {
      winner = true;
    }
  }

  // Check diagonally
  // Unable to work for second loop.  (8 - i)  or (i + 2 * j) still equal 8
  //for (var i = 0, j = 4; i < 3; i = i + 2, j = j - 2) {
  //  console.log(squares[i + 2*j].innerHTML);
  //  if (squares[i].innerHTML === squares[4].innerHTML && squares[4].innerHTML === squares[i + 2*j].innerHTML && squares[i].innerHTML === ("X" || "O")) {
  //    winner = true;
  //  }

  if (((squares[4].innerHTML === "O" || squares[4].innerHTML === "X" ) && squares[0].innerHTML === squares[4].innerHTML && squares[4].innerHTML === squares[8].innerHTML)||((squares[4].innerHTML === "O" || squares[4].innerHTML === "X" ) && squares[2].innerHTML === squares[4].innerHTML && squares[4].innerHTML === squares[6].innerHTML)) {
    winner = true;
  }

  //Check draw
  for (var i = 0; i < squares.length; i++) {
    if($(squares[i]).text().length != 0) {
      drawCounter++;

    }
  }

  // Check for a winner or a draw
  if (winner || drawCounter === 8) {
    annouceResult();
  }
  else {
    drawCounter = 0;
    if (currentTurn === true){
      playerTurn();
    }
    else {
      computerTurn();
    }
  }
}

function resetBoard() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].innerHTML = "";
  }

}

function annouceResult() {
  if(drawCounter === 8) {
    $('playerTurn').html("draw!");
  }
  else if(!currentTurn){
    $('#playerTurn').html("WINNER!");
  }
  else {
    $('#playerTurn').html("loser!");
  }
}
