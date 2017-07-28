// api for alpha Vantage 5X4II9G2P5S3BJ05
// api for quandl YiNzVQcDRbgWz1L_khwj
// api for google static maps AIzaSyA0yW2UESKHwXQ5xOh_JtxK3Vpol722myo

// var apiKey = "5X4II9G2P5S3BJ05";
// var URL = "https://www.alphavantage.co/query?"
var $URL =  "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?"
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


var $searchDataDict = {};
var $splitDataArr;


$(document).ready(function() {
    getCurrentDate();
});

$form.on('submit', function (event){
    event.preventDefault();
    dataDict($dataKeyNameArr);
    setUrl();
});
function getCurrentDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;       
    $("#inputDate2").attr("value", today);
}
function setUrl(arr){
    var completeURL = "https://www.quandl.com/api/v3/datasets/WIKI/"+dataDict($dataKeyNameArr)['tickerName']+".json?column_index=4&start_date="+dataDict($dataKeyNameArr)['startDate']+"&end_date="+dataDict($dataKeyNameArr)['endDate']+'&api_key=YiNzVQcDRbgWz1L_khwj';
    getData(completeURL);
}

function getData(URL){
    var x = $.get(URL);
    x.then( function (data){
        $searchDataDict = data;
        getSplitData();
        console.log(data);
        getCloseStartData();
        getCloseEndData();
        });   
}

function dataDict(arr){
    var userInputDict ={};
    for (var i = 0; i< arr.length; i++){
        userInputDict[arr[i][0]] = arr[i][1].val();
    }
    return userInputDict;
}

function getSplitData(){
var URL = "https://www.quandl.com/api/v3/datasets/WIKI/"+dataDict($dataKeyNameArr)['tickerName']+".json?column_index=7&start_date="+dataDict($dataKeyNameArr)['startDate']+"&end_date="+dataDict($dataKeyNameArr)['endDate']+'&api_key=YiNzVQcDRbgWz1L_khwj';
    var x = $.get(URL)
    x.then( function (data){
        $splitDataArr= data;
        unAdjustforSplit();
        
        console.log(data);
         
        
        // splitCounter()
        // setTimeout(unAdjustforSplit(),3000);
    });
    
}

function getCloseStartData(){
     var x = $searchDataDict.dataset.data.length;
     return $searchDataDict["dataset"]['data'][x-1][1];
}
function getCloseEndData(){
     return $searchDataDict["dataset"]["data"][0][1];
}
function splitCounter(){
    var splitCount=[];
    for (var i = 0; i<$splitDataArr["dataset"]["data"].length;i++){
        if($splitDataArr["dataset"]["data"][i][1] > 1 ){
            splitCount.push($splitDataArr["dataset"]["data"][i][1]);
        }
    }
    console.log(splitCount);
    return splitCount;
    
}
function unAdjustforSplit(){
    // var splitarr = splitCounter();
    var startPrice = getCloseStartData();
    var combine = splitCounter();
    combine.unshift(startPrice);
    var adjustedStartPrice = combine.reduce(function (a,b){
        return a / b;
    });
    return adjustedStartPrice;
    console.log(adjustedStartPrice);
}

function hindsightAmount(){
    return(dataDict($dataKeyNameArr)['amountInvested'] / unAdjustforSplit()) *(getCloseEndData()); 
}

// ------------------------------------------------------------------------
// for bit coin page
var cryptoData;

function getCryptoData(){
    
    var URLETH = "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=7605";
    // var URLETH = "https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=ETH&tsym=USD";
    var URLBTC = "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182";
    var x = $.get(URLETH)
        x.then(function(data){
            cryptoData = data;
            getCryptoInfo(data);
        })
    
    
}
function getCryptoInfo(data){
    console.log(data["Data"]["General"]['Name']);
    console.log(data["Data"]["General"]['Twitter']);
    console.log(data["Data"]["General"]['Description']);
    console.log(data["Data"]["General"]['Features']);
    console.log(data["Data"]["General"]['StartDate']);
    console.log(data["Data"]["ICO"]['StartPrice']);
}


// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=19900101&date.lt=20170601&ticker=MSFT&qopts.columns=date,close,high&api_key=YiNzVQcDRbgWz1L_khwj
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=19900102&date.lt=19900103&ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj

"https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&column_index=7&api_key=YiNzVQcDRbgWz1L_khwj"
// splits https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&column_index=7&api_key=YiNzVQcDRbgWz1L_khwj
// "https://www.quandl.com/api/v3/datasets/WIKI/"+$userInputDict['tickerName']+".json?column_index=4&"+$userInputDict['startDate']+"&"+$userInputDict['endDate']+'&collapse=monthly&&api_key=YiNzVQcDRbgWz1L_khwj';


// https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD gets current price - returns {"USD":195.32}
// https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=7605%tsyms=USD//for ETH
// https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182 //for BTC
// https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=ETH&tsym=USD