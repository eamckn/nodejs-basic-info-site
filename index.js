const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
  let filename;
  if (req.url === "/") filename = "./index.html";
  else filename = "." + req.url + ".html";
  //console.log(filename);
  fs.readFile(filename, function (error, data) {
    if (error) {
      fs.readFile("./404.html", function (error, data) {
        if (error) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("404 Not Found");
        } else {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  });
});

server.listen(8080);
