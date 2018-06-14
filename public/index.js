//==============VARIABLES==========================//
var stuff = 
{
    blackPlayer: "Player 1",
    redPlayer: "Player 2",

    firstTurn: "black",

    currentPlayerMes: "'s Turn.",
    filled: "This space is full!!!",
    catsGameMes: "The game is a Tie!",
    winner: " is the Winner! ",
};

var winningPlayer = "";

var currentPlayer = stuff.firstTurn;

var gameBoard = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];

//=============END VARIABLES========================//


//==================PROCEDURE================//

//When page is loaded
$(document).ready(function()
{
    //get Names
    stuff.blackPlayer = prompt("Player Black, enter your name.", stuff.blackPlayer);
    stuff.redPlayer = prompt("Player Red, enter your name.", stuff.redPlayer);

    //Initial Message
    $(".suffix").text(stuff.currentPlayerMes);
    $(".player").text(currentPlayerName());


    //When clicked/ Player makes a move
    $(".gameBoard button").click(function()
    {


        //=============================PLACING A PIECE=====================================//
        //get x and y (for piece)
        var yPosition = $(".gameBoard tr").index($(this).closest("tr"));
        var xPosition = $(this).closest("tr").find("td").index($(this).closest("td"));


        //check for availability
        if (spaceFull(yPosition, xPosition) == true ) 
        {
            //error message
            alert(stuff.filled);
            return;
        }

        //We know the spot clicked is free.
        //Are any spaces below it free?
        //move to bottom/ next available
        yPosition = bottomSpace(yPosition, xPosition);

        //place piece
        addPiece(xPosition, yPosition, currentPlayer);

        //update board/ display placed piece
        display();


        //=============================CHECK FOR ENDGAME=====================================//

        //New Game Button is clicked
        $(".newGame").click(function(e) {
            location.reload();
        });

        //Is there a winner?
        if (win() == true) 
        {
            //Get Winner
            $(".suffix").text(stuff.winner);
            $(".player").text(currentPlayerName());
            //No more pieces can be placed.
            $(".gameBoard button").unbind("click");

            //store winner
            winningPlayer = currentPlayerName();
            storeWinnerData(winningPlayer);

            return;
        }
        //Is the board full?
        else if (catsGame() == true) 
        {
            //State catsgame/ no one won.
            $(".message").text(stuff.catsGameMes);
            //No more pieces can be placed.
            $(".gameBoard button").unbind("click");
            winningPlayer = "";
            return;
        }
        //switch current player.
        nextPlayer();
    });

});



//==========================FUNCTIONS==========================//

//==========================PLAYER ATTRIBUTES===================//

//Current Player's Turn
function currentPlayerName()
{
    if (currentPlayer === "black") 
    {
        return stuff.blackPlayer;
    } 
    else 
    {
        return stuff.redPlayer;
    }

}

//Switch player
function nextPlayer()
{
    //switch from current
    if (currentPlayer == "red")
    {
        currentPlayer = "black";
    } 
    else 
    {
        currentPlayer = "red";
    }

    //Get new player name to display
    $(".player").text(currentPlayerName());
}

//=================================BOARD ATTRIBUTES=============================//

//Is a space already taken?
function spaceFull(yPos, xPos)
{
    //get the space clicked and return if it is full
    var clickedSpace = gameBoard [yPos] [xPos];
    if (clickedSpace == 0)
    {
        return false;
    }
    else
    {
        return true;
    }
}

//move a piece to the bottom-most availabe space (dropped)
function bottomSpace(yPos, xPos)
{
    //Starts at the bottom of a column
    //Checks for the lowest available position (all y) 
    //underneath the spot clicked (none above)
    for (var y = 5; y > yPos; y--) 
    {
        //if the space is default 'free' return it's spot
        if (gameBoard [y] [xPos] == 0)
        {
            return y;
        }
    }
    //since y is free, we can return it if no spaces below it are free
    //the clicked spot is the lowest possible placement
    return yPos;
}

//sets gameBoard space to current player color (sets piece to location)
function addPiece(xPosition, yPosition, currentColor) 
{
    gameBoard [yPosition] [xPosition] = currentColor;
}

//Updates the board for the played turn
function display()
{
    //check each space and set the color
    //for all x
    for (var x = 0; x < 7; x++) 
    {
        //for all y
        for (var y = 0; y < 6; y++) 
        {
            //if the space has been chosen
            if (gameBoard[y][x] !== 0)
            {   
                //cell equals current [x] [y]
                var cell = $("tr:eq(" + y + ")").find("td").eq(x);
                cell.children("button").addClass(gameBoard[y][x]);
            }
        }
    }
}


//===================================ENDGAME FUNCTIONS=======================================//

//Is the board full?
function catsGame()
{
    //for all y
    for (var y = 0; y < 6; y++)
    {
        //for all x
        for (var x = 0; x < 7; x++)
        {
            //If any space is free, return false.
            if (gameBoard[y][x] == 0)
            {
                return false;
            }
        }
    }
    //There are no open spaces, return true
    return true;
}

//==============================WIN CHECKING FUNCTIONS====================================//
//is there a winner?
function win()
{
    //horizontal
    if (hWin() == true)
    {
        return hWin();
    }
    //vertical
    else if (vWin() == true)
    {
        return vWin();
    }
    //diagonal
    else if (dWin() == true)
    {
        return dWin();
    }
    //if none
    else
    {
        return false;
    }
}

//Vertical checker
function vWin() 
{
    var prev = 0;
    var current = null;

    var count = 0;

    //look at each column, if theres 4 added return a win
    //for all x
    for (var x = 0; x < 7; x++)
    {
        //for all y
        for (var y = 0; y < 6; y++)
        {
            current = gameBoard [y] [x];
            if (current !== 0 && current == prev)
            {
                count++;
            } 
            else
            {
                //Reset Count
                count = 0;
            }
            if (count == 4 - 1)
            {
                return true;
            }
            prev = current;
        }
        //Reset
        prev = 0;
        count = 0;
    }
    //No win
    return false;
}

//horizontal checker
function hWin()
{
    var prev = 0;
    var current = null;

    var count = 0;

    //look at each row, if theres 4 added return a win
    //for all y
    for (var y = 0; y < 6; y++)
    {
        //for all x
        for (var x = 0; x < 7; x++)
        {
            //looks at each spot on the board
            current = gameBoard [y] [x];
            if (current !== 0 && current == prev)
            {
                count++;
            }
            else
            {
                //Reset to 0 in a row
                count = 0;
            }
            if (count == 4 - 1)
            {
                return true;
            }
            //set previous and go to next number
            prev = current;
        }

        //Reset
        prev = 0;
        count = 0;
    }

    //no Win
    return false;
}



//diagonal checkers
function dWin() 
{
    var prev = 0;
    var current = null;

    var count = 0;

    var x, y, xtemp, ytemp = null;

    //Down Right
    for (x = 0; x < 7; x++)
    {
        xtemp = x;
        ytemp = 0;

        while (xtemp < 7 && ytemp < 6)
        {
            current = gameBoard [ytemp] [xtemp];
            if (current !== 0 && current == prev)
            {
                count++;
            }
            else
            {
                count = 0;
            }
            if (count == 4 - 1)
            {
                return true;
            }
            xtemp++;
            ytemp++;
            prev = current;
        }
        //Reset
        prev = 0;
        count = 0;
    }

    //Down Right (Left sided)
    for (y = 0; y < 6; y++)
    {
        xtemp = 0;
        ytemp = y;

        while (xtemp < 7 && ytemp < 6)
        {
            current = gameBoard [ytemp] [xtemp];
            if (current !== 0 && current == prev)
            {
                count++;
            }
            else
            {
                count = 0;
            }
            if (count == 4 - 1)
            {
                return true;
            }
            xtemp++;
            ytemp++;
            prev = current;
        }
        //Reset
        prev = 0;
        count = 0;
    }

    //Down Left
    for (x = 0; x < 7; x++)
    {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp < 6)
        {
            current = gameBoard [ytemp] [xtemp];
            if (current !== 0 && current == prev)
            {
                count++;
            }
            else
            {
                
                count = 0;
            }
            if (count == 4 - 1)
            {
                return true;
            }
            xtemp--;
            ytemp++;
            prev = current;
        }
        prev = 0;
        count = 0;
    }


    //Down Left (Right sided)
    for (y = 0; y < 6; y++)
    {
        xtemp = 6;
        ytemp = y;
        while (0 <= xtemp && ytemp < 6)
        {
            current = gameBoard [ytemp] [xtemp];
            if (current !== 0 && current == prev)
            {
                count++;
            }
            else
            {
                count = 0;
            }
            if (count == 4 - 1)
            {
                return true;
            }
            xtemp--;
            ytemp++;
            prev = current;
        }
        prev = 0;
        count = 0;
    }

    return false;
}


//====================================ENDGAME STORING==============================//

//function that grabs winner name, winner is the string name of the winning player.
function storeWinnerData(winner)
{
    
}