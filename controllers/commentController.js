var mongoose = require('mongoose');
var Comment = require('../models/comment.js');



console.log('inside the comment controller')
var newComment = new Comment({
  text: 'Hello World'
});

newComment.save(function(err, message){
  console.log('inside the save method')
  if(err){
    console.log(err);
  }else{
    console.log('This is the fake message' + message);
  }

});
