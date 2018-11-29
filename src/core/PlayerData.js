/**
 * Data about the player that is preserved across instances.
 */
class PlayerData{
    constructor(){
        this.channels = [];
    }
}

/**
 * List of channels we prefer to auto-join at login.
 */
PlayerData.prototype.channels = null;

module.exports = PlayerData;
