const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const AllBot = require('allbot');

const rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));
app.use(function(req, res, next) {
  var data = '';
  req.on('data', function(chunk) { 
    data += chunk;
  });
  req.on('end', function() {
    req.rawBody = data;
  });
  next();
});

const configuration = require('./init-allbot');
const allBot = new AllBot(configuration);

// Add this
allBot.onMessage((sessionKey,message,originalRequest) => {
  allBot.replyText(sessionKey,"Hello");

  console.log("message",message);
  console.log("original request",originalRequest);

});

allBot.on("openchat",(sessionKey,message,originalRequest) => {
  allBot.replyText(sessionKey,"Hello");

  console.log("message",message);
  console.log("original request",originalRequest);

});

app.get('/', function (req, res) {
  res.send('hello bot top')
});

app.use(configuration.endpointURL, allBot.router);

app.listen(configuration.port, function () {
    console.log('Hello bot is listening on port ' + configuration.port)
})
