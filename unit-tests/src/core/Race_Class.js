// npm includes
var expect = require("chai").expect;

// local includes
var Race = require("../../../src/core/Race");
var Class = require("../../../src/core/Class");
var Mob = require("../../../src/map/Mob");

// testing
var Elf = new Race();
Elf.healthBase = 25;
Elf.manaBase = 200;
Elf.energyBase = 75;
Elf.toNextLevelBase = 25;
Elf.toNextLevelPerLevel = 25;

var Sorcerer = new Class();
Sorcerer.strengthBase = 5;
Sorcerer.intelligenceBase = 20;
Sorcerer.agilityBase = 5;
Sorcerer.strengthPerLevel = 1;
Sorcerer.intelligencePerLevel = 4;
Sorcerer.agilityPerLevel = 1;

var mob = new Mob();
mob.race = Elf;
mob.class = Sorcerer;
describe("Race and Class", function(){
    describe("Elf + Sorcerer", function(){
        it("Strength", function(done){
            expect(mob.strength).is.equal(5);
            expect(mob.attackPower).is.equal(5);
            expect(mob.defense).is.equal(5);
            expect(mob.vitality).is.equal(5);
            expect(mob.health).is.equal(75);
            done();
        })

        it("Intelligence", function(done){
            expect(mob.intelligence).is.equal(20);
            expect(mob.magicPower).is.equal(20);
            expect(mob.resilience).is.equal(20);
            expect(mob.wisdom).is.equal(20);
            expect(mob.mana).is.equal(400);
            done();
        })

        it("Agility", function(done){
            expect(mob.agility).is.equal(5);
            expect(mob.speed).is.equal(5);
            expect(mob.evasion).is.equal(5);
            expect(mob.stamina).is.equal(5);
            expect(mob.energy).is.equal(125);
            done();
        })
    });
});