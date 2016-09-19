require = require('amdrequire');
import http = require('http');

var STSEngine = require(__dirname + '/Scripts/Lib/STSEngine.js');



var objectListService = new STSEngine.ObjectListServiceImpl();

var port = process.env.port || 1337
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);