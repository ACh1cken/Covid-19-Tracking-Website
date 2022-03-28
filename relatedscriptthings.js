//get csv data from github
var csvurl = "https://raw.githubusercontent.com/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv";

var dataArr = [];
var latestData=[];
var currdate = Date.today().addDays(-1).toString("yyyy-MM-dd");//set to 1 days before today due to data not being latest
var statelistcsv=["Johor","Kedah","Kelantan","Melaka","Negeri Sembilan","Pahang","Perak","Perlis","Sabah","Sarawak","Selangor","Terengganu","W.P. Kuala Lumpur","Pulau Pinang","W.P. Labuan","W.P. Putrajaya"]
var statelist=["Johor","Kedah","Kelantan","Melaka","Negeri Sembilan","Pahang","Perak","Perlis","Sabah","Sarawak","Selangor","Terengganu","Kuala Lumpur","Pulau Pinang","Labuan","Putrajaya"]
google.charts.load('current',{'packages':['corechart']});
var week = [Date.today().addDays(-1).toString("yyyy-MM-dd"),Date.today().addDays(-2).toString("yyyy-MM-dd"),Date.today().addDays(-3).toString("yyyy-MM-dd"),
            Date.today().addDays(-4).toString("yyyy-MM-dd"),Date.today().addDays(-5).toString("yyyy-MM-dd"),Date.today().addDays(-6).toString("yyyy-MM-dd"),
            Date.today().addDays(-7).toString("yyyy-MM-dd")]

$.get(csvurl,function(csvdata){
    data = $.csv.toObjects(csvdata);
   dataArr = data.slice(12500);
   gettodayData(currdate,dataArr,latestData);
});

function onloadScript() {
    console.log(currdate);
    
}

function gettodayData(todayDate,input_array,output_array){
    if (input_array.some(input_array => input_array.date === todayDate)){
        var index = input_array.findIndex(input_array => input_array.date === todayDate);
        console.log(index);
        latestData = input_array.slice(index,index+statelist.length);
        console.log(output_array);

    }else{
        console.log("Data not found, invalid date or csv data is not up to date with curr computer time. Try changing the date or refreshing")
    }

}

function getCases(input_array,state,datafield){
    var index = input_array.findIndex(input_array => input_array.state == state);
    return input_array[index][datafield];
}

function getDateCases(input_array,state,datafield,date_field){
    var index = input_array.findIndex(input_array => input_array.state == state && input_array.date == date_field );
    return input_array[index][datafield];
}

function colorPicker(number_of_cases){
if(number_of_cases <100 && number_of_cases >0){
    return 1;
    }
else if (number_of_cases < 300 && number_of_cases >=100){
    return 2;
}
else if (number_of_cases < 500 && number_of_cases >=300){
    return 3;
}
else if (number_of_cases < 700 && number_of_cases >=500){
    return 4;
}
else if (number_of_cases < 900 && number_of_cases >=700){
    return 5;
}
else{ 
return 6;}
}


function drawAgeChart(state,state_div_name) {
    var data = google.visualization.arrayToDataTable([
        ["Cases By age","Number of Cases"],
        ['0-4',parseInt(getCases(latestData,state,"cases_0_4"))],
        ['5-11',getCases(latestData,state,"cases_5_11")],
        ['12-17',getCases(latestData,state,"cases_12_17")],
        ['18-29',getCases(latestData,state,"cases_18_29")],
        ['30-39',getCases(latestData,state,"cases_30_39")],
        ['40-49',getCases(latestData,state,"cases_40_49")],
        ['50-59',getCases(latestData,state,"cases_50_59")],
        ['60-69',getCases(latestData,state,"cases_60_69")],
        ['70-79',getCases(latestData,state,"cases_70_79")],
        ['80+',getCases(latestData,state,"cases_80")],
    ]);

    var options = {title :'Cases in ' + state +' seperated by age',width:600,height:400};

    var chart = new google.visualization.BarChart(document.getElementById(state_div_name));
    chart.draw(data,options);
};


function drawLineChart(state,state_div_name) {

    var data = google.visualization.arrayToDataTable([
        ['Date','Number of Cases Active'],
        [week[6],   parseInt(getDateCases(dataArr,state,'cases_active',week[6]))],
        [week[5],   parseInt(getDateCases(dataArr,state,'cases_active',week[5]))],
        [week[4],   parseInt(getDateCases(dataArr,state,'cases_active',week[4]))],
        [week[3],   parseInt(getDateCases(dataArr,state,'cases_active',week[3]))],
        [week[2],   parseInt(getDateCases(dataArr,state,'cases_active',week[2]))],
        [week[1],   parseInt(getDateCases(dataArr,state,'cases_active',week[1]))],
        [week[0],   parseInt(getDateCases(dataArr,state,'cases_active',week[0]))],
    ]);

    var options = {title :'Trend of Active Cases in ' + state,width:600,height:400,legend:{position:'bottom'}};

    var chart = new google.visualization.LineChart(document.getElementById(state_div_name));
    chart.draw(data,options);
};

function drawLineChart_Recover(state,state_div_name) {
    var data = google.visualization.arrayToDataTable([
        ['Date','Number of New Cases','Number of Recovered Cases'],
        [week[6],   parseInt(getDateCases(dataArr,state,'cases_new',week[6])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[6]))],
        [week[5],   parseInt(getDateCases(dataArr,state,'cases_new',week[5])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[5]))],
        [week[4],   parseInt(getDateCases(dataArr,state,'cases_new',week[4])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[4]))],
        [week[3],   parseInt(getDateCases(dataArr,state,'cases_new',week[3])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[3]))],
        [week[2],   parseInt(getDateCases(dataArr,state,'cases_new',week[2])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[2]))],
        [week[1],   parseInt(getDateCases(dataArr,state,'cases_new',week[1])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[1]))],
        [week[0],   parseInt(getDateCases(dataArr,state,'cases_new',week[0])),parseInt(getDateCases(dataArr,state,'cases_recovered',week[0]))],
    ]);

    var options = {title :'Trend of New and Recovered Cases in ' + state,width:600,height:400,legend:{position:'bottom'}};

    var chart = new google.visualization.LineChart(document.getElementById(state_div_name));
    chart.draw(data,options);
};


function getAllLineCharts_R() {
    for(var i = 0; i < statelist.length; i++){
        drawLineChart_Recover(statelistcsv[i],statelist[i]+'_chart_div');

    }
}


function getAllCharts(){
    for(var i = 0; i < statelist.length; i++){
        drawAgeChart(statelistcsv[i],statelist[i]+'_chart_div');

    }
}

function getAllLineCharts(){
    for(var i = 0; i < statelist.length; i++){
        drawLineChart(statelistcsv[i],statelist[i]+'_chart_div');
    }
}
