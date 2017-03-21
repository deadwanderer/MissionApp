var seconds = 1000;
var minutes = 60 * seconds;    
var hours = 60 * minutes;
var days = 24 * hours;

function timeFormat(timeInMillis) {
    var time;
    var timeRemaining = timeInMillis;
    var d = Math.floor(timeRemaining / days);
    timeRemaining -= (d * days);
    var h = Math.floor(timeRemaining / hours);
    timeRemaining -= (h * hours);
    var m = Math.floor(timeRemaining / minutes);
    timeRemaining -= (m * minutes);
    var s = Math.floor(timeRemaining / seconds);
    timeRemaining -= (s * seconds);
    time = (d > 0 ? d + " days, " : "") + (h > 0 ? h + " hours, " : "") + (m > 0 ? m + " minutes, " : "") + s
	/*+ "." + zeroPad(timeRemaining)*/
	+ " seconds";
    return time;
}

function zeroPad(num) {
    var n = Math.abs(num);
    var zeros = Math.min(0, 3 - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }
    return zeroString+n;
}

function lerpColor(c1, c2, endTime, currTime, opacity) {
    result = c1 + ((c2 - c1) * (currTime / endTime));
    if (opacity) {
        return result;
    }
    return Math.floor(result);
}

var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};

Keyboard.listenForEvents = function(keys) {
    window.addEventListener('keydown', this._onKeyDown.bind(this));
    window.addEventListener('keyup', this._onKeyUp.bind(this));

    keys.forEach(function(key) {
        this._keys[key] = false;
    }.bind(this));
}

Keyboard._onKeyDown = function(event) {
    var keyCode = event.keyCode;    
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = true;
        console.log("Key down: " + keyCode);
    }
}

Keyboard._onKeyUp = function(event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
        console.log("Key up: " + keyCode);
    }
}

Keyboard.isDown = function(keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to.');
    }
    return this._keys[keyCode];
}

CODES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function base64Decode(input) {
    if (input.length % 4 != 0) {
        return "Error: invalid base64 input!";
    }
    return atob(input);
    /*
    output = "";
    b = ["", "", "", ""];
    for (var i = 0; i < input.length; i += 4) {
        b[0] = CODES.indexOf(input.charAt(i));
        b[1] = CODES.indexOf(input.charAt(i+1));
        b[2] = CODES.indexOf(input.charAt(i+2));
        b[3] = CODES.indexOf(input.charAt(i+3));
    }
    */
}

function base64Encode(input) {
    return btoa(input);
}

function addClass(el, className) {
    if (el.classList)
	el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
	el.classList.remove(className);
    else if (hasClass(el, className)) {
	var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
	el.className = el.className.replace(reg, ' ');
    }
}
