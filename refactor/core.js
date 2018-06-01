var FPS = function() {
    this.Focus = true;
    this.store = [];
    this.storeMax = 120;
    this.len = 0;
    this.next = 0;
    this.IsFocused = function() {
        return this.Focus;
    }  
    this.CalcFPS = function() {
        sum = 0;
        for (i = 0; i < this.len; i++) {
            sum += this.store[i];
        }
        return Math.floor(1000 / (sum / this.len));
    }
    
    this.AddFPS = function(addition) {
        // if the array doesn't yet store the max number of entries...
        if (this.len < this.storeMax) {
            //...Add this entry to the array, and bump the number of entries stored.
            this.store.push(addition);
            this.next++;
            this.len++;
        }
        // If the array is storing the max number we want to store...
        else {
            // next always points to the oldest stored entry.
            if (this.len != this.storeMax) console.error("You messed up the FPS array, dummy!");
            if (this.next == this.storeMax) this.next = 0;
            this.store[this.next++] = addition;
        }
    }
};

var App = {
    FPS: null,
    Time: {
        currTime: 0,
        lastTime: 0,
        deltaTime: 0,
        elapsedTotal: 0,
        seconds: 1000,
        minutes: 60 * this.seconds,
        hours: 60 * this.minutes,
        days: 24 * this.hours,
    },

    Init: function() {
        App.FPS = new FPS();

        window.requestAnimationFrame(App.Loop);
    },

    UpdateTime: function(timestamp) {
        if (App.Time.currTime === 0) App.Time.currTime  = App.Time.lastTime = timestamp;
        App.Time.currTime = timestamp;
        App.Time.deltaTime = App.Time.currTime - App.Time.lastTime;
        App.FPS.AddFPS(App.Time.deltaTime);
        App.Time.elapsedTotal += App.Time.deltaTime;
        App.Time.elapsedSinceSpawn += App.Time.deltaTime;
        App.Time.lastTime = App.Time.currTime;
    },

    Logic: function() {

    },

    Draw: function() {
        App.DrawTitle();
    },

    Loop: function(timestamp) {
        App.UpdateTime(timestamp);
        App.Logic();
        App.Draw();
        window.requestAnimationFrame(App.Loop);
    },

    DrawTitle: function() {
        document.title = (App.FPS.IsFocused() ? "Focus" : "Blur") + " -- " + App.FPS.CalcFPS() + " FPS";
    },
};

window.onload = App.Init();

window.addEventListener('focus', function() {
    App.FPS.Focus = true;
}, false);

window.addEventListener('blur', function() {
    App.FPS.Focus = false;
}, false);