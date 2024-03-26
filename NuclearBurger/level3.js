
class level3 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level3' });
    }

    init(data){
        this.playerPos = data.playerPos
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("level3", "assets/volcano.tmj");

        // Step 2 : Preload any images here
      this.load.image("pipoyaIMG", "assets/pipoya32x32.png");
      this.load.image("cheesefallIMG", "assets/cheesefall.png");

      this.load.spritesheet("walk", "assets/walk_edit.png",{ frameWidth:50, frameHeight:50 });
      this.load.spritesheet("cheese", 'assets/cheese.png',{ frameWidth:32, frameHeight:32 });
      this.load.audio("plop", "assets/plop.mp3")

    } // end of preload //

    create (){

    console.log("level3")

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

    let map = this.make.tilemap({ key: "level3" });
    
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
    let cheesefallTiles = map.addTilesetImage("cheesefall", "cheesefallIMG")
  
    //Step 5  create an array of tiles
    let tilesArray = [
        pipoyaTiles,
        cheesefallTiles
        ];

    // Step 6  Load in layers by layers
    this.lava = map.createLayer("lava",tilesArray,0,0);
    this.ground2 = map.createLayer("ground2",tilesArray,0,0);
    this.ground1 = map.createLayer("ground1",tilesArray,0,0);
    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.cliff = map.createLayer("cliff",tilesArray,0,0);
    this.trees = map.createLayer("trees",tilesArray,0,0);
  
   // make the camera follow the player
   this.player = this.physics.add.sprite(this.playerPos.x , this.playerPos.y, "walk").setScale(1)
   this.cameras.main.startFollow(this.player);
   window.player = this.player

    //set player hitbox    
    this.player.body.setSize(this.player.width * 0.25, this.player.height * 0.25).setOffset(17,40)

    //object(put under player)
    let  item1 = map.findObject("objectLayer",(obj) => obj.name === "1");
    this.item1 = this.physics.add.sprite(item1.x, item1.y, "cheese");
 
    let  item2 = map.findObject("objectLayer",(obj) => obj.name === "2");
    this.item2 = this.physics.add.sprite(item2.x, item2.y, "cheese");
        
    let  item3 = map.findObject("objectLayer",(obj) => obj.name === "3");
    this.item3 = this.physics.add.sprite(item3.x, item3.y, "cheese");
 
    let  item4 = map.findObject("objectLayer",(obj) => obj.name === "4");
    this.item4 = this.physics.add.sprite(item4.x, item4.y, "cheese");
 
    let  item5 = map.findObject("objectLayer",(obj) => obj.name === "5");
    this.item5 = this.physics.add.sprite(item5.x, item5.y, "cheese");
 
    //sound
    this.plopSnd = this.sound.add("plop").setVolume(0.5);

  //overlap
  this.physics.add.overlap(this.player, this.item5, this.hitItem, null, this);
  this.physics.add.overlap(this.player, this.item4, this.hitItem, null, this);
  this.physics.add.overlap(this.player, this.item3, this.hitItem, null, this);
  this.physics.add.overlap(this.player, this.item2, this.hitItem, null, this);
  this.physics.add.overlap(this.player, this.item1, this.hitItem, null, this);

   //adding collision
   this.trees.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.trees)
   this.lava.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.lava)
   this.cliff.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.cliff)

  this.cursors = this.input.keyboard.createCursorKeys();
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
            this.player.x < 40 &&
            this.player.y > 1496 &&
            this.player.y < 1576
          ) {
            console.log("to forest");
            this.level2();
          }

        //go to forest(level4)
        if (
            this.player.x < 1015 &&
            this.player.x > 980 &&
            this.player.y < 400
            ) {
            console.log("to haven");
            this.level4();
            }

} // end of update // 
}
//call this function when overlap
hitItem(player,item5) {
  console.log("hitItem")
  console.log("play plop")
  this.plopSnd.play()
  item5.disableBody(true,true)
 return false;
}
hitItem(player,item4) {
  console.log("hitItem")
  console.log("play plop")
  this.plopSnd.play()
  item3.disableBody(true,true)
 return false;
}
hitItem(player,item3) {
  console.log("hitItem")
  console.log("play plop")
  this.plopSnd.play()
  item3.disableBody(true,true)
 return false;
}
hitItem(player,item2) {
  console.log("hitItem")
  console.log("play plop")
  this.plopSnd.play()
  item2.disableBody(true,true)
 return false;
}
hitItem(player,item1) {
  console.log("hitItem")
  console.log("play plop")
  this.plopSnd.play()
  item1.disableBody(true,true)
 return false;
}

// Function to jump to level2
level2(player, tile) {
    console.log("level2 function");
    let playerPos = {}
    playerPos.x = 2490
    playerPos.y = 223
    this.scene.start("level2",{playerPos:playerPos});
  }
  // Function to jump to level4
level4(player, tile) {
    console.log("level4 function");
    let playerPos = {}
    playerPos.x = 398
    playerPos.y = 1444
    this.scene.start("level4",{playerPos:playerPos});
  }
}