  var player;
  function onYouTubePlayerAPIReady() {
      player = new YT.Player('player', {
        height: '500',
        width: '640',
        playerVars: { 'controls': 0, 'start': window.timeDiff },
        videoId: 'nS68JH9lFEs',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      }); //player

    window.player = player;
  } //onYoutubePlayerAPIReady()
  // autoplay video
  function onPlayerReady(event) {
    console.log("inside onPlayerReady");
  
    window.videoPlayer = event.target; 
    // window.player = event.target
  } // onPlayerReady()

  // when video ends
  function onPlayerStateChange(event) {        
  //     if(event.data === 0) {            
  //         alert('done');
  //     }
  } // onPlayerStateChange()
// setTimeout(function(){

// }, 1000)
