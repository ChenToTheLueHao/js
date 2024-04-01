class story3 extends Phaser.Scene {
    constructor (){
        super({ key: 'story3' });
    }
    
        preload(){
        this.load.image("story3","assets/story3.png")
        this.load.audio("click","assets/click.mp3")

        }

    create () {
        console.log("lose create loaded")
        this.scene.stop("story2");
        this.add.image(0,0,"story3").setOrigin(0,0)
        this.music = this.sound.add("click",{loop: false}).setVolume(0.8);this.music.play();


        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            // this.click.play()
            this.scene.stop("story3");
            this.scene.start("story4");
        }, this); // Passing 'this' as the context to refer to the scene
         
        }
        
    }

