function getPersonName(){


}

function getNumberOfWins(){


}

function getTotalGames(){



} 

function storePerson(personName, numberOfWins, totalGames){
	var request= new XMLHttpRequest();

	var personName=getPersonName();
	var numberOfWins=getNumberOfWins();
	var totalGames=getTotalGames();
	

	var requestURL= personName + numberOfWins + totalGames;
	request.open("POST", requestURL);
	
	//var requestBody=JSON.stringify({
	

}



