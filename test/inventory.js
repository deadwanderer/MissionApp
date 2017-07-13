var App = {
    Time: {
        currTime: 0,
        lastTime: 0,
        deltaTime: 0,
        elapsedTotal: 0,
        fps: function() {
            return App.CalcFPS();
        },
        seconds: 1000,
        minutes: 60 * this.seconds,
        hours: 60 * this.minutes,
        days: 24 * this.hours,
        timeMax: 15,
        timeMin: 5,
        RandomTime: function() {
            return Math.floor(Math.random() * (this.timeMax  - this.timeMin + 1) + this.timeMin) * this.seconds;
        },
    },

    Init: function() {

        window.requestAnimationFrame(App.Loop);
    },

    UpdateTime: function(timestamp) {
        if (App.Time.currTime === 0) App.Time.currTime  = App.Time.lastTime = timestamp;
        App.Time.currTime = timestamp;
        App.Time.deltaTime = App.Time.currTime - App.Time.lastTime;
        App.Time.elapsedTotal += App.Time.deltaTime;
        App.Time.lastTime = App.Time.currTime;
    },

    Logic: function() {

    },

    Draw: function() {

    },

    Loop: function(timestamp) {
        App.UpdateTime(timestamp);
        App.Logic();
        App.Draw();
        window.requestAnimationFrame(App.Loop);
    },
};

window.onload = App.Init();