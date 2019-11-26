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
    var frameNumber = window.pageYOffset / playbackConst;
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
