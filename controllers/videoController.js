// var mongoose = require('mongoose');
var Video = require('../models/video.js');

var findOrCreate = function(comment) {
	var videoId = comment.videoId;
	var videoTitle = comment.videoTitle;
	console.log("Inside videoController ----> Comment=", comment);
	
	Video.findOne({videoId:videoId}).exec(function(err, data){
		if(data){
			console.log("Inside videoController ----> Video found. data=", data);

		}else{ //create new video
			console.log("Inside videoController ----> Video NOT found. data=", data);
			new Video({
				videoId:videoId,
				videoTitle: videoTitle
			}).save();
		} //if(data)
	});
}; //findOrCreate()

module.exports = {
	findOrCreate: findOrCreate
};

