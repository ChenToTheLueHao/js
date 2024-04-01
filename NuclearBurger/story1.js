class story1 extends Phaser.Scene {
    constructor (){
        super({ key: 'story1' });
    }
    
        preload(){
        this.load.image("story1","assets/story1.png")
        this.load.audio("click","assets/click.mp3")
        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("preloadScene");
        this.add.image(0,0,"story1").setOrigin(0,0)
        
        this.music = this.sound.add("click",{loop: false}).setVolume(0.8);this.music.play();

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // this.click.play()
            this.scene.stop("story1");
            this.scene.start("story2");
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

