// api for alpha Vantage 5X4II9G2P5S3BJ05
// api for quandl YiNzVQcDRbgWz1L_khwj

var apiKey = "5X4II9G2P5S3BJ05";
// var URL = "https://www.alphavantage.co/query?"
var URL =  "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?"
var $form = $('[data-stock-order="form"]');
var $tickerName = $('[data-role="ticker-name"]');
var $timeInterval = $('[data-role="time-interval"]');
var $amountInvested = $('[data-role="amount-invested"]');
var $startDate = $('[data-role="start-date"]');
var $endDate = $('[data-role="end-date"]');
var $dataKeyNameArr = [ ['tickerName', $tickerName], 
                        // ['timeInterval' , $timeInterval],
                        ['amountInvested' , $amountInvested],
                        ['startDate', $startDate],
                        ['endDate', $endDate],
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
        console.log(getCloseStartData($startDate.val()));
        console.log(getCloseEndData($endDate.val()));

        });   
}
$(document).ready(function() {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $("#inputDate2").attr("value", today);
});

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
    // var completeURL= URL+'function='+$userInputDict['timeInterval']+"&symbol="+$userInputDict['tickerName']+"&apikey="+apiKey;
    var completeURL= URL+'date.gte='+$userInputDict['startDate']+"&date.lte="+$userInputDict['endDate']+"&ticker="+$userInputDict['tickerName']+"&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj";
    $completeURL = completeURL;
    return completeURL;
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
function getCloseStartData(startDateVal){
    var formatedDate = startDateVal
     return $searchDataDict["Time Series (Daily)"][startDateVal]['4. close'];
}
function getCloseEndData(EndDateVal){
     return $searchDataDict["Time Series (Daily)"][EndDateVal]['4. close'];
}

// HH - hitting submit will run function getData. This will populate the $searchDataDict var
// to search through dict -  $searchDataDict["Monthly Time Series"]['2000-02-29']

// Object {1. open: "98.5000", 2. high: "110.0000", 3. low: "88.1200", 4. close: "89.3700", 5. volume: "1334487600"}
//$searchDataDict["Monthly Time Series"][($startDate.val())]['1. open'];
//$searchDataDict["Time Series (Daily)"][($startDate.val())]['1. open'];

// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=19900101&date.lt=20170601&ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=19900102&date.lt=19900103&ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj