
var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");

var MimeMap = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'xml': 'application/xml',
  'json': 'application/json',
  'js': 'application/javascript',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'gif': 'image/gif',
  'png': 'image/png',
  'svg': 'image/svg+xml'
};


http.createServer(function (req, res) {
    
    //res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.end('Hello, world!');
    var uri = url.parse(req.url).pathname
    , filename = path.join(process.cwd(), uri);
  
  path.exists(filename, function(exists) {
    if(!exists) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.write("404 Not Found\n");
      res.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += 'public/index.html';
 
    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
        return;
      }
 
      res.writeHead(200, {
        'Content-Type': MimeMap[filename.split('.').pop()] || 'text/plain'
      });
      res.write(file, "binary");
      res.end();
    });
  });
    
}).listen(process.env.PORT || 8080);