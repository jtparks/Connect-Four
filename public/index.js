function storePerson(personName, numberOfWins, totalGames){
	var request= new XMLHttpRequest();

	

	var requestURL= "/data";
	request.open("POST", requestURL);
	
	var requestBody=JSON.stringify({
			
	)};

	request.addEventListener('load', function(event){
		if(event.target.status===200){
			


		}
		else{
			alert("Error storing information");

		}



	}
	
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(requestBody);

}



