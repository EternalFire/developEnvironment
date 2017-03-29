import React from 'react';

import 'video.js'
// import 'video-js.min.css'
import 'video.js/dist/video-js.min.css'

const Example = () => {
  var options = {

  }

  // var player = videojs('my-player', options, function onPlayerReady() {
  //   videojs.log('Your player is ready!');
   
  //   // // In this context, `this` is the player that was created by Video.js. 
  //   // this.play();
   
  //   // // How about an event listener? 
  //   // this.on('ended', function() {
  //   //   videojs.log('Awww...over so soon?!');
  //   // });
  // });

  // console.log(player)

  return (
    <div>
      Example Page
      <video id="my-player" 
        className="video-js"
        controls 
        data-setup='{}'
      >
        <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
      </video>
    </div>
  );
};

Example.propTypes = {
};

export default Example;
