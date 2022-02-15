let gameConfig = {
    type: Phaser.AUTO,
    width: 1500,
    height: 800,
    backgroundColor: '#000000',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500},
            debug : false
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);
