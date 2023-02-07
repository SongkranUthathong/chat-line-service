const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const weather = require('./module/weatherNoti');

app.get('/',(req,res)=>{
    
        res.json({ 
            message:"Hello Welcome To My site SNK Dev!!!"
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
    weather.showWeather(function(data){
        console.log(data);
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {RjT8hCJ6B9Pkn+KN1bhLBUjlNJtGnNrtZ9nf7cJ9hQ7nUKAnKDcccSuHThjmP1os5nggaFzzRP30S7p2ECEt0ta6OOUfz6MFssCKfUPBEUGmmOmT6Cbg5zk694vyVM80R/gnE7O06wxzHiC4dYEsiwdB04t89/1O/w1cDnyilFU=}'
    }
    var message = "Tuesday February 7 2023 13:10:59\n"+
    "สวัสดีตอนเช้าครับ\n"+
    "ตอนนี้เวลา : Tuesday February 7 2023 13:10:59\n"+
    "สภาพอากาศ : few clouds ปริมาณเมฆ : 20 %\n"+
    "ความชื้น : 67 % | ความกดอากาศ : 1011 hPa\n"+
    "ความเร็วลม : 5.14m/s , ทิศทางลม : 200 Degree\n"+
    "API:OpenWeather"
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: message
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
});
}