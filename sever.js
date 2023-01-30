const { json } = require('express');
const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.json({
        message:"Hello Welcome My Web Service!!!"
    })
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })