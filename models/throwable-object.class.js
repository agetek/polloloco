class ThrowableObject extends MovableObject {
    speedY = 12;
    speed = 8;
    height = 60;
    width = 50;
    bottleDirection = false;
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        if (world.character.otherDirection) {
            this.x = x - 2.5 * this.width;
        } else {
            this.x = x - this.width / 2;
        }
        this.y = y;
        this.bottleDirection = world.character.otherDirection;
        this.throw();
    }

    throw() {
        if (world.gameSound.actionSound.sound == true) { world.gameSound.actionSound.bottle_throw.play(); }
        this.setStopableInterval(() => {
            if (this.energy > 0) {
                if (this.bottleDirection) {
                    this.x -= this.speed;
                } else {
                    this.x += this.speed;
                }
                this.applyGravityThrow();
            }
        }, 1000 / 60);
        this.setStopableInterval(() => {
            if (this.energy > 0) {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
                
            }
        }, 1000 / 15);
    }

    splash() {
        if (world.gameSound.actionSound.sound == true) { world.gameSound.actionSound.bottle_hit.play(); }
        this.currentImage = 0;
        this.setStopableInterval(() => {
            if (this.currentImage < 6) {
            this.energy = 0;
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            }
            else {
                this.alpha = 0;
            }
        }, 1000 / 60);
    }


    applyGravityThrow() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }
}