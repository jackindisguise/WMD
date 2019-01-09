`issue12`
=========
```
Add ability system.
```

Plans
=====
1. Create ability structure.
   1. `name` for identifying it.
   2. `keywords` for users to refer to it at runtime.
   3. `use` function.

2. Give `Race` and `Class` (`Classification`) an ability list.
   1. List will be populated with objects in the format of `{"ability":name, "level":level}`.
      1. "ability" indicates the name of an ability this `Classification` learns.
      2. "level" is the level it learns it at.

3. Give `Mob` a few functions for searching for abilities.
   1. `ability` getter that searches their race and class for abilities they know.
   2. `hasAbility(name)` for checking for a specific ability.

4. Create `Command` subtype `AbilityCommand`.
   1. `ability` field for indicating the name of the ability that must be known to use this command.
