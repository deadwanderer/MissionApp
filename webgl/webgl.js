"use strict";

function main() {
    // Get a WebGL context
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById("c");
    var gl = canvas.getContext("webgl");
    if (!gl) return;

    // Set up GLSL program
    var program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);
}
var translation = [0, 0];
var width = 100;
var height = 30;
var color = [Math.random(), Math.random(), Math.random(), 1];

// Draw the scene
function drawScene() {
    webglUtils.resize(gl);
}