// npm includes
var expect = require("chai").expect;

// local includes
var Race = require("../../../src/mud/Race");
var Class = require("../../../src/mud/Class");
var Mob = require("../../../src/mud/map/Mob");

// testing
describe("[MOB]", function(){
    it("constructor options", function(done){
        var mob = new Mob(); // no options
        expect(mob.loc).to.equal(null);
        var mob2 = new Mob({}); // empty options
        expect(mob2.loc).to.equal(null);
        var mob3 = new Mob({"loc":mob2}); // valid location
        expect(mob3.loc).to.equal(mob2);
        var mob4 = new Mob({"loc":55}); // invalid location
        expect(mob4.loc).to.equal(null);
        done();
    })

    describe("Attributes", function(){
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
        it("strength + secondary attributes", function(done){
            expect(mob.strength).is.equal(5);
            expect(mob.attackPower).is.equal(5);
            expect(mob.defense).is.equal(5);
            expect(mob.vitality).is.equal(5);
            expect(mob.maxHealth).is.equal(30);
            done();
        });

        it("intelligence + secondary attributes", function(done){
            expect(mob.intelligence).is.equal(20);
            expect(mob.magicPower).is.equal(20);
            expect(mob.resilience).is.equal(20);
            expect(mob.wisdom).is.equal(20);
            expect(mob.maxMana).is.equal(220);
            done();
        });

        it("agility + secondary attributes", function(done){
            expect(mob.agility).is.equal(5);
            expect(mob.precision).is.equal(5);
            expect(mob.deflection).is.equal(5);
            expect(mob.stamina).is.equal(5);
            expect(mob.maxEnergy).is.equal(80);
            done();
        });

        it("TNL", function(done){
            expect(mob.toNextLevel).is.equal(25);
            expect(mob.tnl).is.equal(25);
            mob.level = 10;
            expect(mob.tnl).is.equal(25 + 25*9);
            done();
        });
    });
});