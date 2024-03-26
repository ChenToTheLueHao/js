
class level2 extends Phaser.Scene {
    constructor ()
    {
        super({ key: "level2" });
    }

    init(data){
        this.playerPos = data.playerPos
    }

    preload() {

        // Step 1, load JSON
        this.load.tilemapTiledJSON("level2", "assets/longForest.tmj");

    // Step 2 : Preload any images here
    // this.load.image("street", "assets/Street32x32.png");
    // this.load.image("buildings", "assets/Buildings32x32.png");
    
    this.load.image("pipoyaIMG", "assets/pipoya32x32.png");
    // this.load.image("pipoyaIMG2", "assets/pipoya16x16.png");

    this.load.spritesheet("walk", "assets/walk_edit.png",{ frameWidth:50, frameHeight:50 });
    this.load.spritesheet("bunny", "assets/bunny.png",{ frameWidth:22, frameHeight:22 });
    this.load.spritesheet("bun", "assets/bun.png",{ frameWidth:32, frameHeight:32 });
    this.load.audio("door", "assets/door.mp3")
    this.load.audio("plop", "assets/plop.mp3")
    this.load.audio("hitSnd", "assets/hitSnd.mp3")
    
    //this.load.spritesheet("gen", "assets/gen.png",{ frameWidth:64, frameHeight:64 });

    } // end of preload //////////////////////////////////////////////////////

    create (){

    console.log("level2")

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
        key:"bunAnim",
        frames:this.anims.generateFrameNumbers("bun",
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
        { start:16, end:19 }),
        frameRate:4,
        repeat:-1
        });

        // in create, add tweens  
        this.tweens.add({
            targets: this.enemy1,
            x: 10,
            //flipX: true,
            yoyo: true,
            duration: 1000,
            repeat: -1
            })

    //Step 3 - Create the map from main
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
        
        
    let map = this.make.tilemap({ key: "level2" });
    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let pipoyaTiles = map.addTilesetImage("pipoya32x32", "pipoyaIMG")

    //Step 5  create an array of tiles
    let tilesArray = [
        pipoyaTiles,
        ];

    // Step 6  Load in layers by layers
    this.ground = map.createLayer("ground",tilesArray,0,0);
    this.walls = map.createLayer("grass",tilesArray,0,0);
    this.trees = map.createLayer("trees",tilesArray,0,0);
    this.house = map.createLayer("house",tilesArray,0,0);
    this.house2 = map.createLayer("house2",tilesArray,0,0);

    console.log("animationScene")
   
    // load player
        this.player = this.physics.add.sprite(this.playerPos.x , this.playerPos.y, "walk").setScale(1)
        this.cameras.main.startFollow(this.player);
        window.player = this.player

    //set player hitbox    
    this.player.body.setSize(this.player.width * 0.25, this.player.height * 0.25).setOffset(17,40)

    //object
    let  item1 = map.findObject("objectLayer",(obj) => obj.name === "1");
    this.item1 = this.physics.add.sprite(item1.x, item1.y, "bun").play("bunAnim");
    let  item2 = map.findObject("objectLayer",(obj) => obj.name === "2");
    this.item2 = this.physics.add.sprite(item2.x, item2.y, "bun").play("bunAnim");
    let  item3 = map.findObject("objectLayer",(obj) => obj.name === "3");
    this.item3 = this.physics.add.sprite(item3.x, item3.y, "bun").play("bunAnim");
    let  item4 = map.findObject("objectLayer",(obj) => obj.name === "4");
    this.item4 = this.physics.add.sprite(item4.x, item4.y, "bun").play("bunAnim");
    let  item5 = map.findObject("objectLayer",(obj) => obj.name === "5");
    this.item5 = this.physics.add.sprite(item5.x, item5.y, "bun").play("bunAnim");

        //enemy
        let  enemy1 = map.findObject("enemyLayer",(obj) => obj.name === "1")
        let  enemy2 = map.findObject("enemyLayer",(obj) => obj.name === "2")
        let  enemy3 = map.findObject("enemyLayer",(obj) => obj.name === "3")
        let  enemy4 = map.findObject("enemyLayer",(obj) => obj.name === "4")
        let  enemy5 = map.findObject("enemyLayer",(obj) => obj.name === "5")

        this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, "bunny").play("bunnyAnimDown").setScale(2)
        this.enemy2 = this.physics.add.sprite(enemy2.x, enemy2.y, "bunny").play("bunnyAnimDown").setScale(2)
        this.enemy3 = this.physics.add.sprite(enemy3.x, enemy3.y, "bunny").play("bunnyAnimDown").setScale(2)
        this.enemy4 = this.physics.add.sprite(enemy4.x, enemy4.y, "bunny").play("bunnyAnimDown").setScale(2)
        this.enemy5 = this.physics.add.sprite(enemy5.x, enemy5.y, "bunny").play("bunnyAnimDown").setScale(2)


    // this.bun = this.physics.add.sprite(item5.x, item5.y, "bun").play("bunAnim");

    //enemy
    // this.add.sprite(817, 502, "bunny").play("bunnyAnimDown").setScale(2)

    //overlap
    // this.physics.add.overlap(
    //     this.player, this.item5, this.item4, this.item3, this.item2,this.item1, this.hitItem,
    //     null, this);

    this.physics.add.overlap(this.player, this.item5, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.item4, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.item3, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.item2, this.hitItem, null, this);
    this.physics.add.overlap(this.player, this.item1, this.hitItem, null, this);

    this.physics.add.overlap(this.player, this.enemy5, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy4, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy3, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy2, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemy1, this.hitEnemy, null, this);
    
    // this.enemy1 = this.physics.add.sprite(enemy1.x, enemy1.y, "bunny").play("bunnyAnimLeft")

    //create cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    //adding collision
    this.trees.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.trees)
    this.house.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.house)

    //sound
    this.doorSnd = this.sound.add("door").setVolume(0.5);
    this.plopSnd = this.sound.add("plop").setVolume(0.5);
    this.hitSnd = this.sound.add("hitSnd").setVolume(1.5);

    } // end of create /////////////////////////////////////////////////////

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
           
            //go to home
            if (
                this.player.x > 246 &&
                this.player.x < 326 &&
                this.player.y < 296 
              ) {
                console.log("to home");
                this.level1();
              }

              //go to volcano
              if (
                this.player.x > 2500 &&
                this.player.y > 149 &&
                this.player.y < 288 
              ) {
                console.log("to volcano");
                this.level3();
              }
    } 
}// end of update //////////////////////////////////////////////////////////

//call this function when overlap
//note: this function just needs to be entered once, no need to repeat the same thing for item1, item2, etc
hitItem(player,item) {
    console.log("hitItem")
    console.log("play plop")
    this.plopSnd.play()
    item.disableBody(true,true)
   return false;
  }

  //disable enemy
  //same for this function, only need to be entered once
  hitEnemy(player, enemy1) {
    console.log("hitEnemy");
    this.hitSnd.play();
    this.cameras.main.shake(100); // 500ms
    //(player knockback) player.x = player.x - 50
    enemy1.disableBody(true, true);
    return false;
  }

//jump to level1
level1(player, tile) {
    console.log("level1 function");
    let playerPos = {}
    playerPos.x = 150
    playerPos.y = 586
    this.doorSnd.play()
    this.scene.start("level1",{playerPos:playerPos});
}
//jump to level3
level3(player, tile) {
    console.log("level3 function");
    let playerPos = {}
    playerPos.x = 80
    playerPos.y = 1523
    this.scene.start("level3",{playerPos:playerPos});
}
}