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

  var graph = function(timeStamps, movieLength){
    var data = formatTime(timeStamps, movieLength);

    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('height', function(d){return d*5+'px'})
      .style('width', function(){return 400/(data.length)+'px'})
  }
  return ({
    graph: graph
  })
})
