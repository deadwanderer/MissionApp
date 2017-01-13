var App = {
    Params: {
        Focused: true
    },

    Counters: [],
    FlashTime: 250,
    FlashHeight: 50,
    CounterNum: 0,

    Resources: {
        resourceMax: 500,
        resourceMin: 10,
        resourceMult: 25,
    },

    ResourceList: {
        Stone: 0,
        Food: 0,
        Leather: 0,
        Gold: 0
    },

    LogLines: [],
    LogID: 0,
    LogFadeAfterTime: 10,
    LogFadeTime: 2000,
    LogMaxLength: 15,

    ResourceType: ["Stone", "Food", "Leather", "Gold"],

    Ticker: null,

    Time: {
        currTime: 0,
        lastTime: 0,
        deltaTime: 0,
        elapsedTotal: 0,
        focusFPS: 60,
        blurFPS: 10,
        seconds: 1000,
        minutes: 60 * this.seconds,
        hours: 60 * this.minutes,
        days: 24 * this.hours,
        timeMax: 25,
        timeMin: 3,
        RandomTime: function() {
            return Math.floor(Math.random() * (this.timeMax  - this.timeMin + 1) + this.timeMin) * this.seconds;
        },

        spawnTime: 5000,
        elapsedSinceSpawn: 0,
    },

    Init: function() {
        App.Time.currTime = Date.now();
        App.Time.lastTime = Date.now();
        $("#log").on("wheel", function() {
            App.RefreshLogDraw();
        });
        $("#log").on("scroll", function() {
            App.RefreshLogDraw();
        });
        App.SpawnCounter();
        if (App.Ticker === null) {
            App.Ticker = window.setTimeout(App.Loop, App.Time.seconds / (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS));
        }
    },

    UpdateTime: function() {
        App.Time.currTime = Date.now();
        App.Time.deltaTime = App.Time.currTime - App.Time.lastTime;
        App.Time.elapsedTotal += App.Time.deltaTime;
        App.Time.elapsedSinceSpawn += App.Time.deltaTime;
        App.Time.lastTime = App.Time.currTime;
    },

    UpdateTimers: function() {
        for (i = 0; i < App.Counters.length; i++) {
            counter = App.Counters[i];
            counter.elapsedTime += App.Time.deltaTime;
            if (counter.elapsedTime >= counter.runTime) {
                counter.flashTime += App.Time.deltaTime;                
            }
            if (counter.flashTime >= App.FlashTime) {
                if (counter.func) {
                    counter.func(counter);
                }
                App.Counters.splice(i, 1);
            }
        }
    },

    Logic: function() {
        App.UpdateTimers();
        App.CullLog();
        if (App.Time.elapsedSinceSpawn > App.Time.spawnTime) {
            App.SpawnCounter();
            App.Time.elapsedSinceSpawn = 0;
        }
    },

    Draw: function() {
        App.DrawCounters();
        App.DrawResources();
        App.DrawTitle();
        App.DrawLog();
    },

    DrawTitle: function() {
        document.title = (App.Params.Focused ? "Focused" : "Blurred") + ": UpdateSpeed = " + (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS);
    },

    DrawCounters: function() {
        text = "";
        for (i = 0; i < App.Counters.length; i++) {            
            counter = App.Counters[i];
            text += "<tr><td>";
            text += counter.cName;
            text += "</td><td>";
            text += timeFormat(counter.runTime);
            text += "</td><td>";
            if (counter.elapsedTime <= counter.runTime) {
                width = (counter.elapsedTime / counter.runTime) * 100;
                textWidth = Math.round(width);
                text += "<div class='myProgress'><div class='myBar' style='width:" + width + "%;'></div><span class='barText'>"
                + (textWidth > 100 ? 100 : textWidth) + "%</span></div></td></tr>";
            }
            else if (counter.flashTime <= App.FlashTime) {
                heightAdd = Math.round((counter.flashTime / App.FlashTime) * App.FlashHeight);
                width = 250 + heightAdd;
                height = 25 + heightAdd;
                margin = heightAdd / 2;
                text += "<div class='myProgress flashProgress' style='height:" + height + "px; width:" 
                + width + "px; margin:-" + margin + "px -" + margin 
                + "px;'><div class='myBar flashBar' style='width:100%;background-color:rgb(" 
                + lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(counter.flashTime), false) + ","
                + lerpColor(205, 255, Math.sqrt(App.FlashTime), Math.sqrt(counter.flashTime), false) + ","
                + lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(counter.flashTime), false) + ");opacity:"
                + lerpColor(1, 0, App.FlashTime * App.FlashTime, counter.flashTime * counter.flashTime, true) + ";'></div></div></td></tr>";
            }
        }
        document.getElementById("activeMissionList").innerHTML = text;
    },

    DrawResources: function() {
        text = "";
        for (i = 0; i < App.ResourceType.length; i++) {
            text += "<tr><td>";
            text += App.ResourceType[i];
            text += "</td><td>";
            text += App.ResourceList[App.ResourceType[i]];
            text += "</td></tr>";
        }
        document.getElementById("resourceList").innerHTML = text;
    },

    DrawLog: function() {
        if (App.LogLines.length > App.LogMaxLength) {
            App.CullLog();
        }
        for (var i = 0; i < App.LogLines.length; i++) {
            App.LogLines[i].time -= App.Time.deltaTime;
            if (App.LogLines[i].time <= 0) {
                App.LogLines[i].fading = true;
            }
            if (App.LogLines[i].fading) {
                App.LogLines[i].fadeTime -= App.Time.deltaTime;
                App.LogLines[i].opacity = App.LogLines[i].fadeTime / App.LogFadeTime;                
                if (App.LogLines[i].opacity <= 0.0) {
                    App.LogLines[i].opacity = 0.0;
                    App.LogLines[i].faded = true;
                    App.LogLines[i].fading = false;
                }                
            }
            document.getElementById(App.LogLines[i].id).style.opacity = App.LogLines[i].opacity;
        }
    },

    CullLog: function() {
        if (App.LogLines.length > App.LogMaxLength) {
            while (App.LogLines.length > App.LogMaxLength) {
                $("#" + App.LogLines[0].id).remove();
                App.LogLines.splice(0, 1);
            }
        }
    },

    RefreshLogDraw: function() {
        for (var i = 0; i < App.LogLines.length; i++) {
            if (App.LogLines[i].fading) {
                App.LogLines[i].fading = false;                
            }
            if (App.LogLines[i].faded) {
                App.LogLines[i].faded = false;
            }
            App.LogLines[i].time = App.LogFadeAfterTime * App.Time.seconds;
            App.LogLines[i].fadeTime = App.LogFadeTime;
            App.LogLines[i].opacity = 1.0;     
        }
    },

    Loop: function() {
        App.UpdateTime();
        App.Logic();
        App.Draw();
        App.Ticker = window.setTimeout(App.Loop, App.Time.seconds / (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS));
    },

    ResetTimeout: function() {
        clearTimeout(App.Ticker);
        App.Loop();
    },

    Counter: function(name, time, resource, func) {
        this.cName = name;
        this.runTime = time;
        this.startTime = Date.now();
        this.elapsedTime = 0;
        this.flashTime = 0;
        this.resource = resource;
        if (func === undefined) {
            this.func = null;
        } else {
            this.func = func;
        }
        var self = this;
        this.getName = function() {
            return self.cName;
        };
        this.getResources = function() {
            return self.resource;
        }     
    },

    Resource: function(name, amount) {
        this.name = name;
        this.amount = amount;  
        this.getName = function() {
            return this.name;
        }
        this.getAmount = function() {
            return this.amount;
        }
    },

    AddResources: function(counter) {
        App.ResourceList[counter.getResources().getName()] += counter.getResources().getAmount();
        App.Log("Received " + counter.getResources().getAmount() + " " + counter.getResources().getName());
    },

    SpawnCounter: function() {
        var name = "Mission " + (++App.CounterNum);
        var time = App.Time.RandomTime();
        var resAmt = Math.floor(Math.random() * (App.Resources.resourceMax - App.Resources.resourceMin + 1) + App.Resources.resourceMin) * App.Resources.resourceMult;
        var resName = App.ResourceType[Math.floor(Math.random() * App.ResourceType.length)];
        var res = new App.Resource(resName, resAmt);
        var counter = new App.Counter(name, time, res, App.AddResources);
        App.Counters.push(counter);
        App.Log("Spawned new Counter " + name + ", lasting " + timeFormat(time) + ", bringing back " + resAmt + " " + resName+ ".");
    },

    Log: function(text) {
        id = "Log" + App.LogID++;
        index = App.LogLines.push({id: id, time: App.LogFadeAfterTime * App.Time.seconds, opacity: 1.0, fadeTime: App.LogFadeTime, fading: false, faded: false}) - 1;
        para = document.createElement("P");
        para.id = id;
        line = document.createTextNode(text);
        para.appendChild(line);
        log = document.getElementById("log");      
        log.insertBefore(para, log.childNodes[0]);
    },

    ShowModal: function() {
        vex.dialog.alert({ unsafeMessage: "<div class='myProgress' onclick='App.ShowSecondModal();'><div class='myBar' style='width:24%;'></div><span class='barText'>24%</span></div>"});
    },

    ShowSecondModal: function() {
        vex.dialog.confirm({
            message: "Just testing!",
            callback: function() {
                console.log("Second modal called back!");
            }
        });
    },
};

window.addEventListener('focus', function() {
    App.Params.Focused = true;
    App.ResetTimeout();
}, false);

window.addEventListener('blur', function() {
    App.Params.Focused = false;
}, false);

window.onload = App.Init();