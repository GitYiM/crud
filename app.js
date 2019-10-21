const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();
app.engine('html', require('express-art-template')); //art-template的核心配置


app.use('/node_modules/',express.static('./node_modules/'));
app.use('/public/',express.static('./public/'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(router);

//所有未处理的请求都会跑到这里来 404
app.use(function(req,res){

})

app.listen(3000,function(){ 
    console.log('Server is running ...');
})
