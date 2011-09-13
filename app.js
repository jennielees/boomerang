var sys = require('sys');
var OAuth= require('./lib/oauth').OAuth;
var journey = require('journey');

mongoose = require('mongoose');
// we can't use var as we are including the model definitions: scope!

mongoose.connect('mongodb://localhost/messages');

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

require('./models.js');
Message = mongoose.model('Message');
Response = mongoose.model('Message');
Person  = mongoose.model('Person');
Image  = mongoose.model('Image');
Phone = mongoose.model('Phone');


var c2dmAuthToken = "SID=DQAAALAAAAABtmkVV0Hy08uNFOvGZk1pkcjdSt9Uly0dfjdX9rnjIcujRWFWNDHMdHN9zV_MkNNX-VnNgjGebKJZUMtE74cDLC3ySYCw2k8sidznNnpjwxT-YnBU4bZN-KOUq8k7vof8WUk27X1Nr3WcFJX3rGptjSvTdwihPuVuxpRrHD86AKpDayUFOGo6NoGzyXKrcI9-Lo6XLO2coCHNIm4syLGPCUWriUPlB6K5dI5993fBJA\nLSID=DQAAALQAAABmqAJMDdSIDnI7uXZf0CtCdxt9x4aG3Wz4gzshHQ9c4ikkuEeul0nQwmDRZNgqGeZUc5NpqcOeVXPEuXM4Qhb8u_ZBzAZJNn0RNJgdLjzSPAEE3njVAFS2Cl97GVajP6SRmo0npmOmQhoG0szImGkUAbS05r0YdGlRldHaof2QrkdilWIJf2r-_FbJ5ch67Jv-NNOMjUizfV125G128YsqGyl1ffc4AXmwJ5Zvr68t55FDeBwtcLSvCrvUQf5nK\nNoAuth=DQAAALUAAACkRc9YtveLhivKjThzASgFdTbQ0luL-w4A3Lc38zlYGAg1Rp3Gq24h8SGVM6q788OvMy0xtwVoYOY7FLnyxVbrrNoYuqP7gszQfhFBWD5LSUFYSWXVXAcLD6MK9f4OCO7L56vuW5X6mink4q5xtMlEUyFgWzsnOEPN_DPFvWdqHLxDP4aVqWOQ-zgFQf8LW-rxE_CmpUEbV6GUst0xjtAW0iadxP4Z6_m_FY0sA30si_VMNLuhYkKRTLJ0cij21tI";
//SID=DQAAALAAAAABtmkVV0Hy08uNFOvGZk1pkcjdSt9Uly0dfjdX9rnjIcujRWFWNDHMdHN9zV_MkNNX-VnNgjGebKJZUMtE74cDLC3ySYCw2k8sidznNnpjwxT-YnBU4bZN-KOUq8k7vof8WUk27X1Nr3WcFJX3rGptjSvTdwihPuVuxpRrHD86AKpDayUFOGo6NoGzyXKrcI9-Lo6XLO2coCHNIm4syLGPCUWriUPlB6K5dI5993fBJA
//LSID=DQAAALQAAABmqAJMDdSIDnI7uXZf0CtCdxt9x4aG3Wz4gzshHQ9c4ikkuEeul0nQwmDRZNgqGeZUc5NpqcOeVXPEuXM4Qhb8u_ZBzAZJNn0RNJgdLjzSPAEE3njVAFS2Cl97GVajP6SRmo0npmOmQhoG0szImGkUAbS05r0YdGlRldHaof2QrkdilWIJf2r-_FbJ5ch67Jv-NNOMjUizfV125G128YsqGyl1ffc4AXmwJ5Zvr68t55FDeBwtcLSvCrvUQf5nKNo
//Auth=DQAAALUAAACkRc9YtveLhivKjThzASgFdTbQ0luL-w4A3Lc38zlYGAg1Rp3Gq24h8SGVM6q788OvMy0xtwVoYOY7FLnyxVbrrNoYuqP7gszQfhFBWD5LSUFYSWXVXAcLD6MK9f4OCO7L56vuW5X6mink4q5xtMlEUyFgWzsnOEPN_DPFvWdqHLxDP4aVqWOQ-zgFQf8LW-rxE_CmpUEbV6GUst0xjtAW0iadxP4Z6_m_FY0sA30si_VMNLuhYkKRTLJ0cij21tI


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

//var betty_oauth_token = "366324004-JlULCi6dGy9tSDmGBLAOoKmIitO5xnRWbY8Nh5Nf";
//var betty_oauth_secret = "gOlAIe1ZFYOS6Tkbvuv5pjZ9w94fmyZywOokac0aTs";
//var betty_app_key = "43grfoUQVNysrXjsd694Kw";
//var betty_app_secret = "gF140SW9iEsmqT1N8Z69E5F00IMhwzbtFVA0fjFFWc";


var betty_oauth_token = "372647766-ibQaKdKGkhJm9GSCo8NUzBvDd1Jjo3YFnLWDkiAn";
var betty_oauth_secret = "dQHrHUmSOFCQCNCXyiH32qzF7YdEV3zxLj11exDQrc";
var betty_app_key = "wbSjwF3tl1QQO6QhcizOA";
var betty_app_secret = "xrkDnEGbivjXXKREYQ6rhccDyy36bQ1dLqHyMA";

var twitter = require('twitter');

var twit = new twitter({
    consumer_key: betty_app_key,
    consumer_secret: betty_app_secret,
    access_token_key: betty_oauth_token,
    access_token_secret: betty_oauth_secret
});

var isTwitterEnabled = true; //debug hack

if (isTwitterEnabled) {
   twit.get('/direct_messages.json', {include_entities:false}, function(data) {
      data.forEach(function (message){
         storeTweet(message);
      });
   });
}

// TODO! part 2: streaming data and auto follow events


var storeTweet = function(tweet) {
//   checkAuthor(tweet.sender_screen_name, tweet.sender.name, tweet);
   insertTweet("Fakeout", tweet);
   // TODO Refactor this to be asynch
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
         person.avatarURL = tweet.sender.profile_image_url;
         person.save(function(err) {
            if (err) {
               sys.puts("Error saving person " + name);
               sys.puts(err);
               // Probably cause they already got saved this session so we know the ID...
               // FIXME
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
   var message = new Message();
   parseImages(tweet.text, message._id, tweet, function(url, tweet) {
      // awesome, the callback works!
      // url is each url, we have to modify this into a single callback for every tweet, fixing the parseImages function
      message.text = tweet.text;
      message.date = tweet.created_at;
  //    message.authorID = id;
      sys.puts(message.author);
      message.source = "twitter";
      message.sourceID = tweet.id_str;
      message.author.twitter = tweet.sender.screen_name;
      message.author.name = tweet.sender.name;
      sys.puts(sys.inspect(message));
      message.save(function(err) {
            if(err) {
               sys.puts("Error saving message! It's probably already in the database.");
               sys.puts(err);
            } else {
               // do the image; we want this to happen only if the tweet is saved, dupes
               if (url) { linkImage(message, url); }
               sys.puts("Save success! A+");
            }
         });
   });
};

var linkImage = function(message, url) {
   var image = new Image();
  // image.text = message.text;
   // t
   //var twitpics = s/http:\/\/twitpic.com\/([a-zA-Z0-9]+)/http:\/\/twitpic.com/show/large//g;
   var urlslug = /http:\/\/twitpic.com\/([a-zA-Z0-9]+)/g;
   match = urlslug.exec(url);
   if (match) {
      sys.puts("Twitpic found: " + match);
      url = "http://twitpic.com/show/large/" + match[1];
      thumburl = "http://twitpic.com/show/thumb/" + match[1];
      image.text = message.text;
      image.external = url;
      image.externalThumbnail = thumburl;
      image.message = message._id;
      image.save(function(err) {
            if (err) {
               sys.puts("Error saving image. Sadface :(");
               sys.puts(err);
            } else {
               sys.puts("Success linking to image! " + url);
               // Link back - inefficient! FIXME
               message.images.push(image);
               message.save();
            }
      });
   }
   sys.puts(url); 
};

// test
//linkImage("foobar", "http://twitpic.com/abcdef");
//linkImage("foobar", "http://flickr.com/abcdef");

var unshortener = require('unshortener');

var parseImages = function(messageString, messageId, tweet, callback) {
   // http://twitpic.com/show/large/1flrp
   var match;
   var ret = [];
   // sigh, expand t.co...
   var tco = /(http:\/\/(t.co|bit.ly)\/[a-zA-Z0-9]+)/g;
   match = tco.exec(messageString);
   if (match) {
      var shorturl = match[1];
      // TODO - need a test that will check multiple messages
      sys.puts("Found a short url: " + match[1]);
      unshortener.expand(shorturl, function (url) {
         sys.puts(sys.inspect(url));
         // need to push saving into this callback
         ret.push({'longurl': url.href, 'shorturl': shorturl});
         callback(url.href, tweet);
      });
   } else {
     callback(null, tweet); 
   };
   // look for a twitpic URL
   
   // redirect to AWS URL
};

// Test

var testMultipleString = "Here is some text. http://t.co/GC2LuPj http://t.co/4gYS9f9";
var testMultipleTco = parseImages(testMultipleString, 0, "foo", function(url, tweet) {
   sys.puts(url);
   sys.puts(tweet);
  });
sys.puts(testMultipleTco);


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

var https = require('https');

// send c2dm message
var sendC2DM = function(data) {
   // need phone as parameter eventually
   // retrieve registration ID and authToken
   var registrationID = "APA91bEgUQJeYCmKI5v43lEmdL-f0l2xA6I-EmH30depPC-5hvUqM4GzG6RoY38F6UyQ8rjAaqUQ3zoiKUVVssIpxfFyJjjTUwAqm9sihtsSZU2tRFZOICU";
   var authToken = c2dmAuthToken;
   
   var collapse_key = "granny";
   
   var options = {
      host: 'android.apis.google.com',
      port: 443,
      path: '/c2dm/send',
      method: 'POST'
   };
   
   var req = https.request(options, function(res) {
      console.log("statusCode: ", res.statusCode);
      console.log("headers: ", res.headers);
      
      res.write(); // FIXME
   });
   
};


twit.stream('user', {track:'nodejs'}, function(stream) {
    stream.on('data', function (data) {
      //  sys.puts(sys.inspect(data));
        // look for follow event
        if (data.event == "follow") {
            follower = data.source.screen_name;
            //
            twit.post('/friendships/create.json', {id: follower}, function(data) {
                  sys.puts(sys.inspect(data));
            });
        };
        
        
        // look for DM event
        if (data.direct_message) {
            // DM
          // sys.puts(sys.inspect(data.direct_message));
           // this crashes everything, but why?
           tweet = data.direct_message;
           sys.puts("Text: " + tweet.text);
           storeTweet(tweet);
         
        }
    });
    // Disconnect stream after five seconds
    setTimeout(stream.destroy, 500000);
});


// Journey : A HTTP JSON router
// https://github.com/cloudhead/journey

//var router = new(journey.Router);

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

app.get('/debug', function(req, res){
   Message.find({}, function(err, docs) {      
      res.render('debug', {
         title: "Debug",
         data : docs
      });
   });
});

app.get('/getTwitterRequestToken', function(req, res){
  getTwitterRequestToken(req, res);
});

app.get('/getTwitterAccessToken', function(req, res){
  getTwitterAccessToken(req, res);
});

app.use(express.bodyParser());

//  Get ID from the client device
app.post('/setClientToken', function(req, res) {
   sys.puts(req.body.clientID);
   sys.puts(req.body.authToken);
   sys.puts(req.body.PIN);
   device = new Phone();
   device.clientID = req.body.clientID;
   device.authToken = req.body.authToken;
   device.PIN = req.body.PIN;
   device.registration_id = req.body.registration_id;
   device.save(function(err) { sys.puts("Error " + sys.inspect(err)) });
   res.send("OK\n"); //make a proper return code
});

// store message responses
app.post('/messageResponse', function(req,res) {
   sys.puts(req.body.messageID);
   sys.puts(req.body.text);
   response = new Response(); 
   response.messageID = req.body.messageID;
   response.text = req.body.text;
   response.date = Date.now(); 
   response.save(function(err) { sys.puts("Error " + sys.inspect(err)) });
   res.send(req.body);
});


// http serving in here for now
app.get('/getMessages', function(req, res) {
   var clientID = req.params.id;
   var PIN   = req.params.pin;
   // later we will actually check this ^_^
   
   // find all messages for this user
   // right now this is.. all messages ^_^
   // Message.find(author.relative.devicePIN)
   // Can't do joins in mongodb (why using nosql again?!) so deferring
   // can eventually do this via retrieving the ObjectID the  hard way
   // nest in the IDs
   Message.find({}, function(err, docs) {
  //    var messages = docs;
//      Image.find({}, function(err, docs) {
         res.json(docs);
//         res.json({ "messages" : messages, "images" : docs });
   });
});


app.listen(3456);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
