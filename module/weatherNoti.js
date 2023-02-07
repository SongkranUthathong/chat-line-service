const request = require('../node_modules/request');
process.env.TZ ="Asia/Bangkok"
function getDate(){
    const day = ["Sun","Mon","Tue","Wed","Thu","Fri ","Sat"]
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    let d = new Date();
    let d_name = day[d.getDay()];
    let m_name = month[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    return d_name + " " + m_name + " " + date + " " + year;
}
function getTime(){

    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    return addPoint(hour)+":" +addPoint(minutes)+ ":" +addPoint(seconds);
}

function addPoint(num){
    if(num.lenght < 2){
        return "0"+num;
    }else{
        return num;
    }

}

function OpenWeather(cbfnc){
    var messageNotification;
     request.get({
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=13.71175516&lon=100.59223652&appid=63f338f24c40bb032d4faa52470c5b6c',
    }, (err, res, body) => {
        var weather = JSON.parse(body);
        messageNotification = "At : "+weather.name +" >" + getDate()+"\n"+
                   "ตอนนี้เวลา : "+getTime() +"\n"+
                    "สภาพอากาศ : "+weather.weather[0].description + " ปริมาณเมฆ : "+weather.clouds.all+ " %\n"+
                    "อุณหภูมิตอนนี้ : "+(weather.main.temp-273.15).toFixed(1)+ " C" +"  อุณหภูมิต่ำสุด : "+(weather.main.temp_min-273.15).toFixed(1)+ " C" +"  อุณหภูมิสูงสุด : "+(weather.main.temp_max-273.15).toFixed(1)+ " C" + "\n"+
                    "ความชื้น : " + weather.main.humidity+ " %" +"  ความกดอากาศ : "+weather.main.pressure +" hPa" +"\n"+
                    "ความเร็วลม : " + weather.wind.speed + "m/s , "+ "ทิศทางลม : "+ weather.wind.deg + " Degree\n"+
                    "API:OpenWeather";
                    cbfnc(messageNotification);
    });
}

exports.showWeather= OpenWeather;
