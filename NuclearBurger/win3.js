class win3 extends Phaser.Scene {
    constructor (){
        super({ key: 'win3' });
    }
    
        preload(){
        this.load.image("win3","assets/win3.png")
        this.load.audio("explosion","assets/explosion.mp3")
        // this.load.audio("win1","assets/win1.mp3")
        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("win2");
        this.add.image(0,0,"win3").setOrigin(0,0)
        this.music = this.sound.add("explosion",{loop: false}).setVolume(1.5);
        this.music.play();

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // this.scene.stop("win1");
            this.scene.start("win4");
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

