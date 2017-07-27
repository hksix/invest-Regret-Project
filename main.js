// api for alpha Vantage 5X4II9G2P5S3BJ05
var apiKey = "5X4II9G2P5S3BJ05";
var URL = "https://www.alphavantage.co/query?"
var $form = $('[data-stock-order="form"]');
var $tickerName = $('[data-role="ticker-name"]');
var $timeInterval = $('[data-role="time-interval"]');
var $dataKeyNameArr = [ ['tickerName', $tickerName], 
                        ['timeInterval' , $timeInterval],
                        ];
var $userInputArr = [];
var $userInputDict= {};
var $completeURL;
var $searchDataDict = {};

// HH - example url https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=5X4II9G2P5S3BJ05

// HH - timeInterval choices = ['function=TIME_SERIES_INTRADAY', 'function=TIME_SERIES_DAILY', 'function=TIME_SERIES_WEEKLY', 'function=TIME_SERIES_MONTHLY'];
// HH - ticker example for URL = "symbol=MSFT";


function getData(URL){
    var x = $.get(URL);
    x.then( function (data){
        $searchDataDict = data;
        console.log(data);
        })   
}

$form.on('submit', function (event){
    event.preventDefault();
    setItemToLocal($dataKeyNameArr);
    dataDict($dataKeyNameArr);
    // // sendDataToServer($userInputDict);
    // localStorage.setItem("order", $dataKeyNameArr);
    arrMaker($dataKeyNameArr);
    // appendOrderToHTML($userInputDict);
    // getOrdersFromAPI();
    setUrl($userInputDict);
    getData($completeURL);
});

function setItemToLocal(arr){
    for (var i= 0; i<arr.length; i++){
            localStorage.setItem(arr[i][0], arr[i][1].val());
        
    }
}
function arrMaker(arr){
    for (var i= 0; i<arr.length; i++){
        $userInputArr.push(arr[i][0], arr[i][1].val());
    } 
    return $userInputArr;
}
function setUrl(arr){
    var completeURL= URL+'function='+$userInputDict['timeInterval']+"&symbol="+$userInputDict['tickerName']+"&apikey="+apiKey;
    $completeURL = completeURL;
    console.log (completeURL);
}
function dataDict(arr){
    for (var i = 0; i< arr.length; i++){
        $userInputDict[arr[i][0]] = arr[i][1].val();
    }
}

function getServerData(){
    $.get($completeURL, function (data){
        console.log(JSON.stringify(data));
    });
}

// HH - hitting submit will run function getData. This will populate the $searchDataDict var
// to search through dict -  $searchDataDict["Monthly Time Series"]['2000-02-29']

// Object {1. open: "98.5000", 2. high: "110.0000", 3. low: "88.1200", 4. close: "89.3700", 5. volume: "1334487600"}

	// $(document).ready(function(){
	// 	var date_input=$('input[name="date"]'); //our date input has the name "date"
	// 	var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
	// 	date_input.datepicker({
	// 		format: 'mm/dd/yyyy',
	// 		container: container,
	// 		todayHighlight: true,
	// 		autoclose: true,
	// 	})
	// })
