angular.module('app.services', [])

.factory('commentGraph', function(){

  var formatTime = function(timeStamps, movieLength){
    var timeLog = [];
    var current = 0;
    timeStamps = timeStamps.sort();

    for(var i=0; i<movieLength; i+=5){
      var count = 0;
      while(timeStamps[current] < i+5){
        count ++;
        current ++;
      }
      timeLog.push(count);
      count = 0;
    }
    return timeLog;
  }

  var moveGraph = function(){
    var videoplayer = d3.select('#player')
    d3.select('.chart').on('mouseenter', function(d){
      d3.select('.chart')
        .transition()  
        // .selectAll('div')
        // .style('opacity', '0.5')
    }).on('mouseleave', function(){
      d3.select('.chart')
        .transition()
        // .selectAll('div')
        // .style('opacity', '0')
    })
    videoplayer.on('mouseenter', function(){
      d3.select('.chart')
        .transition()
        .style('top', '430px')
        // .selectAll('div')
        .style('opacity', '0.5');
    }).on('mouseleave', function(){
      d3.select('.chart')
        .transition()
        .style('top', '520px')
        // .selectAll('div')
        .style('opacity', '1');
    });
  }

  var graph = function(timeStamps, movieLength){
    var data = formatTime(timeStamps, movieLength);

    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('height', function(d){return d*5+'px'})
      .style('width', function(){return (615/(data.length))-(2)+'px'})
      .on('mouseover', function(d){console.log(d)})
  }
  return ({
    graph: graph,
    move: moveGraph
  })
})
