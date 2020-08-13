const express = require('express');
const bodyparser = require('body-parser');
const port = 3000;
const hostname = "localhost";
const app = express();

var data = [];

app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.get('/',(req,res) => {
    res.render('default');
})



app.post('/postdetails',(req,res) =>{
    function compare(a,b){
        if(((a.maths+a.english)/2) < ((b.maths+b.english)/2))
        return 1;
        else return -1; 
    }
    console.log(req.body.name + " " + req.body.maths + " " + req.body.english);
    var temp = {
        name : req.body.name,
        maths : req.body.maths,
        english : req.body.english ,
    }
    data.push(temp);
    if(req.body.grp1 == 'Next User'){
        res.setHeader('Content-Type','text/html');
        res.render('default');
    }
    else{
        data.sort(compare);
        res.setHeader('Content-Type','text/html');
        res.render('final',{data:data});
    }
    
})

app.listen(port,hostname,()=>{
    console.log(`Server is running at http://${port}${hostname}`);
})