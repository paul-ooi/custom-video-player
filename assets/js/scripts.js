var supportsVideo = !!document.createElement('video').canPlayType;
if (supportsVideo) {

    // set up custom controls
    var videoContainer = document.getElementById('videoContainer');
    var video = document.getElementById('video');
    var videoControls = document.getElementById('video-controls');

    var playpause = document.getElementById('playpause');
    var stop = document.getElementById('stop');
    var mute = document.getElementById('mute');
    var volinc = document.getElementById('volinc');
    var voldec = document.getElementById('voldec');
    var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
    var fullscreen = document.getElementById('fs');

    //Check if the browser supports the Progress element
    var supportsProgress = (document.createElement('progress').max !== undefined);
    if (!supportsProgress) progress.setAttribute('data-state', 'fake');

    //Check if Fullscreen API is supported
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

    if (!fullScreenEnabled) {
        fullscreen.style.display = 'none';
    }

    console.log(video);
    console.log("hello");
    
    // Hide the default controls on load
    video.controls = false;

    videoContainer.addEventListener("mouseover", function(e) {
        // Show the default controls
        // video.controls = true;

        // Display the user defined video controls
        videoControls.setAttribute('data-state', 'visible');
    })
    videoContainer.addEventListener("mouseout", function(e) {
        // Hide the default controls
        // video.controls = false;

        // Hide the user defined video controls
        videoControls.setAttribute('data-state', '');
    })
    

    // // Display the user defined video controls
    // videoControls.style.display = 'block';

    // control functions
    var changeButtonState = function (type) {
        // Play/Pause button
        if (type == 'playpause') {
            if (video.paused || video.ended) {
                playpause.setAttribute('data-state', 'play');
            }
            else {
                playpause.setAttribute('data-state', 'pause');
            }
        }
        // Mute button
        else if (type == 'mute') {
            mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
        }
    }

    var checkVolume = function (dir) {
        if (dir) {
            var currentVolume = Math.floor(video.volume * 10) / 10;
            if (dir === '+') {
                if (currentVolume < 1) video.volume += 0.1;
            } else if (dir === '-') {
                if (currentVolume > 0) video.volume -= 0.1;
            }
            // If the volume has been turned off, also set it as muted
            // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
            if (currentVolume <= 0) video.muted = true;
            else video.muted = false;
        }
        changeButtonState('mute');
    }

    var alterVolume = function (dir) {
        checkVolume(dir);
    }

    var isFullScreen = function () {
        return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

    var handleFullscreen = function () {
        if (isFullScreen()) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
            setFullscreenData(false);
        }
        else {
            if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
            else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
            else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
            else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
            setFullscreenData(true);
        }
    }

    var setFullscreenData = function (state) {
        videoContainer.setAttribute('data-fullscreen', !!state);
    }

    video.addEventListener('play', function () {
        changeButtonState('playpause');
    }, false);
    video.addEventListener('pause', function () {
        changeButtonState('playpause');
    }, false);
    stop.addEventListener('click', function (e) {
        video.pause();
        video.currentTime = 0;
        progress.value = 0;
        // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
        changeButtonState('playpause');
    });
    mute.addEventListener('click', function (e) {
        video.muted = !video.muted;
        changeButtonState('mute');
    });

    //if user accesses the play/pause via context menu
    playpause.addEventListener('click', function (e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
    });

    //Change volume and mute when volume change event is raised
    video.addEventListener('volumechange', function () {
        checkVolume();
    }, false);

    //Skip ahead in progress bar, update time
    video.addEventListener('loadedmetadata', function () {
        progress.setAttribute('max', video.duration);
    });

    video.addEventListener('timeupdate', function () {
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
    });

    video.addEventListener('timeupdate', function () {
        if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
    });

    progress.addEventListener('click', function (e) {
        var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
        video.currentTime = pos * video.duration;
    });

    //Handle Fullscreen events
    fs.addEventListener('click', function (e) {
        handleFullscreen();
    });

    document.addEventListener('fullscreenchange', function (e) {
        setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
    });
    document.addEventListener('webkitfullscreenchange', function () {
        setFullscreenData(!!document.webkitIsFullScreen);
    });
    document.addEventListener('mozfullscreenchange', function () {
        setFullscreenData(!!document.mozFullScreen);
    });
    document.addEventListener('msfullscreenchange', function () {
        setFullscreenData(!!document.msFullscreenElement);
    });
}