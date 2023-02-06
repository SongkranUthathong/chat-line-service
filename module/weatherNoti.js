const schedule = require('node-schedule');
const request = require('request')


function getDateTime(){
    const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday ","Saturday"]
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    let d_name = day[d.getDay()];
    let m_name = month[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    return d_name + " " + m_name + " " + date + " " + year +" " +hour+":" +minutes+ ":" +seconds;
}

function OpenWeather(){
    let textPush
    request.get({
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=13.71175516&lon=100.59223652&appid=63f338f24c40bb032d4faa52470c5b6c',
    }, (err, res, body) => {
        var weather = JSON.parse(body);
        textPush = "สวัสดีตอนเช้าครับ\n"+
                   "ตอนนี้เวลา : "+getDateTime() +"\n"+
                    "สภาพอากาศ : "+weather.weather[0].description + " ปริมาณเมฆ : "+weather.clouds.all+ " %\n"+
                    "อุณหภูมิตอนนี้ : "+(weather.main.temp-273.15).toFixed(1)+ " C" +" | อุณหภูมิต่ำสุด : "+(weather.main.temp_min-273.15).toFixed(1)+ " C" +" | อุณหภูมิสูงสุด : "+(weather.main.temp_max-273.15).toFixed(1)+ " C" + "\n"+
                    "ความชื้น : " + weather.main.humidity+ " %" +" | ความกดอากาศ : "+weather.main.pressure +" hPa" +"\n"+
                    "ความเร็วลม : " + weather.wind.speed + "m/s , "+ "ทิศทางลม : "+ weather.wind.deg + " Degree\n"+
                    "API:OpenWeather";
    });
    return textPush;
}

module.exports.WeatherCurrent = OpenWeather();
module.exports.getTime = getDateTime();

