angular.module('app.services', [])

.factory('commentGraph', function(){

  var formatTime = function(videoData){
    //timelog array of array [text, text]
    var comments = videoData.comments;
    var timeLog = [];
    var current = 0;

    //needs to be adjusted later
    var movieLength = videoData.duration;
    var numBars = 1;
    if(movieLength < 300){
      numBars = 50;
    }else if(movieLength >= 300 && movieLength < 600){
      numBars = 75;
    }else {
      numBars = 100;
    }
    //length of movie clip / number of desired bars: upper limit 150
    var increment = Math.floor(movieLength / numBars);

    for(var i=0; i<movieLength; i+=increment){
      var list = [];
      if(current < comments.length){
        while((comments[current].timestamp < i+5)){
          list.push({
            text: comments[current].text,
            username: comments[current].username
          })
          current ++;
          if(current === comments.length){
            break;
          }
        }
      }
      timeLog.push(list);
    }
    return timeLog;
  }

  var clicked = function(videoData, callback){
    var chartBars = d3.select('.chart').selectAll('div');
    var len = Math.floor(videoData.duration/chartBars[0].length);
    chartBars
      .on('click', function(d, i){
        callback(i*len);
      })
  }

  var graphSetup = function(id){
    var id = '#'+id;
    d3.select(id)
      .append('div')
      .attr('class', 'chart')
      .style('position', 'relative')
  }

  var getVideoSpecs = function(){
    var diff = window.scrollY;
    var specs = d3.select('#player').node().getBoundingClientRect();
    var videoPlayerWidth = specs.width;
    var videoPlayerBottom = specs.bottom + diff;
    return [videoPlayerWidth, videoPlayerBottom];
  }

  var hideGraph = function(){
    var videoplayer = d3.select('#player');
    var specs = getVideoSpecs();
    var videoPlayerBottom = specs[1];

    d3.select('.chart').on('mouseenter', function(d){
      d3.select('.chart')
        .selectAll('div')
        .transition()
        .style('visibility', 'visible')
    }).on('mouseleave', function(){
      d3.select('.chart')
        .selectAll('div')  
        .transition()
        .style('visibility', 'hidden')
    })
    videoplayer.on('mouseenter', function(){
      console.log('here')
      d3.select('.chart')
        .selectAll('div')
        .transition()
        .style('visibility', 'visible')
    }).on('mouseleave', function(){
      d3.select('.chart')
        .selectAll('div')
        .transition()
        .style('visibility', 'hidden')
    });
  }

  var resize = function(videoData){
    var commentWidth = getVideoSpecs()[0];
    var data = formatTime(videoData);
    
    var specs = getVideoSpecs();
    var videoPlayerWidth = specs[0];
    var videoPlayerBottom = specs[1];

    d3.select('.chart')
      // .style('top', function(){
      //   var chart = d3.select('.chart')
      //       .node()
      //       .getBoundingClientRect()
      //       .height
      //     return videoPlayerBottom - chart + 'px'
      // })
      .selectAll('div')
      .style('width', function(){
        return (commentWidth/(data.length))-2+'px';
      });
  }

  var graph = function(videoData){

    var data = formatTime(videoData);

    var specs = getVideoSpecs();
    var videoPlayerWidth = specs[0];
    var videoPlayerBottom = specs[1];
    
    d3.select('.chart')
      // .style('top', function(){
        // var chart = d3.select('.chart')
        //     .node()
        //     .getBoundingClientRect()
        //     .height
        // console.log(videoPlayerBottom, chart);
        // return - videoPlayerBottom + chart + 'px';
      // })
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('height', function(d){return d.length*4+'px'})
      .style('width', function(){
        return (videoPlayerWidth/(data.length))-2+'px' 
      })
      .on('mouseenter', function(d){
        d3.select('.chart')
          .selectAll('span')
          .data(d)
          .enter().append('span')
          .attr('class', 'commentHover')
          .style('top', function(d, i){
            return -60+(-i*40)+'px';
          })
          .text(function(d){return (d.username + ": " + d.text)})
      })
      .on('mouseleave', function(d){
        d3.select('.chart')
          .selectAll('.commentHover')
          .remove()
      })
  }
  return ({
    graphSetup: graphSetup,
    clicked: clicked,
    graph: graph,
    resize: resize,
    hide: hideGraph
  })
})
