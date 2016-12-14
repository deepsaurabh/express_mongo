console.log("deep saurabh Singh");

const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://deepsaurabh:deepsaurabh@ds133428.mlab.com:33428/deepsaurabh-poc', function(err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
  console.log('listening on 3000')
})
})



app.get('/', function(req, res) {
	//res.sendFile(__dirname + '/index.html')
	 db.collection('quotes').find().toArray(function(err, results) {
		    if (err) return console.log(err)
		    // renders index.ejs
		    res.render('index.ejs', {quotes: results})
})

})

app.post('/quotes',function (req, res) {
  db.collection('quotes').save(req.body,function (err, result) {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})