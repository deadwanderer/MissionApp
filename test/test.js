var Combatant = function(name, currHealth, maxHealth) {
    var self = this;
    self.name = ko.observable(name);
    self.currHealth = ko.observable(currHealth);
    self.maxHealth = ko.observable(maxHealth);
    self.healthPercentage = ko.computed(function() {
        return ((self.currHealth() / self.maxHealth()) * 100).toFixed(0) + '%';
    }, this);
    self.printHealth = ko.computed(function() {
        return self.currHealth() + " / " + self.maxHealth();
    }, this);
}
function MyBattleModel() {
    this.crew = [
        new Combatant("Crew 1", 80, 100),
        new Combatant("Crew 2", 90, 100),
        new Combatant("Crew 3", 50, 100),
        new Combatant("Crew 3", 30, 100)
    ]
    this.enemies = [
        new Combatant("Enemy 1", 70, 100),
        new Combatant("Enemy 2", 40, 100),
        new Combatant("Enemy 3", 100, 100),
        new Combatant("Enemy 4", 20, 100),
        new Combatant("Enemy 5", 60, 100)
    ]
}