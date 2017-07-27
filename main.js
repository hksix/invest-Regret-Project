// api for alpha Vantage 5X4II9G2P5S3BJ05
// api for quandl YiNzVQcDRbgWz1L_khwj

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
var $userInputArr = [];
var $userInputDict= {};
var $completeURL;
var $searchDataDict = {};
var $splitDataArr;

// HH - example url https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=5X4II9G2P5S3BJ05

// HH - timeInterval choices = ['function=TIME_SERIES_INTRADAY', 'function=TIME_SERIES_DAILY', 'function=TIME_SERIES_WEEKLY', 'function=TIME_SERIES_MONTHLY'];
// HH - ticker example for URL = "symbol=MSFT";



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
    // setItemToLocal($dataKeyNameArr);
    dataDict($dataKeyNameArr);
    // // sendDataToServer($userInputDict);
    // localStorage.setItem("order", $dataKeyNameArr);
    arrMaker($dataKeyNameArr);
    // appendOrderToHTML($userInputDict);
    // getOrdersFromAPI();
    setUrl($userInputDict);
    getData($completeURL);
    
});
function getData(URL){
    var x = $.get(URL);
    x.then( function (data){
        $searchDataDict = data;
        console.log(data);
        console.log(getCloseStartData($startDate.val()));
        console.log(getCloseEndData($endDate.val()));

        });   
}

// function setItemToLocal(arr){
//     for (var i= 0; i<arr.length; i++){
//             localStorage.setItem(arr[i][0], arr[i][1].val());
        
//     }
// }
function arrMaker(arr){
    for (var i= 0; i<arr.length; i++){
        $userInputArr.push(arr[i][0], arr[i][1].val());
    } 
    return $userInputArr;
}
function setUrl(arr){
    // var completeURL= $URL+'date.gte='+$userInputDict['startDate']+"&date.lte="+$userInputDict['endDate']+"&ticker="+$userInputDict['tickerName']+"&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj";
    var completeURL = "https://www.quandl.com/api/v3/datasets/WIKI/"+$userInputDict['tickerName']+".json?column_index=4&"+$userInputDict['startDate']+"&"+$userInputDict['endDate']+'&api_key=YiNzVQcDRbgWz1L_khwj';
    $completeURL = completeURL;
    return completeURL;
}
function dataDict(arr){
    for (var i = 0; i< arr.length; i++){
        $userInputDict[arr[i][0]] = arr[i][1].val();
    }
}
function getSplitData(){
var URL = "https://www.quandl.com/api/v3/datasets/WIKI/"+$userInputDict['tickerName']+".json?column_index=7&"+$userInputDict['startDate']+"&"+$userInputDict['endDate']+'&api_key=YiNzVQcDRbgWz1L_khwj';
    var x = $.get(URL);
    x.then( function (data){
        $splitDataArr= data;
        console.log(data);
    });
    }
// function getServerData(){
//     $.get($completeURL, function (data){
//         console.log(JSON.stringify(data));
//     });
// }
function getCloseStartData(startDateVal){
     return $searchDataDict["datatable"]['data'][0][1];
}
function getCloseEndData(EndDateVal){
     var x = $searchDataDict.datatable.data.length;
     return $searchDataDict["datatable"]['data'][x-1][1]
}
function splitCounter(){
    var splitCount=[];
// $splitDataArr["dataset"]["data"][i][1] 
    // $splitDataArr["dataset"]["data"];
    for (var i = 0; i<=$splitDataArr.length;i++){
        if($splitDataArr["dataset"]["data"][i][1] > 1 ){
            console.log($splitDataArr["dataset"]["data"][i][1] > 1 )
            splitCount.push($splitDataArr["dataset"]["data"][i][1]);
        }
    }return splitCount;
    
}

// HH - hitting submit will run function getData. This will populate the $searchDataDict var
// to search through dict -  $searchDataDict["datatable"]['data'][0][1] for the first day
// this will get you the last day var x = $searchDataDict.datatable.data.length
//$searchDataDict["datatable"]['data'][x-1][1]; this is the last day




// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=19900101&date.lt=20170601&ticker=MSFT&qopts.columns=date,close,high&api_key=YiNzVQcDRbgWz1L_khwj
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=19900102&date.lt=19900103&ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj
// https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?ticker=MSFT&qopts.columns=date,close&api_key=YiNzVQcDRbgWz1L_khwj

"https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&column_index=7&api_key=YiNzVQcDRbgWz1L_khwj"
// splits https://www.quandl.com/api/v3/datasets/WIKI/MSFT.json?&column_index=7&api_key=YiNzVQcDRbgWz1L_khwj
// "https://www.quandl.com/api/v3/datasets/WIKI/"+$userInputDict['tickerName']+".json?column_index=4&"+$userInputDict['startDate']+"&"+$userInputDict['endDate']+'&collapse=monthly&&api_key=YiNzVQcDRbgWz1L_khwj';
84.142857142857

0.10