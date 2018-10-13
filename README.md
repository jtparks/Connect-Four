# The Correct Team
ft. Justin Parks, Alison Jones, Arnav Bhutani, and Justin Campbell

## Synopsis
This is a website designed to play a two player game of Connect Four. It is implemented using standard HTML/CSS for the frontend and
JavaScript, node.js, and mongoDB for the backend and database fetching and storing. Run it by entering ```node server.js``` in the
terminal and opening
```localhost:3000``` in your web browser.

## Creation Purpose
This project was created as a final submission for a Web Development class. 

## Brainstorming:

    Something that uses back-end data storage

    Something that any user can use

##### Hangman?

	Page that contains title
		Subpage that takes user-generated words and adds to a database, 
		uses a random one later upon initialization
		


##### Arcade game(s)?
		
    High Scores saved on the back end
    Able to implement a number of games (or backup games)

	create all but the game itself - make a div that has a graphic, but thats it
	

##### Checkers?

	Able to use CSS shapes for the pieces, so it's easier to implement
	Relatively simple rules
	Back end data store could be numbers of wins for a user?


### Connect Four!
	
	Click and drop rules for pieces
	CSS for the "game board"
	Names of who is playing could be stored
	
	
## Known Bugs
- Storage of Names and Scores does not work as intended. Either new names cannot be added to the list of names and scores, or a new name and score would be created every time, regardless if the same name is already on the board.
- If a player wins who is not on the list already, the server crashed on an undefined 'score' read.
- Scores only update on pressing the "New Game" button, rather than on "[player] is the winner"


