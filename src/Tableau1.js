/**
 * ALGO: ceci est une classe...
 */
class Tableau1 extends Phaser.Scene {

    /**
     * Précharge les assets
     */
    preload() {
        this.load.image('carre', 'assets/carre.png');
        this.load.image('cercle', 'assets/cercle.png');
        for (let i =0; i<16;i++){
            this.load.image('fire'+i, 'assets/fire/'+i+'.png');
        };
    }
    getFrames(prefix,length){
        let frames=[];
        for (let i=1;i<=length;i++){
            frames.push({key: prefix+i});
        }
        return frames;
    }

    create() {
        window.tableau=this;
        this.doubleJump=0;
        this.dejaAppuye=false;
        this.tuch=false;
        this.doubleJump=1;
        this.dPress=false;
        this.shiftPressed=true;
        this.collectibleCollect=false;



        this.sol = this.physics.add.sprite(-50,700, 'carre').setOrigin(0,0);
        this.sol.setTintFill(0xFFFFFF);
        this.sol.setDisplaySize(2000,100);
        this.sol.body.setAllowGravity(false);
        this.sol.setImmovable(true);

        this.collectible = this.physics.add.sprite(350,500, 'cercle');
        this.collectible.setTintFill(0xffffff);
        this.collectible.setDisplaySize(25,25);
        this.collectible.body.setAllowGravity(false);
        this.collectible.setImmovable(true);



        this.balle = this.physics.add.sprite(100,500, 'cercle');
        this.balle.setTintFill(0xFF0000);
        this.balle.setDisplaySize(50,50);

        this.physics.add.overlap(
            this.balle,
            this.collectible,
            this.collectCollectible.bind(this)
        );


        this.physics.add.collider(this.balle, this.sol, function () {

        });

        this.initKeyboard();



        this.fire = this.add.sprite(50, 110, 'fire1').setOrigin(0,0);
        //animation de 3 images
        this.anims.create({
            key: 'fire',
            frames: this.getFrames('fire',16),
            frameRate: 16,
            repeat: -1,

        });
        this.fire.play('fire');
        //this.fire.setScale(0.5)
    }

    collectCollectible(balle, collectible){
        collectible.disableBody(true, true);
        console.log('collectible',this);
        this.collectibleCollect=true;
    }

    dash(){
        let me = this;
        if (me.collectibleCollect===true){
        if (me.shiftPressed === false){
            me.balle.body.setAllowGravity(false);
            me.balle.setVelocityY(0);
            me.balle.setVelocityX(0);

            setTimeout( function () {
                me.physics.moveTo(me.balle, me.game.input.mousePointer.x,
                    me.game.input.mousePointer.y, 1000);
            }, 300)

            setTimeout( function () {
                me.balle.body.setAllowGravity(true);
                me.balle.setVelocityY(me.balle.body.velocity.y*0.3)
                me.balle.setVelocityX(me.balle.body.velocity.x*0.3)
            }, 600)

            me.shiftPressed=true;
            me.collectibleCollect=false;
        }
        }
    }

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.sPressed===false) {
                        if (me.dejaAppuye) {
                            //fais rien
                        } else {
                            me.dejaAppuye = true;//pour la prochaine fois
                            if (me.balle.body.onFloor()) {
                                me.balle.setVelocityY(-400);
                                me.doubleJump = 1;
                                me.balleSlow = 0;
                            }
                            if (me.doubleJump == 1 && !me.balle.body.onFloor()) {
                                me.balle.setVelocityY(-400);
                                me.doubleJump = 0;
                                me.balleSlow = 0;
                            }
                            }
                        }
                    if (me.balle.body.velocity.y>0){
                        me.balle.setVelocityY(5);
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    if (me.sPressed===false){
                        me.balle.setVelocityX(400);
                        me.dPress=true;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if (me.sPressed===false) {
                        me.balle.setVelocityX(-400);
                        me.qPress = true;
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.S:
                    if (!me.balle.body.onFloor()){
                        if (me.sPressed===false){
                            me.balle.setVelocityY(0);
                            me.balle.setVelocityX(0);
                            me.balle.body.setAllowGravity(false);
                            setTimeout( function () {
                                    me.balle.setVelocityY(1000);
                                    me.balle.body.setAllowGravity(true);
                                },
                                500)
                            me.sPressed=true;
                        }
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.dash();
                    break;


            }
        });


        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.sPressed===false) {
                        if (me.balleSlow === 0 && me.balle.body.velocity.y <= 0) {
                            me.balle.setVelocityY(me.balle.body.velocity.y * 0.4);
                        }
                        me.dejaAppuye = false;
                        me.balleSlow = 1;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    if (me.sPressed===false) {
                        if (!me.balle.body.onFloor()) {
                            me.balle.setVelocityX(me.balle.body.velocity.x * 0.6)
                        } else {
                            me.balle.setVelocityX(0);
                        }
                        me.dPress = false;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if (me.sPressed===false) {
                        if (!me.balle.body.onFloor()) {
                            me.balle.setVelocityX(me.balle.body.velocity.x * 0.6)
                        } else {
                            me.balle.setVelocityX(0);
                        }
                        me.qPress = false;
                    }
                    break;
            }
        });
    }


    update() {
        if(this.dPress===true || this.qPress===true){

            }
        else{
            if (this.balle.body.onFloor()){
                this.balle.setVelocityX(0);
            }
        }
        if (this.balle.body.onFloor()){
            this.sPressed=false;
            this.shiftPressed=false;
        }
    }
}