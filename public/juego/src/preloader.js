GameManager.Preloader = function(game) {};
GameManager.Preloader.prototype = {
    preload: function() {
        this.preloadBg = this.game.add.sprite(this.game.width * 0.5 - 25, this.game.height * 0.5 + 50, 'PreloaderSprite', 'preloader_bg.png');
        this.preloadBg.scale.setTo(0.8);
        this.preloadBg.anchor.setTo(0.5);
        this.preloadBar = this.game.add.sprite(this.game.width * 0.5, this.game.height * 0.5 + 53, 'PreloaderSprite', 'preloader_bar.png');
        this.preloadBar.scale.setTo(0.88, 0.85);
        this.preloadBar.anchor.setTo(0.5);
        this.preloadOver = this.add.sprite(this.game.width * 0.5 - 25, this.game.height * 0.5 + 50, 'PreloaderSprite', 'preloader_overlay.png');
        this.preloadOver.scale.setTo(0.8);
        this.preloadOver.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.game.load.audio('fondo', '/juego/snd/fondo.mp3');
        this.game.load.audio('Bump', '/juego/snd/tope_01.mp3');
        this.game.load.audio('Motor', '/juego/snd/motor_01.ogg');
        this.game.load.audio('Premio', '/juego/snd/premio_01.mp3');
        this.game.load.audio('Hard', '/juego/snd/hardTurn_01.mp3');

        this.game.load.image('sky', '/juego/img/fondo.jpg');
        this.game.load.atlasJSONHash('Cars', '/juego/img/cars.png', '/juego/img/cars.json');
        this.game.load.atlasJSONHash('animaciones', '/juego/img/animaciones.png', '/juego/img/animaciones.json');
        this.game.load.image('hills', '/juego/img/land.png');
        this.game.load.image('city', '/juego/img/city.png');
        this.game.load.image('mountain', '/juego/img/mountain.png');
        this.game.load.image('soundOn', '/juego/img/sound-on.png');
        this.game.load.image('soundOff', '/juego/img/sound-off.png');

        this.game.load.image('arco', '/juego/img/arco.png');
        this.game.load.image('edificio', '/juego/img/edificio.png');
        this.game.load.image('edificio2', '/juego/img/edificio2.png');




        if (!game.device.desktop) {
            this.game.load.image('Inicio', '/juego/img/instrucciones-mobil.png');
        } else {
            this.game.load.image('Inicio', '/juego/img/instrucciones-web.png');
        }

        this.game.load.image('Seleccion', '/juego/img/seleccion_personaje.png');

        this.game.load.image('Final', '/juego/img/puntaje.png');
        this.game.load.image('Pausa', '/juego/img/pausa2.png');

    },
    create: function() {

        this.game.state.start('Game');

    }
};
