//modules
var http = require('http'),
    fs = require('fs'),
    formidable = require("formidable"),
    express = require('express'),
    redis = require('redis'),
    client = redis.createClient(),
    app = express.createServer()

app.use(express.bodyParser())

//serve static files
app.use('/', express.static(__dirname + '/public'))

client.get("name", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
});

//write post to posts.txt
app.post("/newPost", function(req, response){
    var newPost = req.body.postKey;
    fs.appendFile(__dirname + '/posts.txt', newPost + "\n", "utf8", function(error){
      response.send("Done");
    });
});

//get posts from posts.txt and write to index
app.get("/postsLib", function(req, response){
    fs.readFile(__dirname + '/posts.txt', "utf8", function (err, data) {
      if (err) throw err;
      response.send(data);
    }); 
});

//newUser post
app.post("/newUser", function(request, response){
  user = new User(request.body.name, request.body.email, request.body.password)
  user.saveUser(function(){
    response.send("hi")
  })
})

//user constructor
function User(name, email, password){
  this.name = name;
  this.email = email;
  this.password = password;
}

//save method
User.prototype.saveUser = function(callback){
  client.hset(this.email, this, callback)
}

app.listen(80);



