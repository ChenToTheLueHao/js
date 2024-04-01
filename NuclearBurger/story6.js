class story6 extends Phaser.Scene {
    constructor (){
        super({ key: 'story6' });
    }
    
        preload(){
        this.load.image("story6","assets/story6.png")
        this.load.audio("click","assets/click.mp3")
        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("preloadScene");
        this.add.image(0,0,"story6").setOrigin(0,0)
        
        this.music = this.sound.add("click",{loop: false}).setVolume(0.8);this.music.play();

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
            playerPos.x = 150;
            playerPos.y = 276;
            this.scene.stop("story6");
            this.scene.start("level1", { playerPos: playerPos });
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

