class story4 extends Phaser.Scene {
    constructor (){
        super({ key: 'story4' });
    }
    
        preload(){
        this.load.audio("click","assets/click.mp3")
        this.load.image("story4","assets/story4.png")
        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("story3");
        this.add.image(0,0,"story4").setOrigin(0,0)

        var spaceDown = this.input.keyboard.addKey('SPACE');
        this.music = this.sound.add("click",{loop: false}).setVolume(0.8);this.music.play();

        spaceDown.on('down', function(){
            // this.click.play()
            this.scene.stop("story4");
            this.scene.start("story5");
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

