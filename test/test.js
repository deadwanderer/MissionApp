var Combatant = function(id, name, currHealth, maxHealth, moveSpeed) {
    var self = this;
    self.id = id;
    self.name = ko.observable(name);
    self.isVisible = ko.observable(true);
    self.isSelected = ko.observable(false);
    self.currHealth = ko.observable(currHealth);
    self.maxHealth = ko.observable(maxHealth);
    self.moveSpeed = ko.observable(moveSpeed);
    self.dt = 0;
    self.timeTillMove = ko.computed(function() {
        return self.moveSpeed() - self.dt;
    }, this);
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

var MoveEffectType = {"Attack":0, "Heal":1, "Buff":2, "Debuff":3};

var MoveEffect = function(type, amount) {
    var self = this;
    self.effectType = type;
    self.effectAmount = amount;
    self.printAmount = function() {
        var mod = " damage";
        switch(self.effectType) {
            case MoveEffectType.Heal:
                mod = " healing";
                break;
            case MoveEffectType.Buff:
                mod = " enhancement";
                break;
            case MoveEffectType.Debuff:
                mod = " diminishing";
                break;
        }
        return self.effectAmount + mod;
    }
}

var Move = function(name, cost, cooldown, moveEffect) {
    var self = this;
    self.moveName = ko.observable(name);
    self.moveCost = ko.observable(cost);
    self.moveCooldown = ko.observable(cooldown);
    self.moveEffect = ko.observable(moveEffect);
    self.printMoveCost = ko.computed(function() {
        return self.moveCost() + " mana";
    }, this);
    self.printMoveCooldown = ko.computed(function() {
        return self.moveCooldown + " seconds";
    }, this);
    self.printMoveType = ko.computed(function() {
        return self.moveEffect().effectType;
    }, this);
    self.printMoveEffectAmount = ko.computed(function() {
        return self.moveEffect().printAmount(); 
    }, this);
}

MyBattleModel = function () {
    var self = this;
    self.crewIndices = [
        0, 1, 2, 3
    ]
    self.enemyIndices = [
        4, 5, 6, 7, 8
    ]
    self.combatants = [
        new Combatant(0, "Crew 1", 80, 100, 1000),
        new Combatant(1, "Crew 2", 90, 100, 900),
        new Combatant(2, "Crew 3", 50, 100, 950),
        new Combatant(3, "Crew 4", 30, 100, 1250),
        new Combatant(4, "Enemy 1", 70, 100, 1500),
        new Combatant(5, "Enemy 2", 40, 100, 1400),
        new Combatant(6, "Enemy 3", 100, 100, 1300),
        new Combatant(7, "Enemy 4", 20, 100, 1200),
        new Combatant(8, "Enemy 5", 60, 100, 1100)
    ]
    self.crew = ko.observableArray(self.combatants.filter(c => self.crewIndices.indexOf(c.id) >= 0));
    self.enemies = ko.observableArray(self.combatants.filter(e => self.enemyIndices.indexOf(e.id) >= 0));
    self.crewMoves = [
        [
            new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12)), 
            new Move("Heal", 15, 12, new MoveEffect(MoveEffectType.Heal, 20))
        ],
        [
            new Move("Bombard", 25, 15, new MoveEffect(MoveEffectType.Debuff, 30))
        ],
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))],
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))]
    ]
    self.enemyMoves = [
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))],
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))],
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))],
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))],
        [new Move("Attack", 5, 3, new MoveEffect(MoveEffectType.Attack, 12))]
    ]
    self.prevTick = 0;
    self.currTick = 0;
    self.dt = 0;
    self.availableMoves = ko.observableArray([]);
    self.movesVisible = ko.observable(false);
    self.actors = []

    self.update = function() {
        for (var i = 0; i < self.crew.length; i++) {
            self.crew[i].reduceHealth(1);
        }
        for (var j = 0; j < self.enemies.length; j++) {
            self.enemies[j].reduceHealth(1);
        }

        if (self.availableMoves.length > 0)
            self.movesVisible = true;
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