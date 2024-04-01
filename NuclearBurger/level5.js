
class level5 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level5' });
    }

    init(data){
        this.playerPos = data.playerPos
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("level5", "assets/arena.tmj");

        // Step 2 : Preload any images here
    this.load.image("pipoyaIMG", "assets/pipoya32x32.png");
    // this.load.image("cheesefallIMG", "assets/cheesefall.png");

    this.load.spritesheet("walk", "assets/walk_edit.png",{ frameWidth:50, frameHeight:50 });
    this.load.spritesheet("bunny", "assets/bunny.png",{ frameWidth:22, frameHeight:22 });
    this.load.spritesheet("meat", 'assets/meat.png',{ frameWidth:32, frameHeight:32 });
    this.load.audio("plop", "assets/plop.mp3")
    this.load.audio("hitSnd", "assets/hitSnd.mp3")
    this.load.audio("tpSnd", "assets/tpSnd.mp3")

    } // end of preload //

    create (){

    console.log("level5")

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

     //object & enemy animation
     this.anims.create({
      key:"meatAnim",
      frames:this.anims.generateFrameNumbers("meat",
      { start:0, end:1 }),
      frameRate:2,
      repeat:-1
      });
      this.anims.create({
        key:"bunnyAnimDown",
        frames:this.anims.generateFrameNumbers("bunny",
        { start:0, end:3 }),
        frameRate:4,
        repeat:-1
        });
    this.anims.create({
        key:"bunnyAnimLeft",
        frames:this.anims.generateFrameNumbers("bunny",
        { start:4, end:7 }),
        frameRate:4,
        repeat:-1
        });
    this.anims.create({
        key:"bunnyAnimRight",
        frames:this.anims.generateFrameNumbers("bunny",
        { start:8, end:11 }),
         frameRate:4,
         repeat:-1
        });
        this.anims.create({
        key:"bunnyAnimUp",
        frames:this.anims.generateFrameNumbers("bunny",
        { start:12, end:15 }),
        frameRate:4,
        repeat:-1
        });    
        
    //Step 3 - Create the map from main

    let map = this.make.tilemap({ key: "level5" });
    
      
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
    this.extras = map.createLayer("extras",tilesArray,0,0);
  
    // make the camera follow the player
    //load player
//    this.player = this.physics.add.sprite(this.playerPos.x , this.playerPos.y, "walk").setScale(2)
   this.player = this.physics.add.sprite(800 , 559, "walk").setScale(1)
   this.cameras.main.startFollow(this.player);
   window.player = this.player

    //set player hitbox    
    this.player.body.setSize(this.player.width * 0.25, this.player.height * 0.25).setOffset(17,40)
  
     //enemy
     let  enemy1 = map.findObject("enemyLayer",(obj) => obj.name === "1")
     let  enemy2 = map.findObject("enemyLayer",(obj) => obj.name === "2")
     let  enemy3 = map.findObject("enemyLayer",(obj) => obj.name === "3")
     let  enemy4 = map.findObject("enemyLayer",(obj) => obj.name === "4")
     let  enemy5 = map.findObject("enemyLayer",(obj) => obj.name === "5")

     this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, "bunny").play("bunnyAnimLeft").setScale(2)
     this.enemy2 = this.physics.add.sprite(enemy2.x, enemy2.y, "bunny").play("bunnyAnimDown").setScale(2)
     this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, "bunny").play("bunnyAnimDown").setScale(2)
     this.enemy4 = this.physics.add.sprite(enemy4.x, enemy4.y, "bunny").play("bunnyAnimRight").setScale(2)
     this.enemy5 = this.physics.add.sprite(enemy5.x, enemy5.y, "bunny").play("bunnyAnimUp").setScale(2)
     
     this.physics.add.overlap(this.player, this.enemy5, this.hitEnemy, null, this);
     this.physics.add.overlap(this.player, this.enemy4, this.hitEnemy, null, this);
     this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
     this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy, null, this);
     this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);
 
// in create, add tweens  
this.tweens.add({
  targets: this.enemy5,
  y: 669,
  flipY: false,
  yoyo: true,
  duration: 2000,
  repeat: -1,
  onYoyo: () => {
      console.log("onYoyo");
      this.enemy5.play("bunnyAnimUp");
  },
  onRepeat: () => {
      console.log("onRepeat");
      this.enemy5.play("bunnyAnimDown");
  }
});

this.tweens.add({
targets: this.enemy4,
x: 1420,
flipX: false,
yoyo: true,
duration: 2000,
repeat: -1,
onYoyo: () => {
    console.log("onYoyo");
    this.enemy4.play("bunnyAnimLeft");
},
onRepeat: () => {
    console.log("onRepeat");
    this.enemy4.play("bunnyAnimRight");
}
});

this.tweens.add({
targets: this.enemy3,
y: 424,
flipY: false,
yoyo: true,
duration: 1000,
repeat: -1,
onYoyo: () => {
    console.log("onYoyo");
    this.enemy3.play("bunnyAnimUp");
},
onRepeat: () => {
    console.log("onRepeat");
    this.enemy3.play("bunnyAnimDown");
}
});

this.tweens.add({
targets: this.enemy2,
y: 588,
flipY: false,
yoyo: true,
duration: 4000,
repeat: -1,
onYoyo: () => {
    console.log("onYoyo");
    this.enemy2.play("bunnyAnimUp");
},
onRepeat: () => {
    console.log("onRepeat");
    this.enemy2.play("bunnyAnimDown");
}
});

this.tweens.add({
targets: this.enemy1,
x: 605,
flipX: false,
yoyo: true,
duration: 3000,
repeat: -1,
onYoyo: () => {
    console.log("onYoyo");
    this.enemy1.play("bunnyAnimRight");
},
onRepeat: () => {
    console.log("onRepeat");
    this.enemy1.play("bunnyAnimLeft");
}
});

    //object(put under player)
   let  item1 = map.findObject("objectLayer",(obj) => obj.name === "1");
   this.item1 = this.physics.add.sprite(item1.x, item1.y, "meat").play("meatAnim");

   let  item2 = map.findObject("objectLayer",(obj) => obj.name === "2");
   this.item2 = this.physics.add.sprite(item2.x, item2.y, "meat").play("meatAnim");
       
   let  item3 = map.findObject("objectLayer",(obj) => obj.name === "3");
   this.item3 = this.physics.add.sprite(item3.x, item3.y, "meat").play("meatAnim");

   let  item4 = map.findObject("objectLayer",(obj) => obj.name === "4");
   this.item4 = this.physics.add.sprite(item4.x, item4.y, "meat").play("meatAnim");

   let  item5 = map.findObject("objectLayer",(obj) => obj.name === "5");
   this.item5 = this.physics.add.sprite(item5.x, item5.y, "meat").play("meatAnim");

   //sound
    this.hitSnd = this.sound.add("hitSnd").setVolume(1.5);
     this.plopSnd = this.sound.add("plop").setVolume(0.5);
     this.tpSnd = this.sound.add("tpSnd").setVolume(0.5);

     //overlap
     this.physics.add.overlap(this.player, this.item5, this.hitItem, null, this);
     this.physics.add.overlap(this.player, this.item4, this.hitItem, null, this);
     this.physics.add.overlap(this.player, this.item3, this.hitItem, null, this);
     this.physics.add.overlap(this.player, this.item2, this.hitItem, null, this);
     this.physics.add.overlap(this.player, this.item1, this.hitItem, null, this);
   
   //adding collision
   this.walls.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.walls)
   this.extras.setCollisionByExclusion(-1, true);
   this.physics.add.collider(this.player, this.extras)

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
        this.player.x > 737 &&
        this.player.x < 817 &&
        this.player.y > 449 &&
        this.player.y < 495
      ) {
        console.log("to forest");
        this.win1();
      }

} // end of update // 
}

  //disable enemy
  //same for this function, only need to be entered once
  hitEnemy(player, enemy1) {
    console.log("hitEnemy");
    this.hitSnd.play();
    this.cameras.main.shake(100); // 500ms
    //(player knockback) player.x = player.x - 50
    enemy1.disableBody(true, true);
    this.scene.start("lose")
    return false;
  }

//call this function when overlap
hitItem(player,item5) {
    console.log("hitItem")
    console.log("play plop")
    this.plopSnd.play()
    item5.disableBody(true,true)
   return false;
  }

// Function to jump to win1
win1(player, tile) {
    console.log("win1 function");
    // this.scene.stop("preloadScene")
    this.tpSnd.play()
    this.scene.start("win1");
}
}