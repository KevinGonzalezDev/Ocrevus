let gameRatio = window.innerWidth / window.innerHeight;
let game = new Phaser.Game(1024, 485, Phaser.AUTO, 'base');
game.state.add('Game', GameManager.Game);
game.state.add('Boot', GameManager.Boot);
game.state.add('Preloader', GameManager.Preloader);
game.state.start('Boot');
