class preloadScene extends Phaser.Scene {
    constructor (){
        super({ key: 'preloadScene' });
    }
    
        preload(){
        this.load.image("intro","assets/intro.png")
        this.load.audio("bgMusic","assets/bgMusic.mp3")
        }

    create () {
        console.log("preloadScene")

        this.add.image(0,0,"intro").setOrigin(0,0)
        this.music = this.sound.add("bgMusic",{loop: true}).setVolume(0.7);
this.music.play();
        
        // this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            // { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 150;
            playerPos.y = 276; // Changed from x to y, assuming it was a typo
            this.scene.start("level1", { playerPos: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

