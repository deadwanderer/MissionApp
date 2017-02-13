var App = {
    Params: {
        Focused: true
    },

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

    TileRes: 128,
    TargetRes: 48,
    TileCols: 27,
    TileRows: 20,
    TileRef: "../img/tilesheet_complete_2X.png",
    TileSheet: false,

    Tiles: [],

    Init: function() {
        App.Time.currTime = Date.now();
        App.Time.lastTime = Date.now();
        App.LoadImages();
        if (App.Ticker === null) {
            App.Ticker = window.setTimeout(App.Loop, App.Time.seconds / (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS));
        }
    },

    LoadImages: function() {
        App.TileSheet = document.getElementById("tiles");
    },

    UpdateTime: function() {
        App.Time.currTime = Date.now();
        App.Time.deltaTime = App.Time.currTime - App.Time.lastTime;
        App.Time.elapsedTotal += App.Time.deltaTime;
        App.Time.elapsedSinceSpawn += App.Time.deltaTime;
        App.Time.lastTime = App.Time.currTime;
    },

/*
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
*/

    Logic: function() {


        /*
        App.UpdateTimers();
        App.CullLog();
        if (App.Time.elapsedSinceSpawn > App.Time.spawnTime) {
            App.SpawnCounter();
            App.Time.elapsedSinceSpawn = 0;
        }
        */
    },

    Draw: function() {
        App.DrawTitle();
        App.DrawMap();

        /*
        App.DrawCounters();
        App.DrawResources();        
        App.DrawLog();
        */
    },

    DrawTitle: function() {
        document.title = (App.Params.Focused ? "Focused" : "Blurred") + ": UpdateSpeed = " + (App.Params.Focused ? App.Time.focusFPS : App.Time.blurFPS);
    },

    DrawMap: function() {
        var c = document.getElementById("battle");
        var ctx = c.getContext('2d');

        for (var i = 0; i < App.TileCols; i++) {
            for (var j = 0; j < App.TileRows; j++) {
                x = i * App.TileRes;
                y = j * App.TileRes;
                ctx.drawImage(App.TileSheet, x, y, App.TileRes, App.TileRes, i * App.TargetRes, j * App.TargetRes, App.TargetRes, App.TargetRes);
            }
        }
    },

/*
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
*/
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
/*
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

    ShowModal: function(type, id) {
        element = document.createElement('div');
        element.id='modal';
        element.className ="vex vex-theme-os";
        content = App.ConstructModal(type, id);
        if (App.Modals++ == 0) {
            element.innerHTML = '<div class="vex-overlay"></div>';
        }
        else {
            element.innerHTML = '';
        }
        if (App.Modals > App.Messages.length) {
            return;
        }
        element.innerHTML += '<div class="vex-content"><form class="vex-dialog-form"><div class="vex-dialog-message" onclick="App.ShowModal(2, ' + App.Modals + ');">' + content + '</div><div class="vex-dialog-input"></div><div class="vex-dialog-buttons"><button class="vex-dialog-button-primary vex-dialog-button vex-first" type="button" onclick="App.HideModal(true);">OK</button></div></form></div>';
        document.querySelector('body').appendChild(element);
        $(document.body).addClass('vex-open');
    },

    ConstructModal: function(caller, id) {
        switch(caller) {
            case App.ModalTypes.MISSION:
                return "Mission Screen";
                break;
            case App.ModalTypes.HERO_SELECT:
                return "Hero Selection Screen";
                break;
            case App.ModalTypes.MESSAGE:
                return App.Messages[id];
                break;
            default:
                return "ModalType " + caller + " not found.";                
        }
    },

    HideModal: function() {        
        $(document.body.lastChild).addClass('vex-closing');
        window.setTimeout(function() {
            document.body.removeChild(document.body.lastChild);
        }, 500);
        if(App.Modals-- == 1) {
            $(document.body).removeClass('vex-open');
        }
    },

    ShowSecondModal: function(message) {
        console.log("Second modal called");
        element = document.createElement('div');
        element.id='modal2';
        element.className ="vex vex-theme-os";
        element.innerHTML = '<div class="vex-content"><form class="vex-dialog-form"><div class="vex-dialog-message">'+ message + '</div><div class="vex-dialog-input"></div><div class="vex-dialog-buttons"><button class="vex-dialog-button-primary vex-dialog-button" type="button" onclick="App.HideModal(false);">OK</button></div></form></div>';
        document.querySelector('body').appendChild(element);
    },
    */
};

window.addEventListener('focus', function() {
    App.Params.Focused = true;
    App.ResetTimeout();
}, false);

window.addEventListener('blur', function() {
    App.Params.Focused = false;
}, false);

window.onload = App.Init();