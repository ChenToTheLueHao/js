class lose extends Phaser.Scene {
    constructor (){
        super({ key: 'lose' });
    }
    
        preload(){
        this.load.image("lose","assets/lose.png")
        this.load.audio("loseSnd","assets/lose.mp3")
        }

    create () {
        console.log("lose create loaded")

        this.add.image(0,0,"lose").setOrigin(0,0)
        this.music = this.sound.add("loseSnd",{loop: false}).setVolume(0.4);
this.music.play();

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 150;
            playerPos.y = 276; 
            this.scene.stop("lose");
            this.scene.start("level1",{ playerPos: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

