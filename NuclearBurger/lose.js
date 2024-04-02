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

        //skip to levels
        var key1Down = this.input.keyboard.addKey(49);
        var key2Down = this.input.keyboard.addKey(50);
        var key3Down = this.input.keyboard.addKey(51);
        var key4Down = this.input.keyboard.addKey(52);
        var key5Down = this.input.keyboard.addKey(53);
    
      key1Down.on('down', function(){
        console.log("key 1 pressed");
        this.scene.start("level1");
        }, this );
        
        key2Down.on('down', function(){
            console.log("key 2 pressed");
            let playerPos = {}
            playerPos.x = 290
            playerPos.y = 306
            this.scene.start("level2",{playerPos:playerPos});
            }, this );
        
        key3Down.on('down', function(){
            console.log("key 3 pressed");
            let playerPos = {}
            playerPos.x = 80
            playerPos.y = 1523
            this.scene.start("level3",{playerPos:playerPos});
            }, this );
    
        key4Down.on('down', function(){
            console.log("key 4 pressed");
            let playerPos = {}
            playerPos.x = 398
            playerPos.y = 1444
            this.scene.start("level4",{playerPos:playerPos});
            }, this );
            
        key5Down.on('down', function(){
            console.log("key 5 pressed");
            playerPos.x = 800
            playerPos.y = 599
            this.tpSnd.play()
            this.scene.start("level5",{playerPos:playerPos});
            }, this );
    

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

