var https = require('https');
var http = require('http');
var fs = require('fs');

module.exports = download = function(url, dest, cb) {
  let file = fs.createWriteStream(dest);
  let urlRun;
  if (url.includes('https')) {
    urlRun = https;
  } else if (url.includes('http')) {
    urlRun = http;
  }
  var request = urlRun
    .get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on('error', function(err) {
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};
