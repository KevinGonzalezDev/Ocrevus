var GameManager = [];
GameManager.Boot = function(game) {};
GameManager.Boot.prototype = {
    preload: function() {
        this.game.load.atlasJSONHash('PreloaderSprite', '/juego/img/preloader_1x.png', '/juego/img/preloader_1x.json')

    },
    create: function() {
        game.stage.backgroundColor = "#000000";
        game.time.advancedTiming = true;
        game.time.desiredFps = 60;
        game.stage.smoothed = false;

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preloader');

        game.input.maxPointers = 4;
        if (game.device.touch) {
            game.input.mouse.stop();
            console.log("no Mouse");
        }

    }
};
