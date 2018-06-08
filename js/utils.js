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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
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
    }
}

Keyboard._onKeyUp = function(event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        event.preventDefault();
        this._keys[keyCode] = false;
    }
}

Keyboard.isDown = function(keyCode) {
    if (!keyCode in this._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to.');
    }
    return this._keys[keyCode];
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

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function getActiveMissionRowId(node) {
    while (node.nodeName !== 'TR') {
        node = node.parentElement;
    }
    return node.id.split("am")[1];
}

function getAvailableMissionRowId(node) {
    while (node.nodeName !== 'TR') {
        node = node.parentElement;
    }
    return node.id.split("vm")[1];
}

function getHeroRowId(node) {
    while (node.nodeName !== 'TR') {
        node = node.parentElement;
    }
    return node.id.split("crew")[1];
}
