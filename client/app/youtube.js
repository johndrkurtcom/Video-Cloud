var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("onYouTubeIframeAPIReady() ------->");
  player = new YT.Player('player', {
    height: '390',
    width: '90%',
    playerVars: { 'controls': 1, 'start': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  window.player = player; 
} //onYouTubeIframeAPIReady()

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

}//onPlayerReady()

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {

}//onPlayerStateChange()
function stopVideo() {
  player.stopVideo();
}//onPlayerStateChange()
