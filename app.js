const { fstat } = require("fs");
var http = require("http")
var fs = require("fs")

function serverStaticFile(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200; // response code is 200 if the host runs fine
    fs.readFile(__dirname + path, function(err, data){ 
        if(err){ // If the resource exists, but unavailable for some reason
            res.writeHead(500, {"Content-type" : "text/plain"})
            res.end("500 - Internal error")
        }
        else {
            res.writeHead(responseCode, {"Content-Type" : contentType})
            res.end(data)
        }
    })
}

http.createServer(function(req, res){
    var path = req.url.replace(/\/?(?:\?.*)?$/,"").toLowerCase();
    switch(path){
        case "": 
            serverStaticFile(res, "/index.html", "text/html");
            break;
        case "/about":
            serverStaticFile(res, "/about.html", "text/html");
            break;
        case "/style.css": // case to access css 
            serverStaticFile(res, "/style.css", "text/css");
            break;
        case "/img/gallery/graduation.jpg":
            serverStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg");
            break;
        case "/img/gallery/study.jpg":
            serverStaticFile(res, "/img/gallery/study.jpg", "image/jpeg");
            break;
        case "/video/students/memes.mp4":
            serverStaticFile(res, "/video/students/memes.mp4", "video/mp4");
            break;
        default: // If the resource doesn't exist and a user tries to access it
            serverStaticFile(res, "/error.html", "text/html", 404);
            break;
    }
}).listen(3000)

console.log("Server is running on the port 3000")