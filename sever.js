const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const schedule = require('node-schedule');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const weather = require('./module/weatherNoti');

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 2;
rule.minute = 33;
rule.tz = "Asia/Bangkok";

const job = schedule.scheduleJob(rule, function(){
    weather.showWeather(function(data){

    
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {RjT8hCJ6B9Pkn+KN1bhLBUjlNJtGnNrtZ9nf7cJ9hQ7nUKAnKDcccSuHThjmP1os5nggaFzzRP30S7p2ECEt0ta6OOUfz6MFssCKfUPBEUGmmOmT6Cbg5zk694vyVM80R/gnE7O06wxzHiC4dYEsiwdB04t89/1O/w1cDnyilFU=}'
        }
        let body = JSON.stringify({
            to: "Uce4a9dc86e6076e0abea7f3802bd77c9",
            messages: [
                {
                    "type":"text",
                    "text":"Good Morning Sir!!!"
                },
                {
                    "type":"text",
                    "text":data
                }
        ]
        })
        request.post({
            url: 'https://api.line.me/v2/bot/message/push',
            headers: headers,
            body: body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
    });
  });


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

    
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {RjT8hCJ6B9Pkn+KN1bhLBUjlNJtGnNrtZ9nf7cJ9hQ7nUKAnKDcccSuHThjmP1os5nggaFzzRP30S7p2ECEt0ta6OOUfz6MFssCKfUPBEUGmmOmT6Cbg5zk694vyVM80R/gnE7O06wxzHiC4dYEsiwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [
            {
                "type":"text",
                "text":data
            }
    ]
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