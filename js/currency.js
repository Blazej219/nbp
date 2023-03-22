//index.html data
function aDownloadData(currency){
    let url = "http://localhost:8080/currencyRates?currency="+currency;

		$.ajax({
			type: "GET",
            dataType: 'json',
			url: url,
			success: function(data){
			    aDisplayData(data);
			    console.log(data);
                	}
		});
}

//Podstrona. Kursy z NBP(pobieranie danych)
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

//Podstrona. Kursy z NBP (wyświetlanie danych)
function displayData(nbp){
$('.run').empty();
$('#wynik').append("<tr class='run'><td id='cur'>"+nbp.currency+"</td><td id='cod'>"+nbp.code+"</td><td id='ask'>"+nbp.rates[0].ask+"</td><td id='bid'>"+nbp.rates[0].bid+"</td><td id='dat'>"+nbp.rates[0].effectiveDate+
"</td></tr>");
    cur = nbp.currency;
    cod = nbp.code;
    ask = nbp.rates[0].ask;
    bid = nbp.rates[0].bid;
    dat = nbp.rates[0].effectiveDate
    console.log(cur+cod+ask+bid+dat);
}

//zapisywanie danych z API NBP
function saveDataApi(){
  let url = "http://localhost:8080/currencyRates"

		$.ajax({
			type: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({

                    "ask": ask,
                    "bid": bid,
                    "comment": "Dodane z NBP",
                    "createdDate": dat,
                    "currency": cod
                	}),
            url:url,
		});
		alert('Dodano do Bazy');
}

function CreateMyCurs(){
$('#addCurrency').removeClass('showbutton');
}
function Close()
{
   $('#addCurrency').addClass('showbutton');
}

//Dodawanie Własnego kursu recznie
function addMyData(){
  let url = "http://localhost:8080/currencyRates";
  mcod = document.getElementById('code').value;
  mask = document.getElementById('sell').value;
  mbid = document.getElementById('buy').value;
  mdat = document.getElementById('date').value;
  mcom = document.getElementById('comment').value;
  //console.log(mcod+" "+mask+" "+mbid+" "+mdat+" "+mcom);

		$.ajax({
			type: "POST",
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify({

                    "ask": mask,
                    "bid": mbid,
                    "comment": mcom,
                    "createdDate": mdat,
                    "currency": mcod
                	}),
            url:url,
		});
		alert('Dodano do Bazy')
		$('#addCurrency').addClass('showbutton');
}

//Wyświetlanie całej tabeli z serwera
function downloadDataServer(){
    let url = "http://localhost:8080/currencyRates"

		$.ajax({
			type: "GET",
            dataType: 'json',
			url: url,
			success: function(data){

			    console.log(data)
			    displayDataServer(data)
                	}
		});
}

//Podstrona. Kursy z serwera (wyświetlanie danych)
function displayDataServer(apk)
{
 $("#containerTable").removeClass('showbutton');
 $("#resultServer").removeClass('showbutton');
    $('.run').empty();
   for(let i = 0; i < apk.length; i++){
    $("#resultServer").append(("<tr class='run'><td id='cur'>"+apk[i].name+"</td><td id='cod'>"+apk[i].currency+"</td><td id='ask'>"+apk[i].ask+"</td><td id='bid'>"+apk[i].bid+"</td><td id='dat'>"+apk[i].createdDate+
                                  "</td>"+"<td>"+apk[i].comment+"</td>"+"<td>"+apk[i].id+"</td><td><button type=\"button\" onclick=\"deleteOneResult(\'"+apk[i].id+"\')\">DELETE</button></td><td><button class=\"ed\" type=\"button\" onclick=\"editOneResult(\'"+apk[i].id+"\')\">EDIT</button></td></tr>"));
   }
}

//Usunięcie wybranego wiersza.
 function deleteOneResult(identified){
      let url = "http://localhost:8080/currencyRates/"+identified;

  		$.ajax({
  			type: "DELETE",
            dataType: 'json',
  			url: url,
  			success: function(data)
  			    {
  			    console.log(data);
                }
  		});
        sCode();
  }

//szukanie według kodu waluty lub/i daty
function sCode(){
    currencycode = document.getElementById('searchCode').value;
    dfrom = document.getElementById('from').value;
    dto = document.getElementById('to').value;

    if((currencycode=="--") && (dfrom == "") && (dto == ""))
    {
    cCode="";
    datefrom="";
    dateto="";
    }
    else if((dfrom == "") && (dto == ""))
    {cCode="?currency="+currencycode;
     datefrom="";
     dateto="";
     }


    else if ((currencycode=="--") && (dto == ""))
    {
    datefrom = "?createdFrom="+dfrom;
    dateto="";
    cCode="";
    }

    else if((currencycode=="--") && (dfrom == ""))
    {
    dateto = "?createdTo="+dto;
    cCode="";
    datefrom="";
    }
    else if(currencycode=="--")
    {
        datefrom = "?createdFrom="+dfrom;
        dateto = "&createdTo="+dto;
        cCode="";
    }
      else if(datefrom=="")
      {
            datefrom = "";
            dateto = "?createdTo="+dto;
            cCode="&currency="+currencycode;
       }
      else if(dateto=="")
         {
             datefrom = "?createdFrom="+dfrom;
             dateto = "";
             cCode="&currency="+currencycode;
         }


    console.log(datefrom+dateto);
    let url = "http://localhost:8080/currencyRates"+datefrom+dateto+cCode;

 		$.ajax({
 			type: "GET",
             dataType: 'json',
 			url: url,
 			success: function(data){

 			    console.log(data)
 			    displaySCode(data)

                 	}
 		});
 }

 //Podstrona. Kursy z serwera (wyświetlanie danych)
 function displaySCode(apk)
 {
 $("#containerTable").removeClass('showbutton');
 $("#resultServer").removeClass('showbutton');
    $('.run').empty();
    for(let i = 0; i < apk.length; i++){
     $("#resultServer").append(("<tr class='run'><td id='cur"+i+"'>"+apk[i].name+
     "</td><td id='cod"+i+"'>"+apk[i].currency+"</td><td id='ask"+i+"'>"+apk[i].ask+"</td><td id='bid"+i+"'>"+apk[i].bid+"</td><td id='dat"+i+"'>"+apk[i].createdDate+
                               "</td><td>"+apk[i].comment+"</td><td>"+apk[i].id+"</td><td><input type=\"button\" value=\"DELETE\" onclick=\"deleteOneResult(\'"+apk[i].id+"\')\"></td><td><button class=\"ed\" type=\"button\" onclick=\"editOneResult(\'"+apk[i].id+"\')\">EDIT</button></td></tr>"))

    }
 }

 //Edycja jednego wiersza w tabeli (pobieranie danych)
 function editOneResult(edit){
    $('#edition').removeClass('showbutton');
    $('.ed').addClass('showbutton');
    $('#edition').empty();
       let url = "http://localhost:8080/currencyRates/"+edit;

   		$.ajax({
   			type: "GET",
             dataType: 'json',
   			url: url,
   			success: function(data)
   			    {
   			    console.log(data)
   			    newDiv(data);
                 }
   		});

   }

//Edycja jednego wiersza w tabeli (wyskakujące pole edycyjne)
function newDiv(data)
   {$('#edition').append('<form action=\"\">ID:<br><input type=\"text\" value=\"'+data.id+'\" disabled><br>Cena Kupna:<br><input id=\"eask\" type=\"text\" value=\"'+data.ask+'\" required><br>Cena sprzedaży:<br><input id=\"ebid\" type=\"text\" value=\"'+data.bid+'\"required><br>Data Kursu:<br><input id=\"edat\" type=\"text\" value=\"'+data.createdDate
+'\" required><br>Kod Waluty:<br><input id=\"ecod\" type=\"text\" value=\"'+data.currency+'\" required><br>Komentarz:<br><input id=\"ecom\" type=\"text\" value=\"'+data.comment+'\" required><br><br><input class=\"btn btn-secondary btn-outline-info btn-lg\" value=\"Zapisz\" onclick=\"SaveData(\''+data.id+'\')\"><br><br><input type=\"button\" class=\"btn btn-secondary btn-outline-info btn-lg\" value=\"Zamknij bez zmian\" onclick=\"closeDiv()\"><form>');
}

//Edycja jednego wiersza w tabeli (zapis danych)
function SaveData(data)
{
    $('.ed').removeClass('showbutton');
    $('#edition').addClass('showbutton');
    //console.log(data);

   let url = "http://localhost:8080/currencyRates/"+data;
   ecod = document.getElementById('ecod').value;
   eask = document.getElementById('eask').value;
   ebid = document.getElementById('ebid').value;
   edat = document.getElementById('edat').value;
   ecom = document.getElementById('ecom').value;

   console.log(ecod+" "+eask+" "+ebid+" "+edat+" "+ecom);

 		$.ajax({
 			type: "PUT",
             dataType: 'json',
             contentType: "application/json",
             data: JSON.stringify({

                     "ask": eask,
                     "bid": ebid,
                     "comment": ecom,
                     "createdDate": edat,
                     "currency": ecod
                 	}),
             url:url,
             success: function(data)
            {
            console.log(ecod+" "+eask+" "+ebid+" "+edat+" "+ecom);
            alert('Wykonano Zmiany');
            ;      }

 		});
sCode()
 }

//Edycja jednego wiersza w tabeli (rezygnacja)
 function closeDiv()
 {
    $('.ed').removeClass('showbutton');
    $('#edition').addClass('showbutton');
    downloadDataServer();
 }


