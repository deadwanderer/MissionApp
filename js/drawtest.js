var App = {
    Params: {
        Focused: true
    },
    FPSStore: [],
    FPSStoreMax: 120,
    FPSLength: 0,
    FPSNextAdd: 0,
    CalcFPS: function() {
        sum = 0;
        for (i = 0; i < App.FPSLength; i++) {
            sum += App.FPSStore[i];
        }
        return Math.floor(1000 / (sum / App.FPSLength));
    },

    AddFPS: function(addition) {
        // if the array doesn't yet store the max number of entries...
        if (App.FPSLength < App.FPSStoreMax) {
            //...Add this entry to the array, and bump the number of entries stored.
            App.FPSStore.push(addition);
            App.FPSNextAdd++;
            App.FPSLength++;
        }
        // If the array is storing the max number we want to store...
        else {
            // FPSNextAdd always points to the oldest stored entry.
            if (App.FPSLength != App.FPSStoreMax) console.error("You messed up the FPS array, dummy!");
            if (App.FPSNextAdd == App.FPSStoreMax) App.FPSNextAdd = 0;
            App.FPSStore[App.FPSNextAdd++] = addition;
        }
    },

    fullDraw: false,

    Counters: [],
    FlashTime: 300,
    FlashHeight: 75,
    CounterNum: 0,

    Resources: {
        resourceMax: 500,
        resourceMin: 10,
        resourceMult: 1,
    },

    ResourceList: {
        Stone: 0,
        Food: 0,
        Leather: 0,
        Gold: 0,
        Cloth: 0,
        Steel: 0,
        Wood: 0
    },

    NextMissionID: 1,
    AvailableMissions: [],
    ActiveMissions: [],
    MissionsToGenAtInit: 5,

    Crew: [],
    CrewToGenerateAtInit: 5,

    EnemyID: 1,
    Enemies: [], 

    LevelXP: [100, 110, 130, 150, 170, 190, 210, 240, 270, 300, 
              330, 370, 410, 460, 510, 570, 630, 700, 770, 850, 
              940, 1040, 1150, 1270, 1400, 1540, 1700, 1870, 2060, 2270, 
              2500, 2750, 3030, 3340, 3680, 4050, 4460, 4910, 5410, 5960, 
              6560, 7220, 7950, 8750, 9630, 10600, 11660, 12830, 14120, 15540, 
              17100, 18810, 20700, 22770, 25050, 27560, 30320, 33360, 36700, 40370, 
              44410, 48860, 53750, 59130, 65050, 71560, 78720, 86600, 95260, 104790, 
              115270, 126800, 139480, 153430, 168780, 185660, 204230, 224660, 247130, 271850, 
              299040, 328950, 361850, 398040, 437850, 481640, 529810, 582800, 641080, 705190, 
              775710, 853290, 938620, 1032490, 1135740, 1249320, 1374260, 1511690, 1662860, 1829150],
    MaxLevel: 100,

    LogLines: [],
    LogID: 0,
    LogFadeAfterTime: 10,
    LogFadeTime: 2000,
    LogMaxLength: 15,

    ResourceType: ["Stone", "Food", "Leather", "Gold", "Cloth", "Steel", "Wood"],

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

        spawnTime: 2000,
        elapsedSinceSpawn: 0,
    },
    Modals: 0,
    ModalBuild: {
        normalstartText: '<div class="vex-content vex-normal"><form class="vex-dialog-form"><div class="vex-dialog-message" ',
        widestartText: '<div class="vex-content vex-wide"><form class="vex-dialog-form"><div class="vex-dialog-message" ',
        secondModalStart: 'onclick="App.ShowModal(',
        secondModalEnd: ');"',
        startCloseText: '>', 
        endText: '</div><div class="vex-dialog-input"></div><div class="vex-dialog-buttons"><button class="vex-dialog-button-primary vex-dialog-button vex-first" type="button" onclick="App.HideModal();">OK</button></div></form></div>',
        ModalTypes: {
            MISSION: 0,
            HERO_SELECT: 1,
            MESSAGE: 2,
        }
    },

    Messages: [
        "A Message", 
        "<p>Test Message</p>", 
        "<h2>Third Message</h2>", 
        "<p>New Message that's really long to test wrapping and modal width. Is it limited? Is it locked? Who knows? Hopefully we soon will!</p><ul><li>Option 1</li><li>Option 2</li><li>Option Three</li></ul>",
    ],

    Init: function() {
        $("#log").on("wheel", function() {
            App.RefreshLogDraw();
        });
        $("#log").on("scroll", function() {
            App.RefreshLogDraw();
        });
        App.MissionsToGenAtInit = 5;
        App.AvailableMissions = [];
        App.InitArrays();
        //App.SpawnCounter();
        App.GenerateCrew();
        App.GenerateMissions();
        console.log("Missions to generate: " + App.MissionsToGenAtInit);
        console.log("Missions generated: " + App.AvailableMissions.length);
        window.requestAnimationFrame(App.Loop);        
    },

    InitArrays: function() {
        App.Specializations.push(new App.Specialization("Bloodlust", "A born warrior, who lives for the onrush of battle."));
        App.Specializations.push(new App.Specialization("Keen Eye", "An eagle-eyed hunter, finder of hidden things."));
        App.Specializations.push(new App.Specialization("Unflinching", "With nerves of steel, this guardian stands unbending."));
        App.Specializations.push(new App.Specialization("Stealthy", "Just a whisper on the wind, a mere flicker at the edge of vision, quick to the find, and quick to escape."));
        App.Specializations.push(new App.Specialization("Thaumaturge", "Ancient magics snake in tendrils from the scholar's learned fingertips."));

        App.HeroAbilities.push(new App.HeroAbility("Unbreaking Bulwark", "Your blacksmiths have crafted reinforced shields, which your stoutest fighters wield to repulse even the mightiest blows.", 0, 0));
        App.HeroAbilities.push(new App.HeroAbility("Storm Of Fire", "Your mages conjure a whirling tower of flame, cowing the enemy minions into desperate flight.", 0, 1));
        App.HeroAbilities.push(new App.HeroAbility("Melt Steel", "Searing blasts of arcane heat from your mages reduce enemy armor to dripping puddles, revealing the soft flesh beneath, ripe for the cutting.", 0, 2));
        App.HeroAbilities.push(new App.HeroAbility("Quenching Rain", "Your shamans whisper stormwords, bringing great rainshowers to bear on the threatening flames. Soon, only wisps of steam remain.", 1, 3));
        App.HeroAbilities.push(new App.HeroAbility("Arcane Annulment", "Energy barriers block the arcane energy, and the blasts bounce harmlessly back into the ether.", 1, 4));
        App.HeroAbilities.push(new App.HeroAbility("Dispel Magic", "Your mages' gutteral phrases send runic lightning blasting through the enemy spellshields, shattering the glimmering defenses.", 1, 5));
        App.HeroAbilities.push(new App.HeroAbility("Hymn Of Courage", "Your bards' strong voices waft in song over your troops, raising a bold chant to the skies, and bringing courage rushing back to wavering hearts.", 2, 6));
        App.HeroAbilities.push(new App.HeroAbility("Heroic Stance", "Your champions plant themselves in fearless bearing, a sturdy example that bolsters your troops and grants fresh boldness.", 2, 7));
        App.HeroAbilities.push(new App.HeroAbility("Death Hath No Fury", "One of your bards cracks a crude joke about the enemy, and the ensuing laughter cuts through the mental fog, revealing promise of great glory in battle.", 2, 8));
        App.HeroAbilities.push(new App.HeroAbility("Scorch", "A quick-thinking mage wreathes you in a flash of fire that burns away all bindings, and leaves a nice new sheen on your armor, to boot!", 3, 9));
        App.HeroAbilities.push(new App.HeroAbility("Invigorate", "Your commissary brings steaming draughts of sharp liquor, that burns all sluggishness away as it courses through your body.", 3, 10));
        App.HeroAbilities.push(new App.HeroAbility("Levitate", "Your mages twist spacetime briefly, pulling you up from the mire and allowing your company to float to solid ground.", 3, 11));
        App.HeroAbilities.push(new App.HeroAbility("Cushioned Saddle", "Your sure-footed horses can pick their way through all dangers of the road, and your saddle's padding prevents soreness at the end of the bumpy day.", 4, 12));
        App.HeroAbilities.push(new App.HeroAbility("Friends In High Places", "A quick missive to your cousin at court grants you a diplomatic visa, and a full refund for all tolls incurred.", 4, 13));
        App.HeroAbilities.push(new App.HeroAbility("Teleport", "Arcanic stones are expensive, sure, but the portals you open with them to allow instantaneous transfers of supplies are still far cheaper than the price-gouging mule-train owners.", 4, 14));

        App.EnemyAbilities.push(new App.EnemyAbility("Crushing", "This enemy rains heavy blows upon foes, demolishing armor and breaking bones.", 0, 0));
        App.EnemyAbilities.push(new App.EnemyAbility("Horde", "This enemy has an entourage of footsoldiers, threatening to overwhelm any who approach.", 0, 1));
        App.EnemyAbilities.push(new App.EnemyAbility("Armored", "Thick plates of sturdy metals deflect even the fiercest blows, giving blades no purchase and no hope of victory.", 0, 2));
        App.EnemyAbilities.push(new App.EnemyAbility("Fireblast", "An explosion of flame and heat sears skin and turns armor from protecting shell to infernal entrapment.", 1, 3));
        App.EnemyAbilities.push(new App.EnemyAbility("Arcane Storm", "The air glows and cracks with blue-white magic, and eldritch tendrils snake through metal and hide alike, lashing the life beneath.", 1, 4));
        App.EnemyAbilities.push(new App.EnemyAbility("Rune Of Aegis", "An impassable barrier of pure mana prevents all foes from approaching the caster.", 1, 5));
        App.EnemyAbilities.push(new App.EnemyAbility("Intimidate", "The necklace of scalps, the blood-drenched blade, and the smoldering eyes signal that this enemy harbors great skill in battle, and no mercy for attackers.", 2, 6));
        App.EnemyAbilities.push(new App.EnemyAbility("Reaving Shout", "A fearsome roar that somehow carries both physical and psychic force, chilling the hearts of all who hear it.", 2, 7));
        App.EnemyAbilities.push(new App.EnemyAbility("Aura Of Bones", "Death seeps in ashen strands from the fingers of this enemy, and foliage withers to dust as they pass.", 2, 8));
        App.EnemyAbilities.push(new App.EnemyAbility("Web", "Sticky cords wrap around you, encasing your extremities in an entangling mesh.", 3, 9));
        App.EnemyAbilities.push(new App.EnemyAbility("Torpor", "A heavy weariness seeps through your blood, and your legs become too heavy to lift. All you want is to close your leaden eyes and leave your toils forever.", 3, 10));
        App.EnemyAbilities.push(new App.EnemyAbility("Quagmire", "The solid grounds suddenly gives way to sucking muck, that grasps at your legs and pulls you down towards its dark and inexorable depths.", 3, 11));
        App.EnemyAbilities.push(new App.EnemyAbility("Rough Terrain", "These paths have seen no travelers for an age, and thick roots and vines obscure the sharp rocks and dangerous holes beneath. One wrong step threatens to snap bones and shatter equipment, and your staff balks without hazard pay.", 4, 12));
        App.EnemyAbilities.push(new App.EnemyAbility("Toll Roads", "Your convoy passes through a foreign country with heavy fees for those who are merely visiting. Next time, maybe buy something while you're passing through!", 4, 13));
        App.EnemyAbilities.push(new App.EnemyAbility("In The Sticks", "Your destination lies far from any supply depot, and you are forced to import supplies by mule, whose owners demand a high premium.", 4, 14));
        
        App.MissionTypes.push(new App.MissionType("Kill", "Defeat your foes.", 0));
        App.MissionTypes.push(new App.MissionType("Collect", "Find helpful supplies.", 1));
        App.MissionTypes.push(new App.MissionType("Defend", "Repel the invaders.", 2));
        App.MissionTypes.push(new App.MissionType("Scout", "Survey new territories.", 3));
        App.MissionTypes.push(new App.MissionType("Ward", "Protect against encroaching magic.", 4));

        App.EnemyAbilityTypes.push(new App.AbilityType("Reduced success chance: physical", 
            "Overwhelming force cows all but the most stalwart, threatening to turn victory into defeat."));
        App.EnemyAbilityTypes.push(new App.AbilityType("Reduced success chance: magic",
            "Neither blade nor bow nor buckler can stand against the ancient rites, and warriors' boldness turns to blanching retreat."));
        App.EnemyAbilityTypes.push(new App.AbilityType("Reduced success chance: mental",
            "Sword and spell cannot avail once fear and doubt enter the mind, and fear of defeat makes the defeat all the more certain."));
        App.EnemyAbilityTypes.push(new App.AbilityType("Increased mission time",
            "Though courage flags not, both enemies and elements conspire to delay and impede, doing all they may to avoid or postpone the conflict."));
        App.EnemyAbilityTypes.push(new App.AbilityType("Increased mission cost",
            "Strength and steel alone do not win the war; blades do not swing without the backing of pay and provisions."));

        App.HeroAbilityTypes.push(new App.AbilityType("Increased success chance: physical",
            "Fearless in the fray, unshaken in the onrush, the unbowed strength of the guardian forges victory from daunting odds."));
        App.HeroAbilityTypes.push(new App.AbilityType("Increased success chance: magic",
            "Not all magical arts destroy; the wise wizards also use their arcanism to defend and heal their companions, and negate enemy magicks."));
        App.HeroAbilityTypes.push(new App.AbilityType("Increased success chance: mental",
            "Steadying the mind and drawing courage from comrades will steady the hands and draw battle lines more amenable to triumph."));
        App.HeroAbilityTypes.push(new App.AbilityType("Decreased mission time",
            "Wise planning, sharp eyes, and preparation aforehand will annul and forestall the obstacles laid by both nature and one's foes."));
        App.HeroAbilityTypes.push(new App.AbilityType("Decreased mission cost",
            "Shrewd tongues, well-placed allies, and judicious use of arcane manupulation can ease both the strife, the journey, and the pocketbook."));
    },

    GenerateCrew: function() {
        for (i = 0; i < App.CrewToGenerateAtInit; i++) {
            crewMember = new App.Crewmember();
            crewMember.setName("Crewmember " + (i + 1));
            spec = getRandomInt(0, App.Specializations.length);
            crewMember.setSpecialization(spec);
            ability = getRandomInt(0, App.HeroAbilities.length);
            crewMember.addAbility(ability);
            if (Math.random() > 0.8) {
                secondAbility = getRandomInt(0, App.HeroAbilities.length);
                while(secondAbility == ability) {
                    secondAbility = getRandomInt(0, App.HeroAbilities.length);
                } 
                crewMember.addAbility(secondAbility);
            }
            App.Crew.push(crewMember);
        }
    },

    GenerateMissions: function() {
        console.log("Missions to generate: " + App.MissionsToGenAtInit);
        for (index = 0; index < App.MissionsToGenAtInit; index++) {
            missionId = index + 1;
            console.log("Beginning generation of mission " + (missionId));
            mission = App.GenerateMission(missionId);
            App.AvailableMissions.push(mission);
        }
    },

    GenerateEnemy: function() {
        console.log("Generating enemy " + App.EnemyID);
        enemy = new App.Enemy();
        enemy.setName("Enemy " + App.EnemyID++);
        return enemy;
    },

    UpdateTime: function(timestamp) {
        if (App.Time.currTime === 0) App.Time.currTime  = App.Time.lastTime = timestamp;
        App.Time.currTime = timestamp;
        App.Time.deltaTime = App.Time.currTime - App.Time.lastTime;
        App.AddFPS(App.Time.deltaTime);
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
    },

    Draw: function() {
        App.DrawActiveMissions();
        App.DrawResources();
        App.DrawTitle();
        App.DrawAvailableMissions();
        App.DrawCrew();
        App.DrawLog();
    },

    DrawTitle: function() {
        document.title = (App.Params.Focused ? "Focus" : "Blur") + ": " + App.Time.fps() + " fps";
    },

    DrawCrew: function() {
        for (ci = 0; ci < App.Crew.length; ci++) {
            id = "crew" + ci;
            document.getElementById(id + "name").innerHTML = App.Crew[ci].getName();
            document.getElementById(id + "spec").innerHTML = App.Crew[ci].getSpecialization().getName();
            abilities = App.Crew[ci].getAbilities();
            abilityText = App.HeroAbilities[abilities[0]].getName();
            for (x = 1; x < abilities.length; x++) {
                abilityText += ", " + App.HeroAbilities[abilities[x]].getName();
            }
            document.getElementById(id + "abilities").innerHTML = abilityText;
            document.getElementById(id + "level").innerHTML = App.Crew[ci].getLevel();
            document.getElementById(id + "rank").innerHTML = App.Crew[ci].getRank();
            document.getElementById(id + "gear").innerHTML = App.Crew[ci].getGearLevel();
            document.getElementById(id + "mission").innerHTML = App.Crew[ci].getCurrentMission();            
        }
    },

    DrawAvailableMissions: function() {
        for (s = 0; s < App.AvailableMissions.length; s++) {            
            mission = App.AvailableMissions[s];
            id = "vm" + s;
            document.getElementById(id+"name").innerHTML = mission.getName();
            addClass(document.getElementById(id+"name"), mission.getMissionType().getName().toLowerCase())
            document.getElementById(id+"length").innerHTML = timeFormat(mission.getDuration());
            document.getElementById(id+"enemies").innerHTML = mission.getEnemies().length;
            party = "";
            partyList = mission.getCrew();
            if (partyList.length == 0) party = "None";
            else {
                party = partyList[0].getName();
                for (g = 1; g < partyList.length; g++) {
                    party += ", " + partyList[g].getName();
                }
            }
            document.getElementById(id+"party").innerHTML = party;
            document.getElementById(id+"reqs").innerHTML = mission.getRequirements().getReqText();
            document.getElementById(id+"cost").innerHTML = mission.getCost().getCostText();

            document.getElementById(id+"rewards").innerHTML = mission.getRewardsText();
            document.getElementById(id).style.visibility = 'visible';
        }
    },

    DrawActiveMissions: function() {
       if (App.fullDraw) {
            text = "";
            for (i = 0; i < App.ActiveMissions.length; i++) {            
                mission = App.ActiveMissions[i];
                text += "<tr><td>";
                text += mission.cName;
                text += "</td><td>";
                text += timeFormat(mission.runTime);
                text += "</td><td>";
                if (mission.elapsedTime <= mission.runTime) {
                    width = (mission.elapsedTime / mission.runTime) * 100;
                    textWidth = Math.round(width);
                    text += "<div class='myProgress'><div class='myBar' style='width:" + width + "%;'></div><span class='barText'>"
                    + (textWidth > 100 ? 100 : textWidth) + "%</span></div></td></tr>";
                }
                else if (mission.flashTime <= App.FlashTime) {
                    heightAdd = Math.round((mission.flashTime / App.FlashTime) * App.FlashHeight);
                    width = 250 + heightAdd;
                    height = 25 + heightAdd;
                    margin = heightAdd / 2;
                    text += "<div class='myProgress flashProgress' style='height:" + height + "px; width:" 
                    + width + "px; margin:-" + margin + "px -" + margin 
                    + "px;'><div class='myBar flashBar' style='width:100%;background-color:rgb(" 
                    + lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(mission.flashTime), false) + ","
                    + lerpColor(205, 255, Math.sqrt(App.FlashTime), Math.sqrt(mission.flashTime), false) + ","
                    + lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(mission.flashTime), false) + ");opacity:"
                    + lerpColor(1, 0, App.FlashTime * App.FlashTime, mission.flashTime * mission.flashTime, true) + ";'></div></div></td></tr>";
                }
            }
            document.getElementById("activeMissionList").innerHTML = text;
        }
        else {
            App.ClearCounterDivs();
            for (i = 0; i < App.ActiveMissions.length; i++) {
                mission = App.ActiveMissions[i];
                id = "am" + i;
                row = document.getElementById(id);
                row.style.visibility = 'visible';
                document.getElementById("am" + i + "Name").innerHTML = mission.cName;
                document.getElementById("am" + i + "Length").innerHTML = timeFormat(mission.runTime);
                if (mission.elapsedTime <= mission.runTime) {
                    width = (mission.elapsedTime / mission.runTime) * 100;
                    textWidth = Math.round(width);
                    progDiv = document.getElementById("am"+i+"ProgDiv");
                    progDiv.style.height="25px";
                    progDiv.style.width="250px";
                    progDiv.style.margin = '0';
                    barDiv = document.getElementById("am" + i + "BarDiv");
                    barDiv.style.width = width + "%";
                    barDiv.style.backgroundColor = 'rgb(50, 205, 50)';
                    barDiv.style.opacity = '1';
                    document.getElementById("am" + i + "BarSpan").innerHTML = textWidth + "%";		    
                }
                else if (mission.flashTime <= App.FlashTime) {
                    heightAdd = Math.round((mission.flashTime / App.FlashTime) * App.FlashHeight);
                    width = 250 + heightAdd;
                    height = 25 + heightAdd;
                    margin = heightAdd / 2;
                    progElem = document.getElementById("am" + i + "ProgDiv");
                    barElem = document.getElementById("am" + i + "BarDiv");
                    addClass(progElem, "flashProgress");
                    addClass(barElem, "flashBar");
                    progElem.style.height = height+"px";
                    progElem.style.width = width+"px";
                    progElem.style.margin = "-" + margin + "px -" + margin + "px";
                    barElem.style.width = "100%";
                    red = lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(mission.flashTime), false);
                    green = lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(mission.flashTime), false);
                    blue = lerpColor(50, 255, Math.sqrt(App.FlashTime), Math.sqrt(mission.flashTime), false);
                    opac = lerpColor(1, 0, App.FlashTime * App.FlashTime, mission.flashTime * mission.flashTime, true);
                    barElem.style.backgroundColor = "rgb("+red+","+green+","+blue+")";
                    barElem.style.opacity = opac;
                }
            }
        }	
    },

    ClearCounterDivs: function() {
	    for (i = 0; i < 12; i++) {
	        removeClass(document.getElementById("am" + i + "ProgDiv"), "flashProgress");
	        removeClass(document.getElementById("am" + i + "BarDiv"), "flashBar");
            row = document.getElementById("am"+i);
	        row.style.visibility = 'hidden';
	    }
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

    Loop: function(timestamp) {
        App.UpdateTime(timestamp);
        App.Logic();
        App.Draw();
        window.requestAnimationFrame(App.Loop);
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

    ShowModal: function(type, id, available) {
        element = document.createElement('div');
        element.id='modal';
        element.className ="vex vex-theme-os";        
        html = ""
        if (App.Modals++ == 0) {
            html += '<div class="vex-overlay"></div>';
        }
        if (App.Modals > App.Messages.length) {
            return;
        }
        content = App.ConstructModal(type, id, available);
        html += content;
        element.innerHTML = html;
        document.querySelector('body').appendChild(element);
        $(document.body).addClass('vex-open');
    },

    ConstructModal: function(caller, id, available) {
        content = "";
        switch(caller) {
            case App.ModalBuild.ModalTypes.MISSION:
                if(available) {
                    mission = App.AvailableMissions[id];
                } else {
                    mission = App.ActiveMissions[id];
                }
                content += App.ModalBuild.widestartText;
                content += App.ModalBuild.startCloseText;
                content += "<h3>Mission: " + mission.getName() + "</h3>";
                content += "<h4>Type: " + mission.getMissionType().getName() + "</h4>";
                content += "<p>" + mission.getMissionType().getDescription() + "</p>";
                content += "<h4>Enemies</h4>";
                enemies = mission.getEnemies();
                for (i = 0; i < enemies.length; i++) {
                    content += "<h5>" + enemies[i].getName() + "</h5>";
                }
                content += "<p>Reqs: " + mission.getRequirements().getReqText() + "</p>";
                content += "<p>Cost: " + mission.getCost().getCostText() + "</p>";
                content += "<p>Rewards: " + mission.getRewardsText() + "</p>";
                break;
            case App.ModalBuild.ModalTypes.HERO_SELECT:
                hero = App.Crew[id];
                content += App.ModalBuild.widestartText;
                content += App.ModalBuild.startCloseText;
                content += "<h3>Hero: " + hero.getName() + "</h3>";
                content += "<h4>Special: " + hero.getSpecialization().getName() + "</h4>";
                content += "<p>" + hero.getSpecialization().getDescription() + "</p>";
                content += "<h4>Abilities</h4>";
                abilities = hero.getAbilities();
                for (i = 0; i < abilities.length; i++) {
                    content += "<h5>" + App.HeroAbilities[abilities[i]].getName() + "</h5>";
                    content += "<p>" + App.HeroAbilities[abilities[i]].getDescription() + "</p>";
                }
                content += "<p>Level: " + hero.getLevel() + "</p>";
                content += "<p>Rank: " + hero.getRank() + "</p>";
                content += "<p>Gear Level: " + hero.getGearLevel() + "</p>";
                content += "<p>Current Mission: " + hero.getCurrentMission() + "</p>";
                break;
            case App.ModalBuild.ModalTypes.MESSAGE:
                content += App.ModalBuild.normalstartText;
                content += App.ModalBuild.secondModalStart + 2 + ', ' + App.Modals + App.ModalBuild.secondModalEnd + App.ModalBuild.startCloseText + App.Messages[id];
                break;
            default:
                return "ModalType " + caller + " not found.";                
        }
        content += App.ModalBuild.endText;
        return content;
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

    GenerateMission: function(id) {
        console.log("Generating mission " + id);
        mission = new App.Mission(id);
        mission.setName("Mission " + id);
        mission.setType(getRandomInt(0, App.MissionTypes.length));
        mission.setDuration(getRandomInt(6000, 35000));
        enemyCount = 1;
        if (getRandomInt(0, 10) > 7) {
            enemyCount = getRandomInt(2, 6);
        }
        console.log("Generating " + enemyCount + " enemies");
        for (i = 0; i < enemyCount; i++) {
            mission.addEnemy(App.GenerateEnemy());
        }
        heroCount = enemyCount;
        if (enemyCount > 1 && getRandomInt(0, 10) > 7) heroCount--;
        mission.setCrewNeeded(heroCount);
        mission.setRequirements(App.GenerateMissionRequirements());
        mission.setCost(App.GenerateCosts(heroCount));
        for (i = 0; i < enemyCount; i++) {            
            mission.addReward(App.GenerateReward());
        }

        return mission;
    },

    GenerateMissionRequirements: function() {
        console.log("Generating mission requirements.");
        reqs = new App.Requirements();
        rnd = getRandomInt(0, 10);
        if (rnd > 7) {
            reqs.setGearLevel(getRandomInt(1, 51) * 10);
        } else if (rnd > 5) {
            reqs.setRankLevel(getRandomInt(1, App.Rank.length));
        } else {
            reqs.setLevel(getRandomInt(1, App.MaxLevel + 1));
        }
        return reqs;
    },

    GenerateCosts: function(count) {
        console.log("Generating costs.");
        costType = getRandomInt(0, App.ResourceType.length);
        costAmount = getRandomInt(5, 35) * count;
        return new App.Cost(costType, costAmount);
    },

    GenerateReward: function() {
        console.log("Generating rewards.");
        reward = new App.Reward();
        reward.setRewardAmount(getRandomInt(App.Resources.resourceMin, App.Resources.resourceMax) * App.Resources.resourceMult);
        reward.setRewardType(getRandomInt(0, App.ResourceType.length));
        return reward;
    },

    Mission: function(id) {
        this.defaultDuration = 5000;
        this.id = id;
        this.mName = "";
        this.desc = "";
        this.missionType = -1;
        this.duration = -1;
        this.enemyList = [];
        
        // CrewList, ThreatList, and AbilityList store the integer ids
        // of the crew, threats, and abilities, respectively. 
        // Since these are set, we can just index into their instances.
        // Enemies are dynamically generated per mission, though, so we store
        // the whole enemy structure in the EnemyList array.
        this.crewList = [];
        this.threatList = [];
        this.abilityList = [];

        this.maxCrew = 1;
        this.requirements = null;
        this.cost = null;
        this.rewards = [];
        this.setName = function(name) {
            this.mName = name;
        }
        this.getName = function() {
            return this.mName;
        }
        this.setType = function(missionType) {
            this.missionType = missionType;
        }
        this.getType = function() {
            if (this.missionType) {
                return this.missionType;
            }
            return null;
        }
        this.getMissionType = function() {
            return App.MissionTypes[this.missionType];
        }
        this.setDuration = function(duration) {
            this.duration = duration;
        }
        this.getDuration = function() {
            if (this.duration >= 0) {
                return this.duration;
            }
            else {
                console.log("NOTICE: mission duration not set")
                return this.defaultDuration;
            } 
        }
        this.setCrewNeeded = function(num) {
            this.maxCrew = num;
        }
        this.setEnemies = function(enemies) {
            if (Array.isArray(enemies)) {
                this.enemyList = enemies;
            }
            else {
                console.error("Error in App.Mission.setEnemies(enemies): enemies need to be an array");
            }
        }
        this.addEnemy = function(enemy) {
            this.enemyList.push(enemy);
            /*
            for (i = 0; i < enemy.abilities.length; i++) {
                this.threatList.push(enemy.abilities[i]);
            }
            */
        }
        this.getEnemies = function() {
            return this.enemyList;
        }
        this.getMissionThreats = function() {
            return this.threatList;
        }
        this.addCrew = function(crewmember) {
            if (this.crewList.length == this.maxCrew) {
                console.log("Error in App.Mission.addCrew: mission crew limit reached, cannot add more crew members.")
                return;
            }
            this.crewList.push(crewmember);
            for (i = 0; i < App.Crew[crewmember].abilities.length; i++) {
                this.abilityList.push(App.Crew[crewmember].abilities[i]);
            }
        }
        this.removeCrew = function(crewmember) {
            crewIndex = this.crewList.indexOf(crewmember);
            if (crewIndex >= 0) {
                this.crewList.splice(crewIndex, 1);
            }
            for (i = 0; i < App.Crew[crewmember].abilities.length; i++) {
                abIndex = this.abilityList.indexOf(App.Crew[crewmember].abilities[i]);
                if (abIndex >= 0) {
                    this.abilityList.splice(abIndex, 1);
                } else {
                    console.log("Error in App.Mission.removeCrew: crewmember ability not present in mission ability list.");
                }
            }
        }
        this.getCrew = function() {
            return this.crewList;
        }
        this.setRequirements = function(reqs) {
            this.requirements = reqs;
        }
        this.getRequirements = function() {
            return this.requirements;
        }
        this.setCost = function(cost) {
            this.cost = cost;
        }
        this.getCost = function() {
            return this.cost;
        }
        this.addReward = function(reward) {
            for (hi = 0; hi < this.rewards.length; hi++) {
                if (reward.rewardType == this.rewards[hi].rewardType) {
                    this.rewards[hi].rewardAmount += reward.rewardAmount;
                    return;
                }
            }
            this.rewards.push(reward);
        }
        this.getRewards = function() {
            return this.rewards;
        }
        this.getRewardsText = function() {
            if (this.rewards.length == 0) return "None";
            text = this.rewards[0].getRewardText();
            for (i = 1; i < this.rewards.length; i++) {
                text += ", " + this.rewards[i].getRewardText();
            }
            return text;
        }
    },

    Crewmember: function() {
        this.cName = "";
        this.abilities = [];
        this.specialization = -1;
        this.xp = 0;
        this.level = 1;
        this.gearLevel = 0;
        this.rank = 0;
        this.missionID = -1;
        this.getName = function() {
            return this.cName;
        }
        this.setName = function(name) {
            this.cName = name;
        }
        this.setAbilities = function(other_abilities) {
            // if an array of abilities was passed in
            // (as should always be the case, if I'm smart!)
            if (Array.isArray(other_abilities)) {
                for (i = 0; i < other_abilities.length; i++) {
                    this.abilities.push(other_abilities[i]);
                }
            }
            // Otherwise, I'm a doofus, and only passed in one ability,
            // but we'll cover my ignorance/forgetfulness/utter failure anyways.
            // I may be dumb, but I'm kind to myself!
            else {
                this.abilities.push(other_abilities);
            }
        }
        this.isOnMission = function() {
            return this.missionID >= 0 ? true : false;
        }
        this.getCurrentMission = function() {
            return this.missionID >= 0 ? this.missionID : "None";
        }
        this.setCurrentMission = function(id) {
            if (this.missionID >= 0) {
                console.log("ERROR: Crewmember " + this.cName + " already on mission " + this.missionID);
                return;
            }
            this.missionID = id;
        }
        this.leaveMission = function() {
            this.missionID = -1;
        }
        this.addAbility = function(ability) {
            this.abilities.push(ability);
        }
        this.getAbilities = function() {
            return this.abilities;
        }
        this.getSpecialization = function() {
            if (this.specialization >= 0) {
                return App.Specializations[this.specialization];
            } else {
                console.log("ERROR: Crewmember " + this.cName + " specialization not set.");
                return;
            }
        }
        this.setSpecialization = function(spec) {
            this.specialization = spec;
        }
        this.getLevel = function() {
            return this.level;
        }
        this.setLevel = function(lev) {
            if (lev < 1) lev = 1;
            if (lev > App.MaxLevel) lev = App.MaxLevel;
            this.level = lev;
        }
        this.levelUp = function() {
            if (this.level == App.MaxLevel) return;
            this.level++;
        }
        this.addXP = function(xp) {
            if (this.rank == App.Rank.length - 1) return;
            this.xp += xp;
            this.checkForLevelUp();
        }
        this.checkForLevelUp = function() {
            if (this.level == App.MaxLevel) {
                while (this.xp >= App.Rank[this.rank + 1].xpCost) {
                    this.rankUp();
                    this.xp -= App.Rank[this.rank].xpCost;
                    if (this.xp < 0) {
                        this.rank--;
                        console.log("Error in App.Crewmember.checkForLevelUp: ranking up with insufficient XP.");
                    }
                }
            } else {
                while (this.xp >= App.LevelXP[this.level - 1]) {
                    this.xp -= App.LevelXP[this.level-1];
                    this.levelUp();
                }
            }
        }
        this.getGearLevel = function() {
            return this.gearLevel;
        }
        this.setGearLevel = function(newLevel) {
            this.gearLevel = newLevel;
        }
        this.increaseGearLevel = function(increase) {
            this.gearLevel += increase;
        }
        this.getRank = function() {
            return App.Rank[this.rank].name;
        }
        this.getRankLevel = function() {
            return this.rank;
        }
        this.setRank = function(rank) {
            if (rank < 0) rank = 0;
            if (rank >= App.Rank.length) rank = App.Rank.length - 1;
            this.rank = rank;
        }
        this.rankUp = function() {
            if (this.rank < App.Rank.length - 1) {
                this.rank++;
            }
        }
    },

    Enemy: function() {
        this.eName = "";
        this.abilities = [];
        this.level = 1;
        this.rank = 0;
        this.gearLevel = 0;
        this.setName = function(name) {
            this.eName = name;
        }
        this.getName = function() {
            return this.eName;
        }
        this.getAbilities = function() {
            return this.abilities;
        }
        this.setAbilities = function(other_abilities) {
            if (Array.isArray(other_abilities)) {
                for (i = 0; i < other_abilities.length; i++) {
                    this.abilities.push(other_abilities[i]);
                }
            }
            // Otherwise, I'm a doofus, and only passed in one ability,
            // but we'll cover my ignorance/forgetfulness/utter failure anyways.
            // I may be dumb, but I'm kind to myself!
            else {
                this.abilities.push(other_abilities);
            }
        }
        this.addAbility = function(ability) {
            this.abilities.push(ability);
        }
        this.getLevel = function() {
            return this.level;
        }
        this.setLevel = function(level) {
            if (level < 0) level = 0;
            if (level > App.MaxLevel) level = App.MaxLevel;
            this.level = level;
        }
        this.gainLevel = function(amount) {
            levelsToGain = 1;
            if (amount) levelsToGain = amount;
            while (this.level <= App.MaxLevel && levelsToGain > 0) {
                this.level++;
                levelsToGain--;
            }
        }
        this.getRank = function() {
            return App.Rank[this.rank].name;
        }
        this.setRankLevel = function(rank) {
            if (rank < 0) rank = 0;
            if (rank > App.Rank.length - 1) rank = App.Rank.length - 1;
            this.rank = rank;
        }
        this.increaseRank = function(amount) {
            if (this.rank == App.Rank.length - 1) {
                console.log("Max rank reached.");
                return;
            }            
            amountToIncrease = 1;
            if (amount) amountToIncrease = amount;
            while(this.rank < App.Rank.length - 1 && amountToIncrease > 0) {
                this.rank++;
                amountToIncrease--;
            }
        }
    },

    Specialization: function(name, desc) {
        this.name = name;
        this.desc = desc;
        this.getName = function() {
            return this.name;
        }
        this.getDescription = function() {
            return this.desc;
        }
    },

    Specializations: [],

    HeroAbility: function(name, desc, abilityType, counters) {
        this.aName = name;
        this.desc = desc;
        this.abilityType = abilityType;
        this.counters = counters;
        this.getName = function() {
            return this.aName;
        }
        this.getDescription = function() {
            return this.desc;
        }
        this.getAbilityType = function() {
            return App.HeroAbilityTypes[this.abilityType];
        }
        this.getCounter = function() {
            return this.counters;
        }
        this.getCounteredAbility = function() {
            return App.EnemyAbilities[this.counters];
        }
    },

    HeroAbilities: [],

    EnemyAbility: function(name, desc, abilityType, countered) {
        this.aName = name;
        this.desc = desc;
        this.abilityType = abilityType;
        this.counteredBy = countered;
        this.getName = function() {
            return this.aName;
        }
        this.getDescription = function() {
            return this.desc;
        }
        this.getAbilityType = function() {
            return App.EnemyAbilityTypes[this.abilityType];
        }
        this.getCounter = function() {
            return this.counteredBy;
        }
        this.getCounteringAbility = function() {
            return App.HeroAbilities[this.counteredBy];
        }
    },

    EnemyAbilities: [],

    MissionType: function(name, desc, favor) {
        this.name = name;
        this.desc = desc;
        this.favor = favor;
        this.getName = function() {
            return this.name;
        }
        this.getDescription = function() {
            return this.desc;
        }
        this.getFavoredSpecialization = function() {
            return App.Specializations[this.favor];
        }
    },

    MissionTypes: [],
    
    AbilityType: function(name, desc) {
        this.tName = name;
        this.desc = desc;
        this.getName = function() {
            return this.name;
        }
        this.getDescription = function() {
            return this.desc;
        }
    },

    EnemyAbilityTypes: [],

    HeroAbilityTypes: [],

    Requirements: function() {
        this.level = 0;
        this.gearLevel = 0;
        this.rankLevel = 0;
        this.setLevel = function(lev) {
            if (lev < 1) lev = 1;
            if (lev > App.MaxLevel) lev = App.MaxLevel;
            this.level = lev;
        }
        this.getLevel = function() {
            return this.level;
        }
        this.setGearLevel = function(lev) {
            this.gearLevel = lev;
        }
        this.getGearLevel = function() {
            return this.gearLevel;
        }
        this.setRankLevel = function(lev) {
            if (lev < 0) lev = 0;
            if (lev >= App.Rank.length) lev = App.Rank.length - 1;
            this.rankLevel = lev;
        }
        this.getRankLevel = function() {
            return this.rankLevel;
        }
        this.getRank = function() {
            return App.Rank[this.rankLevel].name;
        }
        this.getReqText = function() {
            if (this.gearLevel > 0) {
                return "Gear level: " + this.gearLevel;
            } 
            else if (this.rankLevel > 0) {
                return "Rank: " + this.getRank();
            }
            return "Level: " + this.level;
        }
    },

    Cost: function(type, amount) {
        this.type = type;
        this.amount = amount;
        this.getCostText = function() {
            return this.amount + " " + this.getType();
        }
        this.getType = function() {
            return App.ResourceType[this.type];
        }
    },

    Reward: function() {
        this.rewardType = -1;
        this.rName = "";
        this.desc = "";
        this.rewardAmount = 1;
        this.applyFunc = null;
        this.setName = function(name) {
            this.rName = name;
        }
        this.getName = function() {
            return this.rName;
        }
        this.setDescription = function(desc) {
            this.desc = desc;
        }
        this.getDescription = function() {
            return this.desc;
        }
        this.setRewardType = function(type) {
            this.rewardType = type;
        }
        this.getRewardType = function() {
            return App.RewardType[this.rewardType];
        }
        this.setRewardAmount = function(amt) {
            this.rewardAmount = amt;
        }
        this.getRewardAmount = function() {
            return this.rewardAmount;
        }
        this.setApplyFunc = function(func) {
            this.applyFunc = func;
        }
        this.apply = function(target) {
            this.applyFunc(target, this.rewardType, this.rewardAmount);
        }
        this.getRewardText = function() {
            text = "";
            if (this.rewardAmount > 1) text += this.rewardAmount + " ";
            text += this.getRewardType();
            return text;
        }
    },

    AmountRewardFunc: function(target, type, amount) {
        App.ResourceList[App.RewardType[type]] += amount;
        App.Log("Added " + amount + " " + type);
    },

    RewardType: [
        "Food",
        "Stone",
        "Gold",
        "Leather",
        "Cloth",
        "Steel",
        "Wood",
        "Armor",
        "Weapon",
        "Trinket",
        "Crew",
        "Skill",
        "Special"
    ],

    Rank: [
        {name: "none", xpCost: -1}, 
        {name: "Apprentice", xpCost: 250000}, 
        {name: "Skilled", xpCost: 500000},
        {name: "Master", xpCost: 900000}, 
        {name: "Champion", xpCost: 1500000}
    ],
};

window.addEventListener('focus', function() {
    App.Params.Focused = true;
}, false);

window.addEventListener('blur', function() {
    App.Params.Focused = false;
}, false);

window.onload = App.Init();
