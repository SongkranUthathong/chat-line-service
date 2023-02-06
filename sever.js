const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json({
        message:"Hello Welcome My Web Service!!!"
    })
});

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
//app.post('/webhook', (req, res) => res.sendStatus(200))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  function reply(reply_token) {

    let messageNotification = ""
    request.get({
        url: 'https://api.openweathermap.org/data/2.5/weather?lat=13.71175516&lon=100.59223652&appid=63f338f24c40bb032d4faa52470c5b6c',
    }, (err, res, body) => {
        var weather = JSON.parse(body);
        messageNotification = "สวัสดีตอนเช้าครับ\n"+
                   "ตอนนี้เวลา : "+getDateTime() +"\n"+
                    "สภาพอากาศ : "+weather.weather[0].description + " ปริมาณเมฆ : "+weather.clouds.all+ " %\n"+
                    "อุณหภูมิตอนนี้ : "+(weather.main.temp-273.15).toFixed(1)+ " C" +" | อุณหภูมิต่ำสุด : "+(weather.main.temp_min-273.15).toFixed(1)+ " C" +" | อุณหภูมิสูงสุด : "+(weather.main.temp_max-273.15).toFixed(1)+ " C" + "\n"+
                    "ความชื้น : " + weather.main.humidity+ " %" +" | ความกดอากาศ : "+weather.main.pressure +" hPa" +"\n"+
                    "ความเร็วลม : " + weather.wind.speed + "m/s , "+ "ทิศทางลม : "+ weather.wind.deg + " Degree\n"+
                    "API:OpenWeather";
                    console.log(messageNotification);
    });
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {RjT8hCJ6B9Pkn+KN1bhLBUjlNJtGnNrtZ9nf7cJ9hQ7nUKAnKDcccSuHThjmP1os5nggaFzzRP30S7p2ECEt0ta6OOUfz6MFssCKfUPBEUGmmOmT6Cbg5zk694vyVM80R/gnE7O06wxzHiC4dYEsiwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: messageNotification
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}