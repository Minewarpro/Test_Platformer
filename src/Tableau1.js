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
    }


    create() {

        this.doubleJump=0;
        this.dejaAppuye=false;
        this.tuch=false;
        this.doubleJump=1;
        this.dPress=false;



        this.sol = this.physics.add.sprite(-50,700, 'carre').setOrigin(0,0);
        this.sol.setTintFill(0xFFFFFF);
        this.sol.setDisplaySize(2000,100);
        this.sol.body.setAllowGravity(false);
        this.sol.setImmovable(true);


        this.balle = this.physics.add.sprite(100,500, 'cercle');
        this.balle.setTintFill(0xFF0000);
        this.balle.setDisplaySize(50,50);




        this.physics.add.collider(this.balle, this.sol, function () {

        });

        this.initKeyboard();


    }


    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.sPressed==false) {
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
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    if (me.sPressed==false){
                        me.balle.setVelocityX(400);
                        me.dPress=true;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if (me.sPressed==false) {
                        me.balle.setVelocityX(-400);
                        me.qPress = true;
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.S:
                    if (!me.balle.body.onFloor()){
                        if (me.sPressed==false){
                            me.balle.setVelocityY(0);
                            me.balle.setVelocityX(0);
                            me.balle.body.setAllowGravity(false);
                            setTimeout( function () {
                                    me.balle.setVelocityY(600);
                                    me.balle.body.setAllowGravity(true);
                                },
                                500)
                            me.sPressed=true;
                            break;
                        }
                    }
                case Phaser.Input.Keyboard.KeyCodes.E:
                    me.balle.body.setAllowGravity(false);
                    me.balle.setVelocityY(0);
                    me.balle.setVelocityX(0);
                    setTimeout( function () {
                            me.physics.moveTo(me.balle, me.game.input.mousePointer.x,
                                me.game.input.mousePointer.y, 500);
                            me.balle.body.setAllowGravity(true);
                        },
                        500)
                    break;
            }

        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.sPressed==false) {
                        if (me.balleSlow == 0 && me.balle.body.velocity.y <= 0) {
                            me.balle.setVelocityY(me.balle.body.velocity.y * 0.4);
                        }
                        me.dejaAppuye = false;
                        me.balleSlow = 1;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    if (me.sPressed==false) {
                        if (!me.balle.body.onFloor()) {
                            me.balle.setVelocityX(me.balle.body.velocity.x * 0.6)
                        } else {
                            me.balle.setVelocityX(0);
                        }
                        me.dPress = false;
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    if (me.sPressed==false) {
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
        if(this.dPress==true || this.qPress==true){

            }
        else{
            if (this.balle.body.onFloor()){
                this.balle.setVelocityX(0);
            }
        }
        if (this.balle.body.onFloor()){
            this.sPressed=false;
        }
    }
}