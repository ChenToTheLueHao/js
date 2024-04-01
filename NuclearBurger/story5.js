class story5 extends Phaser.Scene {
    constructor (){
        super({ key: 'story5' });
    }
    
        preload(){
        this.load.image("story5","assets/story5.png")
        this.load.audio("click","assets/click.mp3")

        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("preloadScene");
        this.add.image(0,0,"story5").setOrigin(0,0)

        this.music = this.sound.add("click",{loop: false}).setVolume(0.8);this.music.play();

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // let playerPos = {};
            // playerPos.x = 150;
            // playerPos.y = 276;
            // this.click.play()
            this.scene.stop("story5");
            this.scene.start("story6");
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

