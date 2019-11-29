import enterView from './sticky';

import videos from '../videos/*.mp4';

console.log(videos);

const update = (playbackConst, vid) => {
  enterView({
    selector: 'section',
    enter: function(el) {
      el.classList.add('entered');
    }
  });

  var frameNumber = 0, // start video at frame 0
    // lower numbers = faster playback

    // get page height from video duration
    setHeight = document.getElementById('set-height');
  // select video element

  // var vid = $('#v0')[0]; // jquery option

  // dynamically set the page height according to video length
  vid.addEventListener('loadedmetadata', function() {
    setHeight.style.height = Math.floor(vid.duration) * playbackConst + 'px';
  });

  // Use requestAnimationFrame for smooth playback
  function scrollPlay() {
    var frameNumber =
      (window.pageYOffset || document.body.scrollTop) / playbackConst;
    vid.currentTime = frameNumber;
    window.requestAnimationFrame(scrollPlay);
  }

  window.requestAnimationFrame(scrollPlay);
};

const load = () => {
  const name = decodeURI(window.location.hash.substring(1));

  if (videos[name]) {
    const vid = document.createElement('video');

    vid.setAttribute('autobuffer', true);
    vid.setAttribute('preload', true);

    vid.src = videos[name];

    vid.id = 'v0';

    document.getElementById('v0').replaceWith(vid);
    const arr = name.split(' ');
    update(Number(arr.pop()), vid);

    document.getElementById('title').innerText = arr.join(' ');
  }
};

window.onhashchange = load;

load();

/* Get the element you want displayed in fullscreen mode (a video in this example): */
var elem = document.body;

/* When the openFullscreen() function is executed, open the video in fullscreen.
Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

document.body.onclick = openFullscreen;
