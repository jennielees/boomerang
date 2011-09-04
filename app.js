var sys = require('sys');

var OAuth= require('./lib/oauth').OAuth;

mongoose = require('mongoose');
// we can't use var as we are including the model definitions: scope!

mongoose.connect('mongodb://localhost/messages');

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

require('./models.js');
Message = mongoose.model('Message');
Person  = mongoose.model('Person');

// now we have the db model
// authenticate with tweeter
// and listen for tweets

var oa= new OAuth("https://api.twitter.com/oauth/request_token",
        "https://api.twitter.com/oauth/access_token",
        "key",
        "secret",
        "1.0",
        null,
        "HMAC-SHA1");

//get request token

var betty_oauth_token = "366324004-JlULCi6dGy9tSDmGBLAOoKmIitO5xnRWbY8Nh5Nf";
var betty_oauth_secret = "gOlAIe1ZFYOS6Tkbvuv5pjZ9w94fmyZywOokac0aTs";
var betty_app_key = "43grfoUQVNysrXjsd694Kw";
var betty_app_secret = "gF140SW9iEsmqT1N8Z69E5F00IMhwzbtFVA0fjFFWc";

var twitter = require('twitter');

var twit = new twitter({
    consumer_key: betty_app_key,
    consumer_secret: betty_app_secret,
    access_token_key: betty_oauth_token,
    access_token_secret: betty_oauth_secret
});

twit.get('/direct_messages.json', {include_entities:false}, function(data) {

   data.forEach(function (message){
      storeTweet(message);
   });
   
});

// part 2: streaming data


// next step: PUT THEM IN DB

//sign into twitter at twitter.com, and come back to the app

//getTwitterRequestToken();

var storeTweet = function(tweet) {
   checkAuthor(tweet.sender_screen_name, tweet.sender.name, tweet);
   
   var from = tweet.sender_screen_name;
   var text = tweet.text;
   var date = tweet.created_at;
   
   sys.puts(from + " said: " + text + ", at " + date);
   
};

var checkAuthor = function (twitterhandle, name, tweet) {
   Person.findOne({ twitter: twitterhandle }, function(err, doc) {
      if (doc == null) {
         sys.puts("Person does not exist yet");
         person = new Person();
         person.twitter = twitterhandle;
         person.name = name;
         person.save(function(err) {
            if (err) {
               sys.puts("Error saving person " + name);
               sys.puts(err);
               // Probably cause they already got saved this session so we know the ID...
               insertTweet(person._id, tweet); 
            } else {
               insertTweet(person._id, tweet); 
            };
         });
      } else {
         insertTweet(doc._id, tweet);
      }
   });
      
};

var insertTweet = function(id, tweet) {
   message = new Message();
   message.text = tweet.text;
   message.date = tweet.created_at;
   message.author = id;
   sys.puts(message.author);
   message.source = "twitter";
   message.sourceID = tweet.id_str;
   sys.puts(sys.inspect(message));
   message.save(function(err) {
         if(err) {
            sys.puts("Error saving message! It's probably already in the database.");
            sys.puts(err);
         } else {
            sys.puts("Save success! A+");
         }
      });

};


/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Twitter OAuth


var getTwitterRequestToken = function(req, res){
   oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error){
      res.send('error: ' + sys.inspect(error));
    }else {
      res.send('https://api.twitter.com/oauth/authorize?oauth_token=' + oauth_token);

      sys.puts('oauth_token: ' + oauth_token);
      sys.puts('oauth_token_secret: ' + oauth_token_secret);
      sys.puts('requestoken results: ' + sys.inspect(results));
      
  //    db.set(req.sessionID+':twitter:requestToken', oauth_token, redis.print);
  //    db.set(req.sessionID+':twitter:requestTokenSecret', oauth_token_secret, redis.print);
    }
  });
};

var getTwitterAccessToken = function(req, res){
 /* db.mget(req.sessionID+':twitter:requestToken', 
    req.sessionID+':twitter:requestTokenSecret', 
    req.sessionID+':twitter:verifier', 
    function(err, replies){
      oa.getOAuthAccessToken(replies[0], replies[1], replies[2], function(error, oauth_access_token, oauth_access_token_secret, results2){
        if(error){
          res.send('error: ' + sys.inspect(error));
        }else{
          res.send('accesstoken results: ' + sys.inspect(results2));
          // Uncomment for testing
          sys.puts('oauth_access_token: ' + oauth_access_token)
          sys.puts('oauth_access_token_secret: ' + oauth_access_token_secret)
          sys.puts('accesstoken results: ' + sys.inspect(results2))
          sys.puts("Requesting access token\n\n");
//          db.set(req.sessionID+':twitter:accessToken', oauth_access_token, redis.print);
//          db.set(req.sessionID+':twitter:accessTokenSecret', oauth_access_token_secret, redis.print);
        }
      });
    });
  */
   oa.getOAuthAccessToken();

};




// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});


app.get('/getTwitterRequestToken', function(req, res){
  getTwitterRequestToken(req, res);
});

app.get('/getTwitterAccessToken', function(req, res){
  getTwitterAccessToken(req, res);
});


app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
