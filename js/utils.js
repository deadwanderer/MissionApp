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
    time = (d > 0 ? d + " days, " : "") + (h > 0 ? h + " hours, " : "") + (m > 0 ? m + " minutes, " : "") + s + "." + zeroPad(timeRemaining) + " seconds";
    return time;
}

function zeroPad(num) {
    var n = Math.abs(num);
    var zeros = Math.max(0, 3 - Math.floor(n).toString().length );
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