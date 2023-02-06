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
            text: 'How are you?'
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