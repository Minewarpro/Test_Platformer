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
            this.load.image('fire'+i, 'assets/fire/'+i+'.gif');
        };
    }
    getFrames(prefix,length){
        let frames=[];
        for (let i=0;i<=length;i++){
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
        this.spacePress=false;
        this.dashOp=false;



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

        this.fire = this.physics.add.sprite(200, 410, 'fire1').setOrigin(0,0);

        this.anims.create({
            key: 'fire',
            frames: this.getFrames('fire',15),
            frameRate: 16,
            repeat: -1,

        });
        this.fire.play('fire');
        this.fire.setScale(0.5)
        this.fire.body.setAllowGravity(false);
        this.fire.setImmovable(true);


        this.balle = this.physics.add.sprite(100,500, 'cercle');
        this.balle.setTintFill(0xFF0000);
        this.balle.setDisplaySize(50,50);

        this.physics.add.overlap(
            this.balle,
            this.fire,
            this.collectCollectible.bind(this)
        );


        this.physics.add.collider(this.balle, this.sol, function () {

        });

        this.initKeyboard();





    }

    collectCollectible(balle, collectible){
        collectible.disableBody(true, true);
        console.log('collectible',this);
        this.collectibleCollect=true;
    }

    dashDroite(){
        let me = this;
        console.log("dashTween")
        me.balle.body.setAllowGravity(false);
        this.tweens.add({
            targets: me.balle,

            x: me.balle.body.position.x + 300,
            ease: 'Circ.easeInOut',
            duration: 100,
            delay: 50,
            onComplete: function(){
                me.balle.body.setAllowGravity(true);
            }

        });
    }
    dashGauche(){
        let me = this;
        console.log("dashTween")
        me.balle.body.setAllowGravity(false);
        this.tweens.add({
            targets: me.balle,

            x: me.balle.body.position.x - 300,
            ease: 'Circ.easeInOut',
            duration: 300,
            delay: 50,
            onComplete: function(){
                me.balle.body.setAllowGravity(true);
            }
        });
    }
    dashHautGauche(){
        let me = this;
        console.log("dashTween")
        this.tweens.add({
            targets: me.balle,

            x: me.balle.body.position.x - 300,
            y: me.balle.body.position.y - 200,
            ease: 'Circ.easeInOut',
            duration: 500,
            delay: 50,
        });
    }
    dashHautDroite(){
        let me = this;
        console.log("dashTween")
        this.tweens.add({
            targets: me.balle,

            x: me.balle.body.position.x + 300,
            y: me.balle.body.position.y - 200,
            ease: 'Circ.easeInOut',
            duration: 500,
            delay: 50,
        });
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
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.spacePress=true;
                    if (me.sPressed===false) {
                        if (me.dejaAppuye) {
                            //fais rien
                        }
                        else {
                            me.dejaAppuye = true;//pour la prochaine fois
                            if (me.balle.body.onFloor()) {
                                me.balle.setVelocityY(-400);
                                me.doubleJump = 1;
                                me.balleSlow = 0;
                            }
                            if (me.doubleJump === 1 && !me.balle.body.onFloor()) {
                                me.balle.setVelocityY(-400);
                                me.doubleJump = 0;
                                me.balleSlow = 0;
                            }
                            }
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
                    if (me.dashOp===true){
                        if (me.dPress===true && me.spacePress){
                            me.dashHautDroite();
                            me.dashOp=false;
                        }
                        else if (me.qPress===true && me.spacePress){
                            me.dashHautGauche();
                            me.dashOp=false;
                        }
                        else if (me.dPress===true){
                            me.dashDroite();
                            me.dashOp=false;
                        }
                        else if (me.qPress===true){
                            me.dashGauche();
                            me.dashOp=false;
                        }
                    }

                    break;
            }
        });


        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    if (me.sPressed===false) {
                        if (me.balleSlow === 0 && me.balle.body.velocity.y <= 0) {
                            me.balle.setVelocityY(me.balle.body.velocity.y * 0.4);
                        }
                        me.dejaAppuye = false;
                        me.balleSlow = 1;
                        me.spacePress=false;
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
            this.dashOp=true;

        }
    }
}