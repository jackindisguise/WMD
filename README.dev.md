`issue20`
=========
> Basically, certain actions require balance. Once you do those actions, you will lose your balance. Then you must wait a set amount of time to regain it. Probably less than 3 seconds.
>
> Also, I'll call it something other than balance, since that implies you can't do any other actions. I'll just call it something like "ready."
>
> All actions will be instantaneous in this MUD, no delays. No more being held hostage by past command inputs.

Plans
=====
1. Add a `ready` flag to `Mob`.
2. Add a parameter to `Command` called `ready`.
3. Commands with `ready` set to `true` require the user's `ready` flag be `true` as well.
4. Add a `delay` parameter to commands.
5. After using a command with a delay:
   1. Set the user's `ready` flag to `false`.
   2. Spawn a thread to run after `delay` milliseconds.
   3. Set the user's `ready` flag to `true`.
