const express = require('express');
const app = express();
const { default: Axios } = require('axios');
const hostname = "localhost";
const port = 3000;

app.all('/',(req,res,next) =>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type","text/json");
    next();
})
app.get('/',(req,res)=>{
    res.end("Append The Category of Joke to url");
})
app.get('/:category',(req,res)=>{
    var data
    var joke = async (urlparameter) =>{
        return await Axios.get('https://sv443.net/jokeapi/v2/joke/'+urlparameter+'?format=json')
        .then((response) =>{
            return response.data;
        })
    }
    var getjoke = async (urlparameter)=>{
        data = await joke(urlparameter);
        console.log(data);
    }
    getjoke(req.params.category);
    res.end("Your Request is Succesfully Served And is Logged in Console");
})

app.listen(port,hostname,()=>{
    console.log(`Server is running at http://${hostname}${port}`);
})