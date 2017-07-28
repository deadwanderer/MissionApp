var Combatant = function(name, currHealth, maxHealth) {
    var self = this;
    self.name = ko.observable(name);
    self.isVisible = ko.observable(true);
    self.currHealth = ko.observable(currHealth);
    self.maxHealth = ko.observable(maxHealth);
    self.healthPercentage = ko.computed(function() {
        return Math.round((self.currHealth() / self.maxHealth()) * 100) + '%'
    }, this);
    self.printHealth = ko.computed(function() {
        return self.currHealth() + " / " + self.maxHealth();
    }, this);
    self.reduceHealth = function(amount) {
        self.currHealth(self.currHealth() - amount);
        if (self.currHealth() <= 0) {
            self.currHealth(0);
            self.isVisible(false);
        }
    };
}
MyBattleModel = function () {
    var self = this;
    self.crew = [
        new Combatant("Crew 1", 80, 100),
        new Combatant("Crew 2", 90, 100),
        new Combatant("Crew 3", 50, 100),
        new Combatant("Crew 3", 30, 100)
    ]
    self.enemies = [
        new Combatant("Enemy 1", 70, 100),
        new Combatant("Enemy 2", 40, 100),
        new Combatant("Enemy 3", 100, 100),
        new Combatant("Enemy 4", 20, 100),
        new Combatant("Enemy 5", 60, 100)
    ]
    self.prevTick = 0;
    self.currTick = 0;
    self.dt = 0;

    self.update = function() {
        for (var i = 0; i < self.crew.length; i++) {
            self.crew[i].reduceHealth(1);
        }
        for (var j = 0; j < self.enemies.length; j++) {
            self.enemies[j].reduceHealth(1);
        }
    }

    self.init = function() {
        self.dt = 0;
        window.requestAnimationFrame(self.tick);
    }

    self.tick = function(timestamp) {
        self.currTick = timestamp;
        self.dt += self.currTick - self.prevTick;
        self.prevTick = timestamp;
        if (self.dt >= 100) {
            self.dt -= 100;
            self.update();
        }
        window.requestAnimationFrame(self.tick);
    }
}