// var mongoose = require('mongoose');
var Video = require('../models/video.js');

var findOrCreate = function(video) {
	var videoId = video.videoId;
	var videoTitle = video.videoTitle;
	var duration = video.videoDuration;
	console.log("Inside videoController ----> video=", video);
	
	Video.findOne({videoId:videoId}).exec(function(err, data){
		if(data){ //func: video exists, don't do anything
			// console.log("Inside videoController ----> Video found. data=", data);

		}else{ //create new video
			// console.log("Inside videoController ----> Video NOT found. data=", data);
			new Video({
				videoId:videoId,
				videoTitle: videoTitle, 
				duration: duration
			}).save();
		} //if(data)
	});
}; //findOrCreate()

module.exports = {
	findOrCreate: findOrCreate
};

