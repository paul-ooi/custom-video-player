<?php
$video_mp4 = "videos/Not-Eiffel.mp4";
$video_webm = "videos/Not-Eiffel.webm";
$video_ogg = "videos/Not-Eiffel.ogv";
$video_poster = "videos/Not-Eiffel.jpg";
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="styles.css" type="text/css" rel="stylesheet"/>
        <title>Learning Video Tag</title>
    </head>
    <body>
        <h1>Experimenting with HTML</h1>
        <div class="video-container">
            <figure id="videoContainer">
                <video id="video" controls muted preload="none" poster="<?php echo $video_poster; ?>">
                    <source src="<?php echo $video_mp4; ?>" type="video/mp4" />
                    <source src="<?php echo $video_webm; ?>" type="video/webm" />
                    <source src="<?php echo $video_ogg; ?>" type="video/ogg" />
                    <p>Sorry, your browser doesn't support embedded videos. <a href="<?php echo $video_mp4; ?>">Download</a>
                    the video to watch on your device.</p>
                </video>
                <ul id="video-controls" class="controls">
                    <li><button id="playpause" type="button">Play/Pause</button></li>
                    <li><button id="stop" type="button">Stop</button></li>
                    <li class="progress">
                        <progress id="progress" value="0" min="0">
                            <span id="progress-bar"></span>
                        </progress>
                    </li>
                    <li><button id="mute" type="button">Mute/Unmute</button></li>
                    <li><button id="volinc" type="button">Vol+</button></li>
                    <li><button id="voldec" type="button">Vol-</button></li>
                    <li><button id="fs" type="button">Fullscreen</button></li>
                </ul>
            </figure>
        </div>
        <script src="assets/js/scripts.js"></script>
    </body>
</html>