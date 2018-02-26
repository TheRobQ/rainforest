"use strict"
const  express = require('express')
const cookieParser = require('cookie-parser');
const bodyParser  = require('body-parser');
const port = 8800
const stat = () => console.log(`listening on ${port}`);
const app = express()
const axios = require('axios')
app.disable('x-powered-by')

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const follow = (url) =>{
  console.log(url);
  axios.get(url)
    .then(function (response) {
      console.log(response.data);
      if(response.data.hasOwnProperty('follow')){
        let url = response.data.follow.replace('challenge?', 'challenge.json?')
        follow(url)
      }else{
      console.log(response);
    }
    })
    .catch(function (error) {
      console.log(error);
    });
}

follow('http://letsrevolutionizetesting.com/challenge.json')
app.listen(port, stat)
