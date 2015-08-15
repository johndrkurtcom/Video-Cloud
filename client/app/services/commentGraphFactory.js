angular.module('app.services', [])

.factory('commentGraph', function(){

  var formatTime = function(comments){
    //timelog array of array [text, text]
    var timeLog = [];
    var current = 0;
    //needs to be adjusted later
    var movieLength = 7200;
    var numBars = 30;
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
    var videoPlayerWidth = specs.width * .89;
    var videoPlayerBottom = specs.bottom + diff;
    return [videoPlayerWidth, videoPlayerBottom];
  }

  var moveGraph = function(){
    var videoplayer = d3.select('#player');
    var specs = getVideoSpecs();
    var videoPlayerBottom = specs[1];

    d3.select('.chart').on('mouseenter', function(d){
      d3.select('.chart')
        .transition()  
    }).on('mouseleave', function(){
      d3.select('.chart')
        .transition()
    })
    videoplayer.on('mouseenter', function(){
      d3.select('.chart')
        .transition()
        .style('top', function(d){
          var chart = d3.select('.chart')
            .node()
            .getBoundingClientRect()
            .height
          return (videoPlayerBottom - 50) - chart + 'px';
        })
        .style('opacity', '0.75');
    }).on('mouseleave', function(){
      d3.select('.chart')
        .transition()
        .style('top', function(){
          var chart = d3.select('.chart')
            .node()
            .getBoundingClientRect()
            .height
          return videoPlayerBottom + 30 + 'px'
        })
        .style('opacity', '1');
    });
  }


  var resize = function(comments){
    var commentWidth = getVideoSpecs()[0];
    var data = formatTime(comments);
    
      d3.select('.chart')
        .selectAll('div')
        .style('width', function(){
          return (commentWidth/(data.length))+'px';
        });
  }

  var graph = function(comments){

    var data = formatTime(comments);

    var specs = getVideoSpecs();
    var videoPlayerWidth = specs[0];
    var videoPlayerBottom = specs[1];
    
    d3.select('.chart')
      .style('top', function(){
        return videoPlayerBottom + 30 + 'px';
      })
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('height', function(d){return d.length*2+'px'})
      .style('width', function(comments){
        return (videoPlayerWidth/(data.length))+'px' 
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
    graph: graph,
    resize: resize,
    move: moveGraph
  })
})
