
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#353535',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
    
    scene: [preloadScene, story1, story2, story3, story4, story5, story6, level1, level2, level3, level4, level5,lose,win1,win2,win3,win4]

};

let game = new Phaser.Game(config);