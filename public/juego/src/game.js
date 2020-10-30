//Variables
var shape;
var dx;
var moveLeft;
var moveRight;
var breakBool;
var AcelBool;
var playerY;
var renderGroup;
var Player;
var PowerUp;
var PlayerCollider;
var OldBackGroundIndex = 0;
var healtBar;
var healtBarMask;
var healt;
var FullHealt;
var darinSpeed = 0.03;
var alpha = 0.5;
var begin = false;
var textoHud;
var StyleHud = { font: "28px Arial Black", fill: "#29abe2", align: "right" };
var StyleFinal = { font: "70px Arial Black", fill: "#000000", align: "right" };
var puntaje = 0;
var puntajeSegmentos = 0.03;
var fondoSound;
var Bump;
var Motor;
var Hard;
var Premio;
var soundOn;
var soundOff;


var fps = 60;
var step = 1 / 60;
var width = 1024;
var height = 485;

var centrifugal = 0.3; // centrifugal force multiplier when going around curves
var offRoadDecel = 0.99; // speed multiplier when off road (e.g. you lose 2% speed each update frame)
var skySpeed = 0.002; // background sky layer scroll speed when going around curve (or up hill)
var hillSpeed = 0.004; // background hill layer scroll speed when going around curve (or up hill)
var treeSpeed = 0.006; // background tree layer scroll speed when going around curve (or up hill)
var skyOffset = 0; // current sky scroll offset
var hillOffset = 0; // current hill scroll offset
var treeOffset = 0; // current tree scroll offset

var roadWidth = 2000; // actually half the roads width, easier math if the road spans from -roadWidth to +roadWidth
var segmentLength = 250; // length of a single segment
var rumbleLength = 3; // number of segments per red/white rumble strip
var trackLength = null; // z length of entire track (computed)
var lanes = 3; // number of lanes
var fieldOfView = 100; // angle (degrees) for field of view
var cameraHeight = 1000; // z height of camera
var cameraDepth = null; // z distance camera is from screen (computed)
var drawDistance = 200; // number of segments to draw
var playerX = 0; // player x offset from center of road (-1 to 1 to stay independent of roadWidth)
var playerZ = null; // player relative z distance from camera (computed)

var position = 0; // current camera Z position (add playerZ to get player's absolute Z position)
var speed = 0; // current speed
var maxSpeed = segmentLength / step; // top speed (ensure we can't move more than 1 segment in a single frame to make collision detection easier)
var accel = maxSpeed / 5; // acceleration rate - tuned until it 'felt' right
var breaking = -maxSpeed; // deceleration rate when braking
var decel = -maxSpeed / 5; // 'natural' deceleration rate when neither accelerating, nor braking
var offRoadDecel = -maxSpeed / 2; // off road deceleration is somewhere in between
var offRoadLimit = maxSpeed / 4; // limit when off road deceleration no longer applies (e.g. you can always go at least this speed even when off road)
var totalCars = 50; // total number of cars on the road
var TotalCoins = 10;
var TotalOffRoad = 160;

var resolution = height / 480;


//Templets
var COLORS = {
    SKY: '0x72D7EE',
    TREE: '0x005108',
    FOG: '0x005108',
    LIGHT: { road: '0x061a43', grass: '0xa3b4bf', rumble: '0x00fecf', lane: '0xaafecc' },
    DARK: { road: '0x060738', grass: '0xa3a4b6', rumble: '0x00d6bb', lane: '0x4dfece' },
    START: { road: '0x00fecf', grass: '0x95b72a', rumble: '0x555555' },
    FINISH: { road: '0x00fecf', grass: '0x6c9800', rumble: '0x555555' }
};

var ROAD = {
    LENGTH: { NONE: 0, SHORT: 25, MEDIUM: 50, LONG: 100 },
    HILL: { NONE: 0, LOW: 20, MEDIUM: 40, HIGH: 60 },
    CURVE: { NONE: 0, EASY: 2, MEDIUM: 4, HARD: 6 }
};

var SPRITES = {
    PLAYER_STRAIGHT: { name: 'carro0000', sheet: 'animaciones' },
    PLAYER1: { name: 'p10000', sheet: 'animaciones' },
    PLAYER2: { name: 'p10004', sheet: 'animaciones' },
    PLAYER3: { name: 'p10007', sheet: 'animaciones' },
    PLAYER4: { name: 'p10010', sheet: 'animaciones' },
    BREAK: { name: "freno.png", sheet: 'Cars' },
    BOTON: { name: "BtDir.png", sheet: 'Cars' },
    ACEL: { name: "BtAcel.png", sheet: 'Cars' },
    HUDACEITE: { name: "Recurso 187.png", sheet: 'Cars' },
    HUDBARRA: { name: "Recurso 186.png", sheet: 'Cars' },
    SPHERA: { name: "sfera10000", sheet: 'animaciones' },
    COIN: { name: "Recurso 76.png", sheet: 'Cars' },
    POWERUP: { name: 'Secuencia efecto OK_00003.png', sheet: 'Cars' },
    LOGOPROMO: { name: 'Nos preocupamos.png', sheet: 'Cars' },
    FONDOPUNTAJE: { name: 'Recurso 46.png', sheet: 'Cars' },
    LOGOMOTOS: { name: 'Recurso 83.png', sheet: 'Cars' },
    INSTRUCCIONES: { name: 'Inicio' },
    SELECCION: { name: 'Seleccion' },
    FINAL: { name: 'Final' },
    PAUSA: { name: 'Pausa' },
    ARCO: {name: 'arco'},
    EDIFICIO: {name: 'edificio'},
    EDIFICIO2: {name: 'edificio2'},
    CHAIR: {name: 'silla0000', sheet: 'animaciones'},
    MONSTER:{name: 'mosnter0000', sheet: 'animaciones'}



};

SPRITES.SCALE = 0;
SPRITES.CARS = [SPRITES.SPHERA];
//SPRITES.OFFROADRIGHT = [SPRITES.ARBOL1, SPRITES.ARBOL2, SPRITES.ARBOL3, SPRITES.LUZD, SPRITES.BILLBOARD1, SPRITES.BILLBOARD2, SPRITES.BILLBOARD3];
SPRITES.OFFROADRIGHT = [];
//SPRITES.OFFROADLEFT = [SPRITES.ARBOL1, SPRITES.ARBOL2, SPRITES.ARBOL3, SPRITES.LUZI, SPRITES.BILLBOARD1, SPRITES.BILLBOARD2, SPRITES.BILLBOARD3];
SPRITES.OFFROADLEFT = [SPRITES.ARCO];
// SPRITES.ARBOLES = [SPRITES.ARBOL1, SPRITES.ARBOL2, SPRITES.ARBOL3];





GameManager.Game = function(game) {};
GameManager.Game.prototype = {
    create: function() {
        fondoSound = game.add.audio('fondo');
        fondoSound.loop = true;
        Bump = game.add.audio('Bump');
        Motor = game.add.audio('Motor');
        Motor.loop = true;
        Hard = game.add.audio('Hard');
        Hard.loop = true;
        Premio = game.add.audio('Premio');
        if(game.device.desktop){
            TotalOffRoad = 200;

        }



        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        //full Screen code
        //if (!game.device.desktop) { game.input.onDown.add(this.gofull, this); } //go fullscreen on mobile devices



        cameraDepth = 1 / Math.tan((fieldOfView / 2) * Math.PI / 180);
        playerZ = (cameraHeight * cameraDepth);



        this.sky = this.game.add.sprite(0, 0, 'sky');

        // this.mountain = this.game.add.tileSprite(0, 0, width, height, 'mountain');
        //this.mountain.tilePosition.y = -15;

        this.city = this.game.add.tileSprite(0, 0, width, height, 'city');
        this.city.tilePosition.y = -15;

        this.hills = this.game.add.tileSprite(0, 0, width, height, 'hills');
        this.hills.tilePosition.y = -30;



        shape = this.game.add.graphics(0, 0);

        GameManager.road.createRoad();
        renderGroup = this.game.add.group();

        Player = this.game.add.sprite(0, 0, SPRITES.PLAYER_STRAIGHT.sheet, SPRITES.PLAYER_STRAIGHT.name);
        //Doc = this.game.add.sprite(50, 5, SPRITES.PLAYER1.sheet, SPRITES.PLAYER1.name);
        PowerUp = this.game.add.sprite(0, 0, SPRITES.POWERUP.sheet, SPRITES.POWERUP.name);
        SPRITES.PLAYER_STRAIGHT.w = Player.width;
        SPRITES.PLAYER_STRAIGHT.h = Player.height;
        SPRITES.SCALE = 0.2 * (1 / SPRITES.PLAYER_STRAIGHT.w); // the reference sprite width should be 1/3rd the (half-)roadWidth
        GameManager.draws.PlaceSprites(Player, cameraDepth / playerZ, width / 2, height, -0.5, -1, null, SPRITES.PLAYER_STRAIGHT.w, SPRITES.PLAYER_STRAIGHT.h);
        //GameManager.draws.PlaceSprites(PowerUp, cameraDepth / playerZ, width / 2, height, -0.5, -1, null, SPRITES.PLAYER_STRAIGHT.w, SPRITES.PLAYER_STRAIGHT.h);
        //Player.scale.setTo(0.8);
        //Player.y = 370;
        //Player.x = 552 - Player.width;
        Player.animations.add('STRAIGHT', Phaser.Animation.generateFrameNames('carro000', 0, 0,), 15, true);
        Player.animations.add('STRAIGHTL', Phaser.Animation.generateFrameNames('carro000', 5,5), 15, true);
        Player.animations.add('STRAIGHTR', Phaser.Animation.generateFrameNames('carro000', 3,3), 15, true);
        Player.animations.add('CURVESL', Phaser.Animation.generateFrameNames('carro000', 5, 5), 15, true);
        Player.animations.add('CURVESR', Phaser.Animation.generateFrameNames('carro000', 3, 3), 15, true);
        Player.animations.add('CURVEHL', Phaser.Animation.generateFrameNames('carro000', 6, 6), 15, true);
        Player.animations.add('CURVEHR', Phaser.Animation.generateFrameNames('carro000', 4, 4), 15, true);

        Player.addChild(PowerUp);
        PowerUp.scale.setTo(0.5);
        PowerUp.x = 25;
        PowerUp.y = -20;



        PlayerCollider = game.add.graphics(0, 0);
        Player.animations.stop();
        PlayerCollider.clear();
        PlayerCollider.beginFill(0xffffff, alpha);
        PlayerCollider.drawRect(32, 0, 109, 140);
        PlayerCollider.endFill();
        Player.addChild(PlayerCollider);

        var GoodPowerUP = PowerUp.animations.add('good', Phaser.Animation.generateFrameNames('Secuencia efecto OK_0000', 0, 7, '.png'), 15, false);
        var BadPowerUP = PowerUp.animations.add('Bad', Phaser.Animation.generateFrameNames('Secuencia efecto rojo OK_0000', 0, 7, '.png'), 15, false);
        PowerUp.visible = false;

        GoodPowerUP.onComplete.add(function() {
            PowerUp.animations.stop();
            PowerUp.visible = false;
        }, this);
        BadPowerUP.onComplete.add(function() {
            PowerUp.animations.stop();
            PowerUp.visible = false;
        }, this);


        if (!game.device.desktop) {
            this.buttonLeft = this.game.add.button(0, 0, SPRITES.BOTON.sheet, null, this, SPRITES.BOTON.name, SPRITES.BOTON.name, SPRITES.BOTON.name);
            this.buttonLeft.inputEnabled = true;
            this.buttonLeft.events.onInputOver.add(function() { moveLeft = true; });
            this.buttonLeft.events.onInputOut.add(function() { moveLeft = false; });
            this.buttonLeft.events.onInputDown.add(function() { moveLeft = true; });
            this.buttonLeft.events.onInputUp.add(function() { moveLeft = false; });

            this.buttonLeft.x = 140;
            this.buttonLeft.y = 442;
            this.buttonLeft.width = 100;
            this.buttonLeft.height = 100;
            this.buttonLeft.angle = 180;

            this.buttonRight = this.game.add.button(0, 0, SPRITES.BOTON.sheet, null, this, SPRITES.BOTON.name, SPRITES.BOTON.name, SPRITES.BOTON.name);
            this.buttonRight.inputEnabled = true;
            this.buttonRight.events.onInputOver.add(function() { moveRight = true; });
            this.buttonRight.events.onInputOut.add(function() { moveRight = false; });
            this.buttonRight.events.onInputDown.add(function() { moveRight = true; });
            this.buttonRight.events.onInputUp.add(function() { moveRight = false; });

            this.buttonRight.x = 150;
            this.buttonRight.y = 350;
            this.buttonRight.width = 100;
            this.buttonRight.height = 100;

            this.buttonAcel = this.game.add.button(0, 0, SPRITES.ACEL.sheet, null, this, SPRITES.ACEL.name, SPRITES.ACEL.name, SPRITES.ACEL.name);
            this.buttonAcel.inputEnabled = true;
            this.buttonAcel.events.onInputOver.add(function() { AcelBool = true; });
            this.buttonAcel.events.onInputOut.add(function() { AcelBool = false; });
            this.buttonAcel.events.onInputDown.add(function() { AcelBool = true; });
            this.buttonAcel.events.onInputUp.add(function() { AcelBool = false; });

            this.buttonAcel.x = 900;
            this.buttonAcel.y = 370;
            this.buttonAcel.width = 100;
            this.buttonAcel.height = 100;

            this.buttonBreak = this.game.add.button(0, 0, SPRITES.BREAK.sheet, null, this, SPRITES.BREAK.name, SPRITES.BREAK.name, SPRITES.BREAK.name);
            this.buttonBreak.inputEnabled = true;
            this.buttonBreak.events.onInputOver.add(function() { breakBool = true; });
            this.buttonBreak.events.onInputOut.add(function() { breakBool = false; });
            this.buttonBreak.events.onInputDown.add(function() { breakBool = true; });
            this.buttonBreak.events.onInputUp.add(function() { breakBool = false; });

            this.buttonBreak.x = 900;
            this.buttonBreak.y = 250;
            this.buttonBreak.width = 100;
            this.buttonBreak.height = 100;
        } else {
            this.keyLeft = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.keyLeft.onDown.add(function() { moveLeft = true; }, this);
            this.keyLeft.onUp.add(function() { moveLeft = false; }, this);

            this.keyRight = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.keyRight.onDown.add(function() { moveRight = true; }, this);
            this.keyRight.onUp.add(function() { moveRight = false; }, this);

            this.keyAcel = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.keyAcel.onDown.add(function() { AcelBool = true; }, this);
            this.keyAcel.onUp.add(function() { AcelBool = false; }, this);

            this.keyBreak = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.keyBreak.onDown.add(function() { breakBool = true; }, this);
            this.keyBreak.onUp.add(function() { breakBool = false; }, this);


        }

        this.healtBarBack = game.add.sprite(856, 216, SPRITES.HUDACEITE.sheet, SPRITES.HUDACEITE.name);
        healtBar = game.add.sprite(871, 228, SPRITES.HUDBARRA.sheet, SPRITES.HUDBARRA.name);

        healtBarMask = game.add.graphics(0, 0);
        healtBarMask.beginFill(0xffffff, alpha);
        healtBarMask.drawRect(871, 228, healtBar.width, healtBar.height);
        healtBarMask.endFill();
        healt = healtBar.width;
        FullHealt = healt;
        healtBar.mask = healtBarMask;



        //this.logoPromo = game.add.sprite(417, 20, SPRITES.LOGOPROMO.sheet, SPRITES.LOGOPROMO.name);
        //this.logoMotos = game.add.sprite(885, 20, SPRITES.LOGOMOTOS.sheet, SPRITES.LOGOMOTOS.name);
        this.fondoPuntos = game.add.sprite(-25, -20, SPRITES.FONDOPUNTAJE.sheet, SPRITES.FONDOPUNTAJE.name);
        soundOn = game.add.sprite(960, 76, 'soundOn');
        soundOn.scale.setTo(0.8);
        soundOn.inputEnabled = true;
        /*this.soundOn.events.onInputOver.add(function() {
            game.sound.mute = false;
            this.soundOff.visible = true;
            this.soundOn.visible = false;
        });*/
        soundOff = game.add.sprite(960, 76, 'soundOff');
        soundOff.scale.setTo(0.8);
        soundOff.inputEnabled = true;
        /* this.soundOff.events.onInputOver.add(function() {
             game.sound.mute = true;
             this.soundOff.visible = false;
             this.soundOn.visible = true;
         });*/
        soundOn.events.onInputDown.add(this.SoundOn);
        soundOff.events.onInputDown.add(this.SoundOff);
        soundOn.visible = false;
        textoHud = game.add.text(17, 55, "0", StyleHud);


        inicio = game.add.sprite(0, 0, SPRITES.INSTRUCCIONES.name);
        seleccion = game.add.sprite(0, 0, SPRITES.SELECCION.name);
        final = game.add.sprite(0, 0, SPRITES.FINAL.name);
        textoFinal = game.add.text(245, 221, "0", StyleFinal);
        final.addChild(textoFinal);
        final.x = 2000;
        inicio.x = 2000;


        this.btFinal = game.add.graphics(0, 0);
        this.btFinal.beginFill(0x000000, alpha);
        this.btFinal.drawRect(451, 376, 160, 54);
        this.btFinal.endFill();

        this.btFinal.inputEnabled = true;
        this.btFinal.events.onInputDown.add(this.reset);

        this.btReset = game.add.graphics(0, 0);
        this.btReset.beginFill(0x000000, alpha);
        this.btReset.drawRect(159, 376, 242, 54);
        this.btReset.endFill();
        this.btReset.inputEnabled = true;
        this.btReset.events.onInputDown.add(this.reset);
        final.addChild(this.btReset);
        final.addChild(this.btFinal);


        this.btInicio = game.add.graphics(0, 0);
        this.btInicio.beginFill(0xff0000, alpha);
        this.btInicio.drawRect(780, 410, 210, 50);
        this.btInicio.endFill();
        inicio.addChild(this.btInicio);
        this.btInicio.inputEnabled = true;
        this.btInicio.events.onInputDown.add(this.start);


        this.btp1 = game.add.graphics(0, 0);
        this.btp1.beginFill(0x000000, alpha);
        this.btp1.drawRect(82, 172, 115, 115);
        this.btp1.endFill();
        this.btp1.inputEnabled = true;
        this.btp1.events.onInputDown.add(()=>{
            this.selectPlayer('p1');
        });
        seleccion.addChild(this.btp1);

        this.btp2 = game.add.graphics(0, 0);
        this.btp2.beginFill(0x000000, alpha);
        this.btp2.drawRect(238, 172, 115, 115);
        this.btp2.endFill();
        this.btp2.inputEnabled = true;
        this.btp2.events.onInputDown.add(()=>{
            this.selectPlayer('p2');
        });
        seleccion.addChild(this.btp2);

        this.btp3 = game.add.graphics(0, 0);
        this.btp3.beginFill(0x000000, alpha);
        this.btp3.drawRect(82, 314, 115, 115);
        this.btp3.endFill();
        this.btp3.inputEnabled = true;
        this.btp3.events.onInputDown.add(()=>{
            this.selectPlayer('p3');
        });
        seleccion.addChild(this.btp3);

        this.btp4 = game.add.graphics(0, 0);
        this.btp4.beginFill(0x000000, alpha);
        this.btp4.drawRect(238, 314, 115, 115);
        this.btp4.endFill();
        this.btp4.inputEnabled = true;
        this.btp4.events.onInputDown.add(()=>{
            this.selectPlayer('p4');
        });
        seleccion.addChild(this.btp4);

        /*this.continuar = game.add.graphics(0, 0);
        this.continuar.beginFill(0x000000, alpha);
        this.continuar.drawRect(775, 409, 215, 55);
        this.continuar.endFill();
        this.continuar.inputEnabled = true;
        this.continuar.events.onInputDown.add(this.select);
        seleccion.addChild(this.continuar);*/

        //game.sound.setDecodedCallback([ fondo ], start, this);

        game.onBlur.add(this.blurPause);




    },
    SoundOn: function() {
        game.sound.mute = false;
        soundOff.visible = true;
        soundOn.visible = false;
    },
    SoundOff: function() {
        game.sound.mute = true;
        soundOff.visible = false;
        soundOn.visible = true;

    },
    blurPause: function() {


    },
    reset: function() {
        location.reload();

    },
    start: function() {
        inicio.x = 2000;
        seleccion.x = 0;


    },
    select: function (){
        begin = true;
        seleccion.x = 2000;
        fondoSound.play();
        Motor.play();
    },
    selectPlayer: function(player){
        switch(player){
            case 'p1':
            //console.log('gorro');
            Doc = this.game.add.sprite(50, 5, SPRITES.PLAYER3.sheet, SPRITES.PLAYER3.name);
            Doc.animations.add('GIRO', Phaser.Animation.generateFrameNames('p1000', 6, 8), 15, true);
            Player.addChild(Doc);

            break;
            case 'p2':
            Doc = this.game.add.sprite(50, 5, SPRITES.PLAYER2.sheet, SPRITES.PLAYER2.name);
            Doc.animations.add('GIRO', Phaser.Animation.generateFrameNames('p1000', 3, 5), 15, true);
            Player.addChild(Doc);
            break;
            case 'p3':
            Doc = this.game.add.sprite(50, 5, SPRITES.PLAYER4.sheet, SPRITES.PLAYER4.name);
            Doc.animations.add('GIRO', Phaser.Animation.generateFrameNames('p1', 9, 11,'',4), 15, true);
            Player.addChild(Doc);
            break;
            case 'p4':
            Doc = this.game.add.sprite(50, 5, SPRITES.PLAYER1.sheet, SPRITES.PLAYER1.name);
            Doc.animations.add('GIRO', Phaser.Animation.generateFrameNames('p1000', 0,2), 15, true);
            Player.addChild(Doc);
            break;

        }
        this.select();
    },
    update: function() {

        var n, car, carW, sprite, spriteW;
        fps = this.game.time.fps;
        speedPercent = speed / maxSpeed;
        var playerW = SPRITES.PLAYER_STRAIGHT.w * SPRITES.SCALE;
        var playerSegment = GameManager.road.findSegment(position + playerZ);

        if (fps != 0) {
            step = 1 / fps;
        }
        position = Util.increase(position, step * speed, trackLength);
        dx = step * 2 * (speed / maxSpeed); // at top speed, should be able to cross from left to right (-1 to 1) in 1 second

        GameManager.cars.updateCars(step, playerSegment, playerW);



        if (begin == true) {
            if (moveLeft == true) {
                playerX = playerX - dx;
            } else if (moveRight == true) {
                playerX = playerX + dx;
            }

            if (breakBool == true) {
                speed = Util.accelerate(speed, breaking, step);
            }

            if (AcelBool == true) {
                speed = Util.accelerate(speed, accel, step);
            } else if (breakBool == true) {
                speed = Util.accelerate(speed, breaking, step);
            } else {
                speed = Util.accelerate(speed, decel, step);
            }

            healt -= darinSpeed;
            if (healt < 0) {
                fondoSound.stop();
                Motor.stop();
                game.sound.mute = true;
                final.x = 0;
                textoFinal.setText(Math.floor(puntaje).toString());
                this.sendScore();
            }

        }

        playerX = playerX - (dx * speedPercent * playerSegment.curve * centrifugal);
        playerX = Util.limit(playerX, -2, 2); // dont ever let player go too far out of bounds
        speed = Util.limit(speed, 0, maxSpeed); // or exceed maxSpeed

        if ((playerX < -1) || (playerX > 1)) {
            if (speed > offRoadLimit) {
                speed = Util.accelerate(speed, offRoadDecel, step);
            }


            for (n = 0; n < playerSegment.sprites.length; n++) {
                sprite = playerSegment.sprites[n];
                //spriteW = sprite.w * SPRITES.SCALE;
                /*if (Util.overlap(playerX, playerW, sprite.offset + spriteW / 2 * (sprite.offset > 0 ? 1 : -1), spriteW)) {
                    speed = maxSpeed / 5;
                    position = Util.increase(playerSegment.p1.world.z, -playerZ, trackLength); // stop in front of sprite (at front of segment)
                    break;
                }*/
                if (this.checkOverlap(sprite, PlayerCollider)) {
                    if (Bump.isPlaying == false) {
                        Bump.play();
                    }
                    speed = maxSpeed / 5;
                    position = Util.increase(playerSegment.p1.world.z, -playerZ, trackLength); // stop in front of sprite (at front of segment)
                    break;
                }
            }
        }

        for (n = 0; n < playerSegment.cars.length; n++) {
            car = playerSegment.cars[n];
            //carW = car.sprite.w * SPRITES.SCALE;
            if (speed > car.speed) {
                if (this.checkOverlap(car.sprite, PlayerCollider)) {
                    Bump.stop();
                    Bump.play();
                    speed = car.speed * (car.speed / speed);
                    position = Util.increase(car.z, -playerZ, trackLength);
                    break;
                }
            }
        }


        Player.y = GameManager.Player.bounce(Player.y, Player.height);
        if (Player.y < 274) {
            Player.y = 274;
        } else if (Player.y > 284) {
            Player.y = 284;
        }


        //skyOffset = Util.increase(skyOffset, skySpeed * playerSegment.curve * speedPercent, 1);
        hillOffset = Util.increase(hillOffset, hillSpeed * playerSegment.curve * speedPercent, 1);
        treeOffset = Util.increase(treeOffset, treeSpeed * playerSegment.curve * speedPercent, 1);

        //GameManager.draws.Background(this.mountain, skyOffset, resolution * skySpeed*playerY);
        //GameManager.draws.Background(this.city, hillOffset, resolution * hillSpeed*playerY);
        //GameManager.draws.Background(this.hills, treeOffset, resolution * treeSpeed*playerY);
        //BackGroundJose

        //GameManager.draws.BackGroundJose(this.mountain, playerSegment.curve, resolution * skySpeed * playerY, skySpeed, playerSegment.index);
        GameManager.draws.BackGroundJose(this.city, playerSegment.curve, resolution * hillSpeed * playerY, hillSpeed, playerSegment.index);
        GameManager.draws.BackGroundJose(this.hills, playerSegment.curve, resolution * treeSpeed * playerY, treeSpeed, playerSegment.index);

        if (begin == true) {

            if (OldBackGroundIndex != playerSegment.index) {
                puntaje += puntajeSegmentos;
                textoHud.setText(Math.floor(puntaje).toString());
                //textoHud.setText(fps.toString());
            }
        }

        OldBackGroundIndex = playerSegment.index;

        GameManager.road.render();
        GameManager.Player.Animations(playerSegment);
        Player.visible = true;

        for (n = 0; n < playerSegment.coins.length; n++) {
            coin = playerSegment.coins[n];
            //carW = car.sprite.w * SPRITES.SCALE;
            if (this.checkOverlap(coin.sprite, PlayerCollider)) {
                Premio.stop();
                Premio.play();
                coin.sprite.sprite.visible = false;
                GameManager.coins.CoinUpdate(n, coin);
                PowerUp.visible = true;
                if (healt != FullHealt) {
                    healt += 10;
                    if (healt > FullHealt) {
                        healt = FullHealt;
                    }
                }
                PowerUp.animations.play('good');
                break;
            }
        }

        healtBarMask.clear();
        healtBarMask.beginFill(0xffffff, alpha);
        healtBarMask.drawRect(871, 228, healt, healtBar.height);
        healtBarMask.endFill();
    },
    DrawPolygon: function(form, x1, y1, x2, y2, x3, y3, x4, y4, color) {
        var poly = new Phaser.Polygon({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }, { x: x4, y: y4 });;
        form.beginFill(color, 1);
        form.drawPolygon(poly.points);
        form.endFill();

    },
    gofull: function() { game.scale.startFullScreen(false); },
    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.sprite.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    },

    sendScore: function()
    {
     if(begin == true)
     {
      const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

      fetch(`/store/${puntaje}`, {
       method: 'PUT',
       body: puntaje,
       headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
       }
      })
      .then(function(response)
      {
       if(!response.ok){
        throw Error(response.status);
       }

       return response.text();
      })
      .then(function(data)
      {
       Swal.fire({
        icon: "success",
        title: "<h6 class='text-center'>¡Buen Trabajo!</h6>",
        html: "<h5 class='text-center'>Sigue participando para mejorar su puntaje.</h5>",
        confirmButtonColor: '#FFA500'
       })

       setTimeout(function(){ window.location.reload(); }, 1500);
      })
      .catch(function(error)
      {
       switch (error)
       {
        case 'Error: 400':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>No se ha hecho la petición de forma correcta. No se ha guardado su puntaje, por favor vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        case 'Error: 403':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5 class='text-center'>Acceso denegado.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        case 'Error: 404':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>No se ha guardado su puntaje porque no se ha logrado establecer la conexión con el servidor, por favor vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        case 'Error: 405':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>No se ha guardado su puntaje porque su sesión ha caducado, por favor logueate y vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        case 'Error: 500':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>No se ha guardado su puntaje porque no se recibido una respuesta del servidor, por favor vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        case 'Error: 504':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>El tiempo de respuesta del servidor ha alcanzado el máximo tiempo de límite. No se ha guardado su puntaje, por favor vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        case 'Error: 509':
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>Se ha superado el ancho de banda disponible. No se ha guardado su puntaje, por favor vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;

        default:
         Swal.fire({
          icon: "error",
          title: "<h6 class='text-center'>Atención</h6>",
          html: "<h5>No se ha guardado su puntaje porque su sesión ha caducado, por favor logueate y vuelve a intentarlo.</h5>",
          confirmButtonColor: '#FFA500'
         })
         break;
       }

       setTimeout(function(){ window.location.reload(); }, 1500);
      });

      begin = false;
     }

     function ranking(){
      window.location.href = "ranking";
     }

     function refresh(){
      window.location.href = "/";
     }
    }
};


GameManager.road = {
    createRoad: function(curve) {
        segments = [];

        this.addStraight();
        //this.addStraight();
        this.addCurve(ROAD.LENGTH.LONG, -ROAD.CURVE.EASY, -ROAD.HILL.HIGH);
        this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.EASY, ROAD.HILL.NONE);
        this.addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM);
        this.addCurve(ROAD.LENGTH.SHORT, -ROAD.CURVE.HARD, ROAD.HILL.MEDIUM);
        //this.addStraight();
        this.addCurve(ROAD.LENGTH.MEDIUM, ROAD.CURVE.HARD, ROAD.HILL.NONE);
        this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
        //this.addStraight();
        this.addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, ROAD.HILL.HIGH);
        this.addCurve(ROAD.LENGTH.MEDIUM, -ROAD.CURVE.MEDIUM, -ROAD.HILL.LOW);
        this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.MEDIUM, ROAD.HILL.LOW);
        this.addHill(ROAD.LENGTH.SHORT, ROAD.HILL.HIGH);
        this.addHill(ROAD.LENGTH.LONG, ROAD.HILL.LOW);
        /*this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.HARD, ROAD.HILL.NONE);
        this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.HARD, -ROAD.HILL.LOW);
        this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.HARD, ROAD.HILL.NONE);
        this.addCurve(ROAD.LENGTH.SHORT, -ROAD.CURVE.MEDIUM, ROAD.HILL.NONE);
        this.addCurve(ROAD.LENGTH.SHORT, -ROAD.CURVE.MEDIUM, -ROAD.HILL.MEDIUM);
        this.addStraight();*/
        this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.HARD, ROAD.HILL.NONE);
        this.addCurve(ROAD.LENGTH.SHORT, ROAD.CURVE.HARD, ROAD.HILL.NONE);
        this.addStraight(ROAD.LENGTH.SHORT);
        //this.addCurve(ROAD.LENGTH.LONG, ROAD.CURVE.EASY, -ROAD.HILL.HIGH);
        this.addDownhillToEnd(30);

        GameManager.offRoadSprites.createSprites();
        GameManager.cars.createCars();
        //GameManager.coins.creatCoins();

        trackLength = segments.length * segmentLength;

        //console.log(segments.length);

    },
    addSegment: function(curve, y) {
        var n = segments.length;
        segments.push({
            index: n,
            p1: {
                world: {
                    y: this.LastY(),
                    z: n * segmentLength
                },
                camera: {},
                screen: {}
            },
            p2: {
                world: {
                    y: y,
                    z: (n + 1) * segmentLength
                },
                camera: {},
                screen: {}
            },
            curve: curve,
            sprites: [],
            cars: [],
            coins: [],
            color: Math.floor(n / rumbleLength) % 2 ? COLORS.DARK : COLORS.LIGHT
        });

    },
    drawSegment: function(shape, width, lanes, x1, y1, w1, x2, y2, w2, fog, color) {
        var r1 = Render.rumbleWidth(w1, lanes),
            r2 = Render.rumbleWidth(w2, lanes),
            l1 = Render.laneMarkerWidth(w1, lanes),
            l2 = Render.laneMarkerWidth(w2, lanes),
            lanew1, lanew2, lanex1, lanex2, lane;


        shape.beginFill(color.grass, 1);
        shape.drawRect(0, y2, width, y1 - y2);
        shape.endFill();

        GameManager.Game.prototype.DrawPolygon(shape, x1 - w1 - r1, y1, x1 - w1, y1, x2 - w2, y2, x2 - w2 - r2, y2, color.rumble);
        GameManager.Game.prototype.DrawPolygon(shape, x1 + w1 + r1, y1, x1 + w1, y1, x2 + w2, y2, x2 + w2 + r2, y2, color.rumble);
        GameManager.Game.prototype.DrawPolygon(shape, x1 - w1, y1, x1 + w1, y1, x2 + w2, y2, x2 - w2, y2, color.road);

        if (color.lane) {
            lanew1 = w1 * 2 / lanes;
            lanew2 = w2 * 2 / lanes;
            lanex1 = x1 - w1 + lanew1;
            lanex2 = x2 - w2 + lanew2;
            for (lane = 1; lane < lanes; lanex1 += lanew1, lanex2 += lanew2, lane++)
                GameManager.Game.prototype.DrawPolygon(shape,
                    lanex1 - l1 / 2,
                    y1,
                    lanex1 + l1 / 2,
                    y1,
                    lanex2 + l2 / 2,
                    y2, lanex2 - l2 / 2,
                    y2,
                    color.lane);
        }

    },
    addStraight: function(num) {
        num = num || ROAD.LENGTH.MEDIUM;
        this.addRoad(num, num, num, 0, 0);
    },

    addCurve: function(num, curve, height) {
        num = num || ROAD.LENGTH.MEDIUM;
        curve = curve || ROAD.CURVE.MEDIUM;
        height = height || ROAD.HILL.NONE;
        this.addRoad(num, num, num, curve, height);
    },
    addHill: function(num, height) {
        num = num || ROAD.LENGTH.MEDIUM;
        height = height || ROAD.HILL.MEDIUM;
        this.addRoad(num, num, num, 0, height);
    },
    addDownhillToEnd: function(num) {
        num = num || 30;
        this.addRoad(num, num, num, ROAD.CURVE.NONE, -this.LastY() / segmentLength);
    },
    addRoad: function(enter, hold, leave, curve, y) {
        var startY = this.LastY();
        var endY = startY + (Util.toInt(y, 0) * segmentLength);
        var n, total = enter + hold + leave;
        for (n = 0; n < enter; n++)
            this.addSegment(Util.easeIn(0, curve, n / enter), Util.easeInOut(startY, endY, n / total));
        for (n = 0; n < hold; n++)
            this.addSegment(curve, Util.easeInOut(startY, endY, (enter + n) / total));
        for (n = 0; n < leave; n++)
            this.addSegment(Util.easeInOut(curve, 0, n / leave), Util.easeInOut(startY, endY, (enter + hold + n) / total));

    },
    LastY: function() {
        return (segments.length == 0) ? 0 : segments[segments.length - 1].p2.world.y;
    },
    findSegment: function(z) {
        return segments[Math.floor(z / segmentLength) % segments.length];
    },
    render: function() {
        var baseSegment = this.findSegment(position);
        var basePercent = Util.percentRemaining(position, segmentLength);

        var playerSegment = this.findSegment(position + playerZ);
        var playerPercent = Util.percentRemaining(position + playerZ, segmentLength);
        playerY = Util.interpolate(playerSegment.p1.world.y, playerSegment.p2.world.y, playerPercent);



        var maxy = height;

        var x = 0;
        var dx = -(baseSegment.curve * basePercent);

        shape.clear();
        renderGroup.removeAll();

        var n, segment, spriteScale, spriteX, spriteY;

        for (n = 0; n < drawDistance; n++) {
            segment = segments[(baseSegment.index + n) % segments.length];
            segment.looped = segment.index < baseSegment.index;
            //segment.fog = Util.exponentialFog(n / drawDistance, fogDensity);
            segment.clip = maxy;

            Util.project(segment.p1, (playerX * roadWidth) - x, playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth);
            Util.project(segment.p2, (playerX * roadWidth) - x - dx, playerY + cameraHeight, position - (segment.looped ? trackLength : 0), cameraDepth, width, height, roadWidth)

            x = x + dx;
            dx = dx + segment.curve;

            if ((segment.p1.camera.z <= cameraDepth) || // behind us
                (segment.p2.screen.y >= segment.p1.screen.y) ||
                (segment.p2.screen.y >= maxy)) // clip by (already rendered) segment
                continue;

            this.drawSegment(shape, width, lanes,
                segment.p1.screen.x,
                segment.p1.screen.y,
                segment.p1.screen.w,
                segment.p2.screen.x,
                segment.p2.screen.y,
                segment.p2.screen.w,
                segment.fog,
                segment.color);

            maxy = segment.p1.screen.y;
        }




        for (n = (drawDistance - 1); n > 0; n--) {
            segment = segments[(baseSegment.index + n) % segments.length];


            //car
            for (i = 0; i < segment.cars.length; i++) {
                car = segment.cars[i];
                sprite = car.sprite;
                spriteScale = Util.interpolate(segment.p1.screen.scale, segment.p2.screen.scale, car.percent);
                spriteX = Util.interpolate(segment.p1.screen.x, segment.p2.screen.x, car.percent) + (spriteScale * car.offset * roadWidth * width / 2);
                spriteY = Util.interpolate(segment.p1.screen.y, segment.p2.screen.y, car.percent);
                renderGroup.add(sprite.sprite);
                sprite.sprite.visible = true;
                GameManager.draws.PlaceSprites(sprite.sprite, spriteScale, spriteX, spriteY, -0.5, -1, segment.clip, sprite.w, sprite.h);
                //Render.sprite( car.sprite, spriteScale, spriteX, spriteY, -0.5, -1, segment.clip);
            }


            //render sprites
            for (i = 0; i < segment.sprites.length; i++) {
                sprite = segment.sprites[i];
                spriteScale = segment.p1.screen.scale;
                spriteX = segment.p1.screen.x + (spriteScale * sprite.offset * roadWidth * width / 2);
                spriteY = segment.p1.screen.y;
                //object,scale, destX, destY, offsetX, offsetY, clipY

                renderGroup.add(sprite.sprite);
                sprite.sprite.visible = true;
                GameManager.draws.PlaceSprites(sprite.sprite, spriteScale, spriteX, spriteY, (sprite.offset < 0 ? -1 : 0), -1, segment.clip, sprite.w, sprite.h);
            }

            for (i = 0; i < segment.coins.length; i++) {
                coin = segment.coins[i];
                sprite = coin.sprite;
                spriteScale = segment.p1.screen.scale;
                spriteX = segment.p1.screen.x + (spriteScale * coin.offset * roadWidth * width / 2);
                spriteY = segment.p1.screen.y;


                renderGroup.add(sprite.sprite);
                sprite.sprite.visible = true;
                GameManager.draws.PlaceSprites(sprite.sprite, spriteScale, spriteX, spriteY, (sprite.offset < 0 ? -1 : 0), -1, segment.clip, sprite.w, sprite.h);


            }
        }

    }

};
GameManager.Player = {
    Animations: function(segment) {
        if (speed > 0) {
            if (moveLeft == true) {
                if (segment.curve == ROAD.CURVE.NONE) {
                    if (Hard.isPlaying == true) {
                        Hard.stop();
                    }
                    Player.animations.play('STRAIGHTL');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(28, 0, 115, 145);
                    PlayerCollider.endFill();

                } else if (segment.curve < 0 && segment.curve >= -ROAD.CURVE.MEDIUM) {
                    if (Hard.isPlaying == true) {
                        Hard.stop();
                    }
                    Player.animations.play('CURVESL');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(28, 0, 115, 145);
                    PlayerCollider.endFill();

                } else if (segment.curve < -ROAD.CURVE.MEDIUM) {
                    if (Hard.isPlaying == false) {
                        Hard.play();
                    }
                    Player.animations.play('CURVEHL');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(25, 0, 117, 145);
                    PlayerCollider.endFill();
                } else if (segment.curve > 0) {
                    if (Hard.isPlaying == true) {
                        Hard.stop();
                    }
                    Player.animations.play('STRAIGHTL');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(28, 0, 115, 145);
                    PlayerCollider.endFill();
                }

            } else if (moveRight == true) {
                if (segment.curve == ROAD.CURVE.NONE) {
                    if (Hard.isPlaying == true) {
                        Hard.stop();
                    }
                    Player.animations.play('STRAIGHTR');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(32, 0, 115, 145);
                    PlayerCollider.endFill();

                } else if (segment.curve > 0 && segment.curve <= ROAD.CURVE.MEDIUM) {
                    if (Hard.isPlaying == true) {
                        Hard.stop();
                    }
                    Player.animations.play('CURVESR');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(32, 0, 115, 145);
                    PlayerCollider.endFill();

                } else if (segment.curve > ROAD.CURVE.MEDIUM) {
                    if (Hard.isPlaying == false) {
                        Hard.play();
                    }
                    Player.animations.play('CURVEHR');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(32, 0, 115, 145);
                    PlayerCollider.endFill();
                } else if (segment.curve < 0) {
                    if (Hard.isPlaying == true) {
                        Hard.stop();
                    }
                    Player.animations.play('STRAIGHTR');
                    PlayerCollider.clear();
                    PlayerCollider.beginFill(0xffffff, alpha);
                    PlayerCollider.drawRect(32, 0, 115, 145);
                    PlayerCollider.endFill();

                }

            } else {
                if (Hard.isPlaying == true) {
                    Hard.stop();
                }
                Player.animations.play('STRAIGHT');
                PlayerCollider.clear();
                PlayerCollider.beginFill(0xffffff, alpha);
                PlayerCollider.drawRect(32, 0, 109, 140);
                PlayerCollider.endFill();
            }
        } else {
            if (Hard.isPlaying == true) {
                Hard.stop();
            }
            Player.animations.play('STRAIGHT');
            Player.animations.stop();
            PlayerCollider.clear();
            PlayerCollider.beginFill(0xffffff, alpha);
            PlayerCollider.drawRect(32, 0, 109, 140);
            PlayerCollider.endFill();

        }

    },
    /*MovePlayerDown: function() {
        switch (this.name) {
            case "Left":
                moveLeft = true;
                //this.mc.frameName = 'player_left.png';
                break;
            case "Right":
                moveRight = true;
                //this.mc.frameName = 'player_right.png';
                break;
            case "Brake":
                breakBool = true;
                break;
        }
    },
    MovePlayerUp: function() {
        switch (this.name) {
            case "Left":
                moveLeft = false;
                //this.mc.frameName = 'player_straight.png';
                break;
            case "Right":
                moveRight = false;
                //this.mc.frameName = 'player_straight.png';
                break;
            case "Brake":
                breakBool = false;
                break;
        }
    },*/
    bounce: function(PlayerY, PlayerH) {

        //var speedPercent = speed / maxSpeed;

        var bounce = (1 * Math.random() * speedPercent) * Util.randomChoice([-1, 1]);

        PlayerY = PlayerY + bounce;


        return PlayerY;
    }

};

GameManager.offRoadSprites = {
    createSprites: function() {
        var n, i, maxOffset, minOffset, maxSegment, minSegment, nameSelect, RandomOffset, RandomSegment, tempn;

        //this.addSprite(12, SPRITES.ARCO, 0,0.5,false);

        for (n = 15; n < segments.length/2; n += 30) {
            this.addSprite(n, SPRITES.ARCO, 0,0.5,false);
        }

        //this.addSprite(segments.length-1, SPRITES.EDIFICIO, 1);
        //this.addSprite(segments.length-1, SPRITES.EDIFICIO, -1);
        //console.log(segments.length/2);
        var templenght = Math.floor(segments.length/2);
        for (n = templenght ; n < segments.length ; n += 8) {
            this.addSprite(n, SPRITES.EDIFICIO, 1);
        }

        for (n = templenght ; n < segments.length ; n += 8) {
            this.addSprite(n, SPRITES.EDIFICIO2, -1);
        }
        /*for (n = segments.length/2 + 15; n < segments.length-10; n += 5) {
            this.addSprite(n, SPRITES.EDIFICIO, -1);
        }*/

        /*this.addSprite(12, SPRITES.BANDERAD, -1.15);
        this.addSprite(12, SPRITES.BANDERAI, 1);
        this.addSprite(17, SPRITES.BANDERAD, -1.15);
        this.addSprite(17, SPRITES.BANDERAI, 1);
        this.addSprite(20, SPRITES.BANDERAD, -1.15);
        this.addSprite(20, SPRITES.BANDERAI, 1);

        maxOffset = 2;
        minOffset = 1.1;
        minSegment = -15;
        maxSegment = 15;


        for (n = 50; n < segments.length; n += TotalOffRoad) {

            nameSelect = Util.randomChoice(SPRITES.OFFROADRIGHT);
            RandomOffset = Math.floor(Math.random() * (maxOffset - minOffset)) + minOffset;
            RandomSegment = Math.floor(Math.random() * (maxSegment - minSegment)) + minSegment;
            tempn = n + RandomSegment;
            if (tempn >= segments.length) {
                tempn = segments.length - 1;
            } else {
                this.addSprite(n + RandomSegment, nameSelect, RandomOffset);
            }


        }

        for (n = 80; n < segments.length; n += TotalOffRoad) {

            nameSelect = Util.randomChoice(SPRITES.OFFROADLEFT);
            RandomOffset = Math.floor(Math.random() * (maxOffset - minOffset)) + minOffset;
            RandomSegment = Math.floor(Math.random() * (maxSegment - minSegment)) + minSegment;
            tempn = n + RandomSegment;
            if (tempn >= segments.length) {
                tempn = segments.length - 1;
            } else {
                this.addSprite(n + RandomSegment, nameSelect, -RandomOffset);
            }

        }



        if (game.device.desktop) {

            for (n = 500; n < 550; n += 15) {
                this.addSprite(n, SPRITES.FLECHADER, -1.2);
            }

            for (n = 1100; n < 1150; n += 15) {
                this.addSprite(n, SPRITES.FLECHADER, -1.2);
            }

             for (n = 1700; n < 1750; n += 15) {
                this.addSprite(n, SPRITES.FLECHADER, -1.2);
            }

            for (n = 2300; n < 2350; n += 15) {
                this.addSprite(n, SPRITES.FLECHADER, -1.2);
            }


            for (n = 50; n < segments.length; n += TotalOffRoad) {

                nameSelect = Util.randomChoice(SPRITES.ARBOLES);
                RandomOffset = Math.floor(Math.random() * (maxOffset - minOffset)) + minOffset;
                RandomSegment = Math.floor(Math.random() * (maxSegment - minSegment)) + minSegment;
                tempn = n + RandomSegment;
                if (tempn >= segments.length) {
                    tempn = segments.length - 1;
                } else {
                    this.addSprite(n + RandomSegment, nameSelect, RandomOffset + 0.5);
                }

            }

            for (n = 80; n < segments.length; n += TotalOffRoad) {

                nameSelect = Util.randomChoice(SPRITES.ARBOLES);
                RandomOffset = Math.floor(Math.random() * (maxOffset - minOffset)) + minOffset;
                RandomSegment = Math.floor(Math.random() * (maxSegment - minSegment)) + minSegment;
                tempn = n + RandomSegment;
                if (tempn >= segments.length) {
                    tempn = segments.length - 1;
                } else {
                    this.addSprite(n + RandomSegment, nameSelect, -(RandomOffset + 0.5));
                }
            }

        }*/


    },
    addSprite: function(n, sprite, offset,anchor = 0, phisic = true) {
        //console.log(sprite.sheet);
        var tempSprite;
        if(sprite.sheet == undefined){
            tempSprite = game.add.image(0, 0, sprite.name);
        }else{
            tempSprite = game.add.sprite(0, 0, sprite.sheet, sprite.name);
        }
        tempSprite.visible = false;
        tempSprite.anchor.x = anchor;
        ///collaider = mask para futuro no borrar
        if(phisic){
            var collider;
            collider = game.add.graphics(0, 0);
            collider.clear();
            collider.beginFill(0xffffff, alpha);
            collider.drawRect(tempSprite.x, tempSprite.y, tempSprite.width, tempSprite.height);
            collider.endFill();
            tempSprite.addChild(collider);
        }
        segments[n].sprites.push({ sprite: tempSprite, w: tempSprite.width, h: tempSprite.height, offset: offset });
    },
}

GameManager.cars = {
    createCars: function() {
        cars = [];
        var n, car, segment, offset, z, sprite, speed, nameSelect;
        for (var n = 0; n < totalCars; n++) {
            offset = Math.random() * Util.randomChoice([-0.8, 0.8]);
            z = Math.floor(Math.random() * segments.length) * segmentLength;
            nameSelect = Util.randomChoice(SPRITES.CARS);
            //nameSelect = SPRITES.CAR1;
            sprite = game.add.sprite(0, 0, nameSelect.sheet, nameSelect.name);
            speed = maxSpeed / 4 + Math.random() * maxSpeed / (sprite == SPRITES.SEMI ? 4 : 2);
            sprite.visible = false;
            car = {
                offset: offset,
                z: z,
                sprite: {
                    sprite: sprite,
                    w: sprite.width,
                    h: sprite.height
                },
                speed: speed
            };

            segment = GameManager.road.findSegment(car.z);
            segment.cars.push(car);
            cars.push(car);
        }

            offset = 0.5;
            z = 2;
            nameSelect = SPRITES.MONSTER;
            sprite = game.add.sprite(0, 0, nameSelect.sheet, nameSelect.name);
            chair = game.add.sprite(17, 35, SPRITES.CHAIR.sheet, SPRITES.CHAIR.name);
            sprite.addChild(chair);
            //speed = maxSpeed / 4 + Math.random() * maxSpeed / (sprite == SPRITES.SEMI ? 4 : 2);
            speed = maxSpeed*0.1;
            sprite.visible = false;
            car = {
                offset: offset,
                z: z,
                sprite: {
                    sprite: sprite,
                    w: sprite.width,
                    h: sprite.height
                },
                speed: speed,
            };





            segment = GameManager.road.findSegment(car.z);
            segment.cars.push(car);
            cars.push(car);
        //}
    },
    updateCars: function(dt, playerSegment, playerW) {
        var n, car, oldSegment, newSegment;
        for (n = 0; n < cars.length; n++) {
            car = cars[n];
            oldSegment = GameManager.road.findSegment(car.z);
            car.offset = car.offset + this.updateCarOffset(car, oldSegment, playerSegment, playerW);
            //console.log(oldSegment.index);
            //console.log(playerSegment.index);
            //console.log(oldSegment.index - playerSegment.index);
            //console.log(car.speed);
            if(n  == cars.length-1){
                var temp = oldSegment.index - playerSegment.index;
                if(temp > 150){
                    car.speed = maxSpeed * 0.5
                }else if(temp < -150){
                    car.speed = maxSpeed * 1.5;
                }else{
                    car.speed = maxSpeed * (0.9-(temp/300))
                }
            }
            car.z = Util.increase(car.z, dt * car.speed, trackLength);
            car.percent = Util.percentRemaining(car.z, segmentLength); // useful for interpolation during rendering phase
            newSegment = GameManager.road.findSegment(car.z);
            if (oldSegment != newSegment) {
                index = oldSegment.cars.indexOf(car);
                oldSegment.cars.splice(index, 1);
                newSegment.cars.push(car);
            }
        }
    },
    updateCarOffset: function(car, carSegment, playerSegment, playerW) {

        var i, j, dir, segment, otherCar, otherCarW, lookahead = 20,
            carW = car.sprite.w * SPRITES.SCALE;

        // optimization, dont bother steering around other cars when 'out of sight' of the player
        if ((carSegment.index - playerSegment.index) > drawDistance)
            return 0;

        for (i = 1; i < lookahead; i++) {
            segment = segments[(carSegment.index + i) % segments.length];

            if ((segment === playerSegment) && (car.speed > speed) && (Util.overlap(playerX, playerW, car.offset, carW, 1.2))) {
                if (playerX > 0.5)
                    dir = -1;
                else if (playerX < -0.5)
                    dir = 1;
                else
                    dir = (car.offset > playerX) ? 1 : -1;
                return dir * 1 / i * (car.speed - speed) / maxSpeed; // the closer the cars (smaller i) and the greated the speed ratio, the larger the offset
            }

            for (j = 0; j < segment.cars.length; j++) {
                otherCar = segment.cars[j];
                otherCarW = otherCar.sprite.w * SPRITES.SCALE;
                if ((car.speed > otherCar.speed) && Util.overlap(car.offset, carW, otherCar.offset, otherCarW, 1.2)) {
                    if (otherCar.offset > 0.5)
                        dir = -1;
                    else if (otherCar.offset < -0.5)
                        dir = 1;
                    else
                        dir = (car.offset > otherCar.offset) ? 1 : -1;
                    return dir * 1 / i * (car.speed - otherCar.speed) / maxSpeed;
                }
            }
        }

        // if no cars ahead, but I have somehow ended up off road, then steer back on
        if (car.offset < -0.9)
            return 0.1;
        else if (car.offset > 0.9)
            return -0.1;
        else
            return 0;
    }


}
GameManager.coins = {
    creatCoins: function() {
        coins = [];
        var n, coin, segment, offset, z, sprite, speed, nameSelect;
        for (var n = 0; n < TotalCoins; n++) {
            offset = Math.random() * Util.randomChoice([-0.8, 0.8]);
            z = Math.floor(24 + (n * segments.length / TotalCoins)); //Math.floor(Math.random() * segments.length) * segmentLength;
            //nameSelect = Util.randomChoice(SPRITES.CARS).name;
            nameSelect = SPRITES.COIN;
            sprite = game.add.sprite(0, 0, nameSelect.sheet, nameSelect.name);
            sprite.visible = false;
            coin = {
                offset: offset,
                z: z,
                sprite: {
                    sprite: sprite,
                    w: sprite.width,
                    h: sprite.height
                }
            };
            segment = segments[coin.z];
            segment.coins.push(coin);
            coins.push(coin);
        }



    },
    CoinUpdate: function(n, coin) {
        var oldSegment, newSegment;
        var temp = coin;


        oldSegment = segments[temp.z];
        var max = oldSegment.index + drawDistance * 2;
        var min = oldSegment.index + drawDistance;

        if (min > segments.length) {
            min = 0;
            max = min + drawDistance * 2;
        }
        if (max > segments.length) {
            max = segments.length - 1;
        }






        temp.z = Math.floor(Math.random() * (max - min)) + min;
        //temp.offset = Math.floor(Math.random() * (8 - (-8)) + (-8));
        newSegment = segments[temp.z];

        if (oldSegment != newSegment) {
            oldSegment.coins.splice(n, 1);
            newSegment.coins.push(temp);

        }


    }

};





GameManager.draws = {
    PlaceSprites: function(object, scale, destX, destY, offsetX, offsetY, clipY, widthSprite, heightSprite) {
        var destW = (widthSprite * scale * width / 2) * (SPRITES.SCALE * roadWidth);
        var destH = (heightSprite * scale * width / 2) * (SPRITES.SCALE * roadWidth);



        destX = destX + (destW * (offsetX || 0));
        destY = destY + (destH * (offsetY || 0));



        var clipH = clipY ? Math.max(0, destY + destH - clipY) : 0;
        if (clipH < destH) {
            object.x = destX;
            object.y = destY;
            object.width = destW;
            object.height = destH - clipH;
            /*if (object.height > 600) {
                object.visible = false;
            }*/
        } else {
            object.visible = false;
        }

    },
    Background: function(mc, rotation, offset) {
        rotation = rotation || 0;
        offset = offset || 0;


        var imageW = width / 2;
        var imageH = mc.height;

        var sourceX = mc.tilePosition.x + Math.floor(width * rotation);
        var sourceY = mc.y
        var sourceW = Math.min(imageW, mc.tilePosition.x + width - sourceX);
        var sourceH = imageH;

        var destX = mc.tilePosition.x;
        var destY = offset;
        var destW = Math.floor(width * (sourceW / imageW));
        var destH = height;



        if (sourceW < imageW) {
            //mc.tilePosition.x += destW - 1;
            mc.tilePosition.x = (rotation * offset * width) * 10;
            mc.y = destY;
            //mc.width = width - destW;
            //mc.height = destH;

        } else {
            mc.tilePosition.x = destX;
            mc.y = destY;
            //mc.width = destW;
            //mc.height = destH;
        }


    },
    BackGroundJose: function(mc, rotation, offset, speedmc, index) {
        offset = offset || 0
        var newIndex = index;
        if (newIndex != OldBackGroundIndex) {
            mc.tilePosition.x += rotation * speedmc * 200;
            mc.y = offset;
        }

    }

};
