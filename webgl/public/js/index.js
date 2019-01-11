require(["util/domReady!",
    "game-renderer",
    "util/gl-util",
], function(doc, gameRenderer, glUtil) {
    "use strict";

    var canvas = document.getElementById("game-canvas");
    var frame = document.getElementById("game-frame");
    var fpsCounter = document.getElementById("fps");
    var gl = glUtil.getContext(canvas);

    if(!gl) {
        glUtil.showGLFailed(frame);
        return;
    }

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var renderer=  new gameRenderer.GameRenderer(gl, canvas);
    renderer.resize(gl, canvas);

    glUtil.startRenderLoop(gl, canvas, function(gl, timing) {
        fpsCounter.innerHTML = timing.framesPerSecond;
        renderer.drawFrame(gl, timing);
    });

    var fullscreenBtn = document.getElementById("fullscreen");

    document.cancelFullScreen = document.webkitCancelFullScreen || document.mozCancelFullScreen;

    var canvasOriginalWidth = canvas.width;
    var canvasOriginalHeight = canvas.height;
    fullscreenBtn.addEventListener("click", function() {
        if (frame.webkitRequestFullScreen) {
            frame.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        else if (frame.mozRequestFullScreen) {
            frame.mozRequestFullScreen();
        }
    }, false);

    function fullscreenchange() {
        if(document.webkitIsFullScreen || document.mozFullScreen) {
            canvas.width = screen.width;
            canvas.height = screen.height;
        }
        else {
            canvas.width = canvasOriginalWidth;
            canvas.height = canvasOriginalHeight;
        }
        renderer.resize(gl, canvas);
    }

    frame.addEventListener("webkitfullscreenchange", fullscreenchange, false);
    frame.addEventListener("mozfullscreenchange", fullscreenchange, false);
    frame.addEventListener("fullscreenchange", fullscreenchange, false);
});