
class level1 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level1' });
    }

    init(data){
        this.playerPos = data.playerPos
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("home", "assets/home.tmj");

        // Step 2 : Preload any images here
    // this.load.image("street", "assets/Street32x32.png");
    // this.load.image("buildings", "assets/Buildings32x32.png");
    this.load.image("pipoyaIMG", "assets/pipoya32x32.png");
    
    this.load.spritesheet("walk", "assets/walk_edit.png",{ frameWidth:50, frameHeight:50 });

    //load sound
    this.load.audio("door", "assets/door.mp3")

    } // end of preload //

    create (){
        
        //loading bunnies

    console.log("animationScene")

    this.anims.create({
        key:'gen-up',
        frames:this.anims.generateFrameNumbers('walk',
        { start:24, end:31 }),
        frameRate:7,
        repeat:-1
    });

    this.anims.create({
        key:'gen-left',
        frames:this.anims.generateFrameNumbers('walk',
        { start:8, end:15 }),
        frameRate:7,
        repeat:-1
    });

    this.anims.create({
        key:'gen-down',
        frames:this.anims.generateFrameNumbers('walk',
        { start:16, end:23 }),
        frameRate:7,
        repeat:-1
    });

    this.anims.create({
        key:'gen-right',
        frames:this.anims.generateFrameNumbers('walk',
        { start:0, end:7 }),
        frameRate:7,
        repeat:-1
    });

    //Step 3 - Create the map from main
     
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
        this.scene.start("level2");
        }, this );
    
    key3Down.on('down', function(){
        console.log("key 3 pressed");
        this.scene.start("level3");
        }, this );

    key4Down.on('down', function(){
        console.log("key 4 pressed");
        this.scene.start("level4");
        }, this );
        
    key5Down.on('down', function(){
        console.log("key 5 pressed");
        this.scene.start("level5");
        }, this );
    let map = this.make.tilemap({ key: "home" });
  
       
    var key1Down = this.input.keyboard.addKey(49);
    var key2Down = this.input.keyboard.addKey(50);
    var key3Down = this.input.keyboard.addKey(51);
    var key4Down = this.input.keyboard.addKey(52);

  key1Down.on('down', function(){
    console.log("key 1 pressed");
    this.scene.start("level1");
    }, this );
    
    key2Down.on('down', function(){
        console.log("key 2 pressed");
        this.scene.start("level2");
        }, this );
    
    key3Down.on('down', function(){
        console.log("key 3 pressed");
        this.scene.start("level3");
        }, this );

        key4Down.on('down', function(){
            console.log("key 4 pressed");
            this.scene.start("level4");
            }, this );
        
    // Step 4 Load the game tiles

    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya32x32", "pipoyaIMG")

    //Step 5  create an array of tiles
    let tilesArray = [
        pipoyaTiles
        ];

    // Step 6  Load in layers by layers
    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.walls = map.createLayer("walls",tilesArray,0,0);
    this.windows1 = map.createLayer("windows1",tilesArray,0,0);
    this.funitures = map.createLayer("funitures",tilesArray,0,0);
    this.funitures2 = map.createLayer("funitures2",tilesArray,0,0);

    console.log("loaded layer")
    
    // make the camera follow the player
    // load player
        this.player = this.physics.add.sprite(this.playerPos.x , this.playerPos.y , "walk").setScale(1)
        this.cameras.main.startFollow(this.player);
        window.player = this.player

    //set player hitbox    
        this.player.body.setSize(this.player.width * 0.25, this.player.height * 0.25).setOffset(17,40)

    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    //adding collision
       this.walls.setCollisionByExclusion(-1, true);
       this.physics.add.collider(this.player, this.walls)

       this.funitures.setCollisionByExclusion(-1, true);
       this.physics.add.collider(this.player, this.funitures)

       this.funitures2.setCollisionByExclusion(-1, true);
       this.physics.add.collider(this.player, this.funitures2)

    //sound
    this.doorSnd = this.sound.add("door").setVolume(0.5);

    } // end of create //

    update () {

        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-200);
            this.player.anims.play("gen-left", true); // walk left
            } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(200);
            this.player.anims.play("gen-right", true);
            } else if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-200);
            this.player.anims.play("gen-up", true);
            //console.log('up');
            } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(200);
            this.player.anims.play("gen-down", true);
            //console.log('down');
            } else {
            this.player.anims.stop();
            this.player.body.setVelocity(0, 0);


            //go to forest(level2)
            if (
                this.player.x > 103 &&
                this.player.x < 184 &&
                this.player.y > 600
              ) {
                console.log("to forest");
                this.level2();
              }

    } // end of update // 
}
// Function to jump to level2
level2(player, tile) {
    console.log("level2 function");
    let playerPos = {}
    playerPos.x = 290
    playerPos.y = 306
    console.log("play doorSnd")
    this.doorSnd.play()
    this.scene.start("level2",{playerPos:playerPos});
  }
}