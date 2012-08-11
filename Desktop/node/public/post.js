//Capture input on enter
$(document).ready(function(){
  loadFeed();
  $("#userInput").keyup(function(event){
    if(event.keyCode == 13){
      sendPost();
      $(this).val('');
    }
  });
  $("#signIn").click(function(){
    $(".signBox").show();
  });
  $("#close").click(function(){
    $(".signBox").hide();
  });
  $("#signUpLink").toggle(function(event){
    event.preventDefault();
      $(this).text("Already have an account? Sign In");
      $(".up").show();
      $(".in").hide();
    }, function(event){
      event.preventDefault();
      $(this).text("Create Free Account")
      $(".up").hide();
      $(".in").show();
  })
  $("#update").click(function(){
    loadFeed();
  });
  //new user submit
  $("#signUpSubmit").click(createNewUser)
});


//Post new user data
var createNewUser = function(){
  var email = $("#email").val();
  var name = $("#name").val();
  var password = $("#password").val();
  $.post("/newUser", {emailKey: email, nameKey: name, passwordKey: password});
}


//Post latest feed post
var sendPost = function(){
  var newPost = $("#userInput").val();
  //update DOM
  $("#feed").prepend("<div>" + newPost + "</div>");
  $.post("/newPost", {postKey: newPost});
}

//Get Feed content from posts.txt
var loadFeed = function(){
  $("#feed").html("");
  $.get("postsLib", {}, function(data){
    //split into separate divs
    var dataLine = data.split(/\n/g);
    for(var i=0; i < dataLine.length; i++){
      $("#feed").prepend("<div>" + dataLine[i] + "</div>");
    }
  })
}
