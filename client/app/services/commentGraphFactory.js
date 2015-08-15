angular.module('app.services', [])

.factory('commentGraph', function(){

  var formatTime = function(comments){
    //timelog array of array [text, text]
    var timeLog = [];
    var current = 0;
    //needs to be adjusted later
    var movieLength = 7200;
    var numBars = 150;
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

  var moveGraph = function(){
    var videoplayer = d3.select('#player')
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
          return 460 - chart + 'px';
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
          return '555' - chart + 'px'
        })
        .style('opacity', '1');
    });
  }

  var graph = function(comments){

    var data = formatTime(comments);

    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('height', function(d){return d.length*2+'px'})
      .style('width', function(){return (615/(data.length))-(2)+'px'})
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
    move: moveGraph
  })
})
