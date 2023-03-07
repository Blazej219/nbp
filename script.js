function downloadDate(currency){
    let url = "http://api.nbp.pl/api/exchangerates/tables/{table}/last/{topCount}/?format=json/"
    //TODO: move this method to separate function
		$.ajax({
			type: "GET",
             dataType: 'json',

			url: url,
			success: function(data){
			    console.log('data', data)
			}
		});
}