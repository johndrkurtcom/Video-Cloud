angular.module('app.services', [])

.factory('commentGraph', function(){

  var formatTime = function(comments){
    //timelog array of array [text, text]
    var timeLog = [];
    var current = 0;
    //needs to be adjusted later
    var movieLength = 600;


    for(var i=0; i<movieLength; i+=5){
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

  var graph = function(comments){

    var data = formatTime(comments);

    d3.select('.chart')
      .selectAll('div')
      .data(data)
      .enter().append('div')
      .style('height', function(d){return d.length*5+'px'})
      .style('width', function(){return (615/(data.length))-(2)+'px'})
      .on('mouseover', function(d){
        var comments = [];
        for(var i=0; i<d.length; i++){
          comments.push(d[i].text);
        }
        console.log(comments);
      })
  }
  return ({
    graph: graph,
    move: moveGraph
  })
})
