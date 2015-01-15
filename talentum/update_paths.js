var fs = require('fs');

var files = require('./sites.json');

var ii = 0;

var flag = process.argv[2];

//console.log(files[0].absPath);

function updatePath(file) {
  fs.readFile(file.path, 'utf8', function (err, data) {
    if (err) return console.log(err);

    if (flag === 'absolute') {
      var result = data.replace(/..\/images/g, file.absPath + '/images');
    } else if (flag === 'relative') {
      var rxp = new RegExp(file.absPath + '/images', 'g');
      var result = data.replace(rxp, '../images');
    }

    fs.writeFile(file.path, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

for (; ii < files.length; ii++) {
  updatePath(files[ii]);
}