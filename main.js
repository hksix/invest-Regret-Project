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
var $startDate = $('[data-role="start-date"]');
var $endDate = $('[data-role="end-date"]');
var $dataKeyNameArr = [ ['tickerName', $tickerName], 
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
    getData();
    
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
function dataDict(arr){
    var userInputDict ={};
    for (var i = 0; i< arr.length; i++){
        userInputDict[arr[i][0]] = arr[i][1].val();
    }
    return userInputDict;
}


function getData(URL){
    var completeURL = "https://www.quandl.com/api/v3/datasets/WIKI/"+dataDict($dataKeyNameArr)['tickerName']+".json?column_index=4&start_date="+dataDict($dataKeyNameArr)['startDate']+"&end_date="+dataDict($dataKeyNameArr)['endDate']+'&api_key=YiNzVQcDRbgWz1L_khwj';
    var x = $.get(completeURL);
    x.catch(function (){
        window.alert("404: Ticker Name Not Found - Please try again");
    })
    x.then( function (data){
        $searchDataDict = data;
        getSplitData();
        });   
}

function getSplitData(){
var URL = "https://www.quandl.com/api/v3/datasets/WIKI/"+dataDict($dataKeyNameArr)['tickerName']+".json?column_index=7&start_date="+dataDict($dataKeyNameArr)['startDate']+"&end_date="+dataDict($dataKeyNameArr)['endDate']+'&api_key=YiNzVQcDRbgWz1L_khwj';
    return $.get(URL)
        .then( function (data){
        $splitDataArr= data;
        // unAdjustforSplit();
        hindsightAmount();
        getGraphData();
        return data;
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
    var splitDates=[];
    for (var i = 0; i<$splitDataArr["dataset"]["data"].length;i++){
        if($splitDataArr["dataset"]["data"][i][1] > 1 ){
            splitCount.push($splitDataArr["dataset"]["data"][i][1]);
        }
    }
    return splitCount;
}

function unAdjustforSplit(start){
    var startPrice = start;
    var combine = splitCounter();
    combine.unshift(startPrice);
    var adjustedStartPrice = combine.reduce(function (a,b){
        return a / b;
    });
    return adjustedStartPrice;
}

function hindsightAmount(){
    var worth = (dataDict($dataKeyNameArr)['amountInvested'] / unAdjustforSplit(getCloseStartData())) *(getCloseEndData());
    worth = Number(worth.toFixed(2));
    return worth;
}

function setToScreen(){
    $('#net-worth-circle-text').text("$"+hindsightAmount());
    $('#split-share-box').text(dataDict($dataKeyNameArr)['tickerName'] +" has split " +splitCounter().length + " times since you bought in.");
    $('#current-price-box').text("Current Price: "+"$"+ getCloseEndData());
}

function getGraphData(){
    var URL = 'https://www.quandl.com/api/v3/datasets/WIKI/'+dataDict($dataKeyNameArr)['tickerName']+'?&collapse=annual&column_index=4&api_key=YiNzVQcDRbgWz1L_khwj';
    $.get(URL)
        .then(function(data) {
            getDataPlots(data)
            setToScreen()
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
    var y= [];
    var comp = list['dataset']['data'];

    var first5 = comp.slice(comp.length/2);
    first5 = first5.reverse();
    var remd = comp.slice(0,comp.length/2);
    remd = remd.reverse();
    first5.forEach(function (month){   
        y.push(unAdjustforSplit(month[1]));
    });
    remd.forEach(function (month){
        y.push(month[1]);
    });
    makeGraph(x,y);
}
function makeGraph(x,y){
var largest = Math.max.apply(null, y);
    var options = {
        high: Number(largest),
        axisX: {
        // We can disable the grid for this axis
            showGrid: true,
    // and also don't show the label
            showLabel: false
        }
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
        imgSrc = "https://maxcdn.icons8.com/Share/icon/color/Logos//ethereum1600.png"
        startPrice = 0.71;
    }
    if (coinName === "BTC"){
        URLinfo = 'https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182';
        URLprices = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=2500&aggregate=1';
        imgSrc = "http://icons.iconarchive.com/icons/paomedia/small-n-flat/512/bitcoin-icon.png";
        startPrice = 68.08;
    }
    theCoin.setStarting(startPrice);
    theCoin.setImg(imgSrc);
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
    if (theCoin["coinName"]=== "ETH"){
        $('#coin-info').text("Ethereum is an open software platform based on blockchain technology that enables developers to build and deploy decentralized applications.");
    }else{ 
        $('#coin-info').html(theCoin.coinInfo);
    }
    $('#coin-start-date').text("Inception Date: "+theCoin.startDate);
    $('#coin-net-worth-circle-text').text("$" + Math.floor(Number(theCoin.shares * theCoin.currentPrice)));
    $('#coin-img').attr('src', theCoin.imgSrc);
}



function Coin(coinName){
    this.coinName = coinName;
}

Coin.prototype.setStarting = function(startingPrice){
    this.starting =startingPrice;   
}
Coin.prototype.setImg = function(imgSrc){
    this.imgSrc = imgSrc;
}
Coin.prototype.setCurrent = function(){
    return $.get("https://min-api.cryptocompare.com/data/price?fsym="+this.coinName+"&tsyms=USD").then(function (data){
        this.currentPrice = data['USD'];
        return Number(this.currentPrice);
    }.bind(this));
}
Coin.prototype.setShares = function(amountInvested){
    this.shares = Number(amountInvested/this.starting);   
}
Coin.prototype.getInfo= function(URL){
    return $.get(URL)
        .then(function(data){
            this.twitterHandle = data["Data"]["General"]['Twitter'];
            this.coinInfo = $(data["Data"]["General"]['Description'])[0]["innerHTML"];
            this.startDate = data["Data"]["General"]['StartDate'];
        }.bind(this));
}



// / Scroll magic
$(document).ready(function(){
   var controller = new ScrollMagic.Controller();
   var ourScene = new ScrollMagic.Scene({
       triggerElement: ".header1"

  })
   .setClassToggle('.header1', 'fade-in')
   // .addIndicators()
   .addTo(controller)
})

   var controller = new ScrollMagic.Controller();
    var ourScene = new ScrollMagic.Scene({
       triggerElement: ".topPin",
       triggerHook: 0,
       duration: "20%"
})
   .setPin(".topPin", {pushFollowers: false})
   // .addIndicators({
   //     indent: 400

 
   .addTo(controller);
   var controller = new ScrollMagic.Controller();
   var ourScene = new ScrollMagic.Scene({
       triggerElement: ".main",
       triggerHook: 0,
       duration: "20%"
})
   .setPin(".main", {pushFollowers: false})
   // .addIndicators({
   //     indent: 500
   // })
   .addTo(controller);
$(".col-sm-4").each(function(){

  var controller = new ScrollMagic.Controller();
   var ourScene = new ScrollMagic.Scene({
       triggerElement: this

  })
   .setClassToggle(this, 'secondClass')
   // .addIndicators({
   //     indent: 200
   // })
   .addTo(controller);
})




$("H2").each(function(){

  var controller = new ScrollMagic.Controller();
   var ourScene = new ScrollMagic.Scene({
       triggerElement: this
      

  })
   .setClassToggle(this, 'finish')
   // .addIndicators({
   //     indent: 200
   // })
   .addTo(controller);
})



var controller = new ScrollMagic.Controller();
var tween = TweenMax.to("#money-bag", .5, {scale: 1.6, repeat: 1, yoyo: true});
var scene = new ScrollMagic.Scene({triggerElement: "H2", duration: "75%"})
   .setTween(tween)
                 
   .addTo(controller);

