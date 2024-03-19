class preloadScene extends Phaser.Scene {
    constructor (){
        super({ key: 'preloadScene' });
    }
    
    create () {
        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 150;
            playerPos.y = 276; // Changed from x to y, assuming it was a typo
            this.scene.start("level1", { playerPos: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

