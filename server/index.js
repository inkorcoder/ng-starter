var express = require('express'),
    fs = require('fs')
    url = require('url');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/upload', function (req, res, next) {
	var body = '';
	req.on('data', function(data) {
		body += data;
	});

	fs.readFile('../src/data/favourites.json', 'utf-8', function(err, openedData) {

		var temp = JSON.parse(openedData);
		var tempItem = JSON.parse(body);

		var newData = "[";

		var exp = new RegExp(body, 'gim');
		if (openedData.match(exp)){
			temp.forEach(function(item, i){
				if (item.href === tempItem.href){
					temp = temp.slice(i,1);
					return;
				}
			});
			res.send(JSON.stringify({
				removed: true
			}))
		} else {
			newData += body;
			res.send(JSON.stringify({
				saved: true
			}))
		}
		newData += "]";

		console.log(newData)

		fs.writeFile('../src/data/favourites.json', newData, function() {
			res.end();
		});


	});

});


app.post('/check', function (req, res, next) {
	var body = '';
	req.on('data', function(data) {
		body += data;
	});

	fs.readFile('../src/data/favourites.json', 'utf-8', function(err, openedData) {

		var temp = JSON.parse(openedData);
		var tempItem = JSON.parse(body);

		var newData = "[";

		var exp = new RegExp(body, 'gim');
		if (openedData.match(exp)){
			res.send(JSON.stringify({
				isFavourite: true
			}))
		} else {
			res.send(JSON.stringify({
				isFavourite: false
			}))
		}


	});

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
