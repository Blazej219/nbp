function CloseChart()
{
   $('.CanvasContainer').addClass('showbutton');
   $('.CanvasContainera').addClass('showbutton');
   $('#showCanvas').removeClass('showbutton');
}

//Zliczanie, ile jest wyników każdej waluty.
const lengCurr= [];
 function dataCanvas(){
       $('#showCanvas').addClass('showbutton');
       $('.CanvasContainer').removeClass('showbutton');
       $('.CanvasContainer').empty();
       $('.CanvasContainera').empty();
       $('.CanvasContainer').append('<a onclick="CloseChart()" class="close"><b>X</b></a><h2>Wykres Przedstawia ilość danych z każdej waluty</h2><canvas id="myData"></canvas>')

     const curr=['AUD', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HUF', 'JPY', 'NOK', 'UAH', 'USD' ];

     for (let it=0; it<curr.length; it++ ){
     let url = "http://localhost:8080/currencyRates?currency="+curr[it]

 		$.ajax({
 			type: "GET",
             dataType: 'json',
 			url: url,
 			success: function(data){
 			    lengCurr[it] =data.length;
                if(it==curr.length-1){
                    showCanvas()
                };
                 	}
 		});}


	}

//Wyświetlanie Wykresu kołowego
 function showCanvas(){
   const ctx = document.getElementById('myData');

   new Chart(ctx, {
     type: 'pie',
     data: {
       labels: ['AUD', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HUF', 'JPY', 'NOK', 'UAH', 'USD' ],
       datasets: [{
         label: 'Ilość kursów w naszej bazie',
         data:lengCurr,
         borderWidth: 1
       }]
     },
     options: {
       scales: {
         y: {
           beginAtZero: false
         }
       }
     }
   });
 }

let code=""
 function aDownloadData(currency){
        code=""
        let url = "http://localhost:8080/currencyRates?currency="+currency;

    		$.ajax({
    			type: "GET",
                dataType: 'json',
    			url: url,
    			success: function(data){
    			unsortJson = data;
    			sortJson = unsortJson.sort(function (a, b){
    			    if(a.createdDate>b.createdDate){
    			    return 1;
    			    }
    			    if (a.createdDate < b.createdDate){
    			   return -1;
    			    }
    			     return 0;
    			     });

    			    aDisplayData(data);
    			    console.log(data)
    			    code = currency;
    			    console.log(code);
                    	}
    		});
    }

function aDisplayData(dataa){
        if(dataa.length != 0){
        console.log(dataa);
        $('.CanvasContainer').empty();
        $('.CanvasContainera').empty();
        $('#myData2').empty();
        $('.CanvasContainera').removeClass('showbutton');
        $('.CanvasContainera').append('<a onclick="CloseChart()" class="close"><b>X</b></a><h2>Wartość waluty <input type="text" id="codecurr" disabled value="'+dataa[0].currency+'"></h2><label>Data od: <input onchange="selectDateChart()" type="date" id="chartFrom"></label><label> Do: <input onchange="selectDateChart()" type="date" id="chartTo"></label><canvas id="myData2"></canvas>')
        cFrom = document.getElementById('chartFrom').value;
        cTo = document.getElementById('chartTo').value;

        const cdate = [];
        for (let i = 0; i < dataa.length; i++){
        cdate[i]=dataa[i].createdDate};

        const cask = [];
        for (let i = 0; i < dataa.length; i++){
        cask[i]=dataa[i].ask};

        const cbid = [];
        for (let i = 0; i < dataa.length; i++){
        cbid[i]=dataa[i].bid};

        const ctx = document.getElementById('myData2');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: cdate,
      datasets: [{
        label: 'sprzedaż',
        data: cask,
        borderColor: '#ff0000',
        borderWidth: 3
      },
      {
              label: 'kupno',
              data: cbid,
              borderColor: '#00FF00',
              borderWidth: 3
            }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
else if(dataa.length == 0)
{
        $('.CanvasContainer').empty();
        $('.CanvasContainera').empty();
        $('#myData2').empty();
        $('.CanvasContainera').removeClass('showbutton');
        $('.CanvasContainera').append('<h2>Brak wybranej waluty w bazie danych!</h2>Wybierz inną walutę!')
;
}
}

    function selectDateChart(){

    datefrom = document.getElementById('chartFrom').value;
    dateto = document.getElementById('chartTo').value;
    codecur = document.getElementById('codecurr').value;
    console.log(codecur);

    if(dateto == "")
    {
    datefrom = "?createdFrom="+datefrom;
    dateto="";
    }

    else if(datefrom == "")
    {
    dateto = "?createdTo="+dateto;
    datefrom="";
    }
    else if((datefrom!= "") && (dateto!= ""))
    {
    datefrom = "?createdFrom="+datefrom;
    dateto = "&createdTo="+dateto;}



    //console.log(datefrom+dateto);
    let url = "http://localhost:8080/currencyRates"+datefrom+dateto+"&currency="+codecur;

 		$.ajax({
 			type: "GET",
             dataType: 'json',
 			url: url,
 			success: function(data){
 			unsortJson = data;
            sortJson = unsortJson.sort(function (a, b){
                			    if(a.createdDate>b.createdDate){
                			    return 1;
                			    }
                			    if (a.createdDate < b.createdDate){
                			   return -1;
                			    }
                			     return 0;
                			     });

 			    //console.log(data)
 			    aDisplayData(data)

                 	}
 		});
 }


