function downloadData(currency){
    let url = "http://api.nbp.pl/api/exchangerates/rates/c/"+currency+"/?format=json"

		$.ajax({
			type: "GET",
            dataType: 'json',
			url: url,
			success: function(data){

			    console.log(data)
			    displayData(data)

                	}
		});
}
function displayData(nbp){
$('#wynik').append("<tr><td>"+nbp.currency+"</td><td>"+nbp.code+"</td><td>"+nbp.rates[0].ask+"</td><td>"+nbp.rates[0].bid+"</td><td>"+nbp.rates[0].effectiveDate+
"</td></tr>");
}

function aDownloadData(currency){
    let url = "http://api.nbp.pl/api/exchangerates/rates/c/"+currency+"/?format=json"

		$.ajax({
			type: "GET",
            dataType: 'json',
			url: url,
			success: function(data){

			    console.log(data)
			    aDisplayData(data)

                	}
		});
}
function aDisplayData(a){
    alert("Nazwa: "+a.currency+
    "\nKod: "+a.code+
    "\nSprzedaż: "+a.rates[0].ask+
    "\nKupno: "+a.rates[0].bid+
    "\nZ dnia: "+a.rates[0].effectiveDate);
}