class preloadScene extends Phaser.Scene {
    constructor (){
        super({ key: 'preloadScene' });
    }
    
        preload(){
        this.load.image("intro","assets/intro.png")
        this.load.audio("bgMusic","assets/bgMusic.mp3")
        this.load.audio("click","assets/click.mp3")
        
        }

    create () {
        console.log("preloadScene")

        this.add.image(0,0,"intro").setOrigin(0,0)
        this.music = this.sound.add("bgMusic",{loop: true}).setVolume(0.8);this.music.play();
        this.music = this.sound.add("click",{loop: false}).setVolume(0.8);this.music.play();
        
        // this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            // { font: '24px Courier', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // this.click.play()
            let playerPos = {};
            playerPos.x = 150;
            playerPos.y = 276; // Changed from x to y, assuming it was a typo
            this.scene.stop("preloadScene");
            this.scene.start("story1", { playerPos: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

