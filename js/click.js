var App = {
    clicks: 0,
    eventLog: [],
    maxLogLength: 10,

    doClick: function() {
        App.clicks++;
        App.eventLog.push("Button clicked " + App.clicks + " times.");
        App.updateInterface();
    },

    updateInterface: function() {
        App.cullLog();
        var output = "";
        for (i = 0; i < App.eventLog.length; i++) {
            output += "<p>" + App.eventLog[i] + "</p>";
        }
        document.getElementById("log").innerHTML = output;
        document.getElementById("upgrades").innerHTML = "<p>Clicks: " + App.clicks + "</p>";
    },

    cullLog: function() {
        while (App.eventLog.length > App.maxLogLength) {
            App.eventLog.splice(0, 1);
        }
    },

    init: function() {
        App.clicks = 0;
        App.updateInterface();
    }
};

window.onload = App.init();