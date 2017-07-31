// api for alpha Vantage 5X4II9G2P5S3BJ05
// api for quandl YiNzVQcDRbgWz1L_khwj
// api for google static maps AIzaSyA0yW2UESKHwXQ5xOh_JtxK3Vpol722myo

// var apiKey = "5X4II9G2P5S3BJ05";
// var URL = "https://www.alphavantage.co/query?"
var $URL =  "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?"
var $stockForm = $('[data-stock-order="form1"]');
var $coinForm = $('[data-stock-order="form2"]');
var $tickerName = $('[data-role="ticker-name"]');
var $timeInterval = $('[data-role="time-interval"]');
var $amountInvested = $('[data-role="amount-invested"]');
// var $amountInvestedCoin = $('[data-role="amount-invested-coin"]');
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

$stockForm.on('submit',function (event){
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
        // if ($startDate.val() === ""){
        // $startDate.text($data["dataset"]['data'][xlength-1][0]);
        // }  
         
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
    return $.get(URL)
        .then( function (data){
        $splitDataArr= data;
        unAdjustforSplit();
        hindsightAmount();
        getGraphData();
        // console.log(data);
        return data;
        
        // splitCounter()
        // setTimeout(unAdjustforSplit(),3000);
    });
    
}
// fucntion getFormatedData(URL){
//     return $.get(URL);
//         .then( function  (data){
//             return data.filter(blahdahd)
//         })
// }
// getFormatedData(dad)
//     .then
function getCloseStartData(){
     var x = $searchDataDict.dataset.data.length;
     return $searchDataDict["dataset"]['data'][x-1][1];
}
function getCloseEndData(){
    $('#current-price-box').text("Current Price: "+"$"+ $searchDataDict["dataset"]["data"][0][1])
     return $searchDataDict["dataset"]["data"][0][1];
}
function splitCounter(){
    var splitCount=[];
    for (var i = 0; i<$splitDataArr["dataset"]["data"].length;i++){
        if($splitDataArr["dataset"]["data"][i][1] > 1 ){
            splitCount.push($splitDataArr["dataset"]["data"][i][1]);
        }
    }
    $('#split-share-box').text(dataDict($dataKeyNameArr)['tickerName'] +" has split " +splitCount.length + " times since you bought in.");

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
    console.log('unadjusted start Price' + adjustedStartPrice);
    return adjustedStartPrice;
    
}

function hindsightAmount(){
    var worth = (dataDict($dataKeyNameArr)['amountInvested'] / unAdjustforSplit()) *(getCloseEndData());
    worth = Number(worth.toFixed(2));
    $('#net-worth-circle-text').text("$"+worth);
    // console.log((dataDict($dataKeyNameArr)['amountInvested'] / unAdjustforSplit()) *(getCloseEndData()));
    return(dataDict($dataKeyNameArr)['amountInvested'] / unAdjustforSplit()) *(getCloseEndData()); 
    
}
function getGraphData(){
    var temp=[];
    var URL = 'https://www.quandl.com/api/v3/datasets/WIKI/'+dataDict($dataKeyNameArr)['tickerName']+'?&collapse=annual&column_index=4&api_key=YiNzVQcDRbgWz1L_khwj';
    $.get(URL)
        .then(function(data) {
            temp = data;
            getDataPlots(data)
            });
        
}       
function getDataPlots(list){
    var endYear = dataDict($dataKeyNameArr)['endDate'];
    var endOfXAxis = endYear.slice(0,4);
    var xlength = $searchDataDict.dataset.data.length;
    var startyear = $searchDataDict["dataset"]['data'][xlength-1][0];
    var startofXAxis = Number(startyear.slice(0,4));
    var x = [];
    for(var i = startofXAxis; i<=endOfXAxis; i++){
        x.push(i);
    }
    console.log(x);
    var y= [];

    list['dataset']['data'].forEach(function (month){
    y.push(month[1]);

    });
 
    makeGraph(x,y.reverse());
}
function makeGraph(x,y){
var largest = Math.max.apply(null, y);
    var options = {
        high: Number(largest),
    };
    var data = {
      // A labels array that can contain any sort of values
    //   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    labels: x,
      // Our series array that contains series objects or in this case series data arrays
      series: [
        y
      ]
    };
    new Chartist.Line('.ct-chart', data,options );
}

// ------------------------------------------------------------------------
// for bit coin page
var $coinName = $('[data-role="coin-name"]');
var $amountInvestedCoin = $('[data-role="amount-invested-coin"]');

$coinForm.on('submit',function (event){
    event.preventDefault();
    getCryptoData();   
});


function getCryptoData(){
    var coinName = $coinName.val();
    var amountInvested =$amountInvestedCoin.val();
    var URLinfo;
    var URLprices;
    var startPrice;
    theCoin = new Coin(coinName);
    if (coinName === "ETH"){
        URLinfo = "https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=7605";
        URLprices ="https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=724&aggregate=1";
        startPrice = 0.71;
    }
    if (coinName === "BTC"){
        URLinfo = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182';
        URLprices = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=2500&aggregate=1';
        startPrice = 68.08;
    }
    theCoin.setStarting(startPrice);
    theCoin.setShares(amountInvested);
    theCoin.setCurrent()
    theCoin.getInfo(URLinfo)
        .then(function (){
            setCryptoInfo();
        });
}

    
function setCryptoInfo(){
    $('#coin-price').html("Current Price:" +"<br>"+ "$"+ theCoin.currentPrice);
    $('#twitter-handle').text("Twitter: " + theCoin.twitterHandle);
    $('#coin-info').html(theCoin.coinInfo);
    $('#coin-start-date').text("Inception Date: "+theCoin.startDate);
    $('#coin-net-worth-circle-text').text("$" + Math.floor(Number(theCoin.shares * theCoin.currentPrice)));
}



function Coin(coinName){
    this.coinName = coinName;
}

Coin.prototype.setStarting = function(startingPrice){
    this.starting =startingPrice;   
}
Coin.prototype.setCurrent = function(){
    return $.get("https://min-api.cryptocompare.com/data/price?fsym="+this.coinName+"&tsyms=USD").then(function (data){
        this.currentPrice = data['USD'];
        return Number(this.currentPrice);
    }.bind(this));
}
Coin.prototype.setShares = function(amountInvested){
    this.shares = Number(amountInvested / this.starting);   
}
Coin.prototype.getInfo= function(URL){
    return $.get(URL)
        .then(function(data){
            this.twitterHandle = data["Data"]["General"]['Twitter'];
            this.coinInfo = $(data["Data"]["General"]['Description'])[0]["innerHTML"];
            this.startDate = data["Data"]["General"]['StartDate'];
        }.bind(this));
}





"https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&column_index=7&api_key=YiNzVQcDRbgWz1L_khwj"
// splits https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&column_index=7&api_key=YiNzVQcDRbgWz1L_khwj
// "https://www.quandl.com/api/v3/datasets/WIKI/"+$userInputDict['tickerName']+".json?column_index=4&"+$userInputDict['startDate']+"&"+$userInputDict['endDate']+'&collapse=monthly&&api_key=YiNzVQcDRbgWz1L_khwj';
// https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&collapse=annual&column_index=4&api_key=YiNzVQcDRbgWz1L_khwj

// https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD gets current price - returns {"USD":195.32}
// https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=7605%tsyms=USD//for ETH
// https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182 //for BTC
// https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=ETH&tsym=USD
// for all BTC price info https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=2500&aggregate=1
// for all ETH price info https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=724&aggregate=1

