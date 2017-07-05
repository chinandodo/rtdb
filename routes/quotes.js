var express = require('express');
var sio = require('.././socketApi');
var router = express.Router();
const request = require('request');

router.get('/', function(req, res, next){
    // console.log(req.app.locals.api);
    res.render('quotes', { title: 'Stocks Quotes' });
});

sio.io.on('connection', function(socket){
var u1 = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=EA&apikey=Q7BTR9M953KMYQMO";   
var u2 = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=GOOG&apikey=Q7BTR9M953KMYQMO";   
var u3 = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=F&apikey=Q7BTR9M953KMYQMO";   

    request(u1, function(err, res, body){
        socket.emit('quote', body);
    });
    
    request(u2, function(err, res, body){
        socket.emit('quote', body);
    });
    
    request(u3, function(err, res, body){
        socket.emit('quote', body);
    });
    
    socket.on('fromClient', function(msg){
        var url = getUrl(msg);
        request(url, function(err, res, body){
            socket.emit('quote', body); 
        });        
    });
});

function getUrl(q){
    var keyApi = "Q7BTR9M953KMYQMO";
    return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+q+"&apikey="+keyApi;
}

module.exports = router;