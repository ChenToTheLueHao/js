class win1 extends Phaser.Scene {
    constructor (){
        super({ key: 'win1' });
    }
    
        preload(){
        this.load.image("win1","assets/win1.png")
        this.load.audio("win1","assets/win1.mp3")
        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("preloadScene");
        this.add.image(0,0,"win1").setOrigin(0,0)
        this.music = this.sound.add("win1",{loop: false}).setVolume(1.5);
this.music.play();

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // this.scene.stop("win1");
            this.scene.start("win2");
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

