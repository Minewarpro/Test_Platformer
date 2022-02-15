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
        this.power = 0;
        this.power2 = 500;
        this.doubleJump=0;
        this.dejaAppuye=false;



        this.sol = this.physics.add.sprite(-50,700, 'carre').setOrigin(0,0);
        this.sol.setTintFill(0xFFFFFF);
        this.sol.setDisplaySize(2000,100);
        this.sol.body.setAllowGravity(false);
        this.sol.setImmovable(true);


        this.balle = this.physics.add.sprite(100,500, 'cercle');
        this.balle.setTintFill(0xFF0000);
        this.balle.setDisplaySize(50,50);
        this.balle.body.debugShowBody = true;
        this.balle.body.debugBodyColor = 0xff00ff;
        this.balle.setVelocityX(100);
        this.balle.body.useDampingX=true;
        this.balle.body.useDampingX=0.1;


        this.physics.add.collider(this.balle, this.sol, function () {
            this.doubleJump=1;
        });

        this.initKeyboard();
    }

    jump(){
        console.log(this.balle.velocityY);
        this.balle.setVelocityY(-200*this.power2);
        this.timer2 = this.time.addEvent({delay: 100, callback: this.setPower, callbackScope: this, loop:true});


    }

    stopJump(){
        this.timer2.remove();
        this.balle.setVelocityY(0);
        this.power2 = 5;
    }
    
    setPower(){
        this.power2*=.8;
        console.log(this.power2);
    }

    /**
    startJump(){
        this.timer = this.time.addEvent({delay : 100, callback: this.tick, callbackScope: this, loop: true});
    }
    endJump(){
        this.timer.remove();
        this.balle.setVelocityY(-this.power*100);
        this.power=0;
        console.log(this.power);
    }
    tick(){
        if (this.power<3){
            this.power+=.2;
            console.log(this.power);
        }

    }
     **/

    initKeyboard() {
        let me = this;
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:

                    if(me.dejaAppuye){
                        //fais rien
                    }else{
                        me.dejaAppuye=true;//pour la prochaine fois
                        if (me.balle.body.onFloor()){
                            me.balle.setVelocityY(-500);
                            me.doubleJump=1;
                            me.balleAir=1;
                        }
                        if (me.doubleJump==1 && !me.balle.body.onFloor()){
                            me.balle.setVelocityY(-500);
                            me.doubleJump=0;
                            me.balleAir=1;
                        }
                    }
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.balle.setVelocityX(200);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.balle.setVelocityX(-200);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.balle.setVelocityY(600);
                    break;

            }

        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    if (me.balleAir==1){
                        if (me.balle.body.velocity.y<=0){
                            me.balle.setVelocityY(me.balle.body.velocity.y*0.6);
                        }
                    }
                    me.dejaAppuye=false;
                    me.balleAir = 0;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                        me.balle.setVelocityX(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                        me.balle.setVelocityX(0);
                    break;
            }
        });
    }


    update() {
        }
}