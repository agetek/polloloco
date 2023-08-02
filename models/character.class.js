class Character extends MovableObject {
    height = 280;
    y = 180;
    speed = 20;
    idleTimestamp = new Date().getTime();

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    // walking_sound = new Audio('audio/footsteps.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.animate();
        this.applyGravity();
    }

    animate() {
        this.currentAnimationInterval = this.setStopableInterval(() => {
            this.ifPartOne();
            this.ifPartTwo();
            this.ifPartThree();
        }, 1000 / 15);
    }

    ifPartOne() {
        if (this.world.gameSound.actionSound.sound == true) { this.world.gameSound.actionSound.footsteps.pause(); }
            if (this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.SPACE || this.world.keyboard.D) {
                this.idleTimestamp = new Date().getTime();
            }

            if ((new Date().getTime() - this.idleTimestamp) > 200) {
                this.shortIdle();
            }
            if ((new Date().getTime() - this.idleTimestamp) > 20000) {
                this.longIdle();
            }
    }

    ifPartTwo() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.world.camera_x -= this.speed;
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.world.camera_x += this.speed;
            this.otherDirection = true;
        }
        if (this.world.keyboard.UP || this.world.keyboard.SPACE) {
            this.jump();
            if (this.world.gameSound.actionSound.sound == true && this.y >= 180) { this.world.gameSound.actionSound.jump_pepe.play(); }
        }
    }

    ifPartThree() {
        if (this.isDead()) {
            this.kill();
        }
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.world.gameSound.actionSound.sound == true) { this.world.gameSound.actionSound.footsteps.play(); }
        }
        if (this.isHurt() && this.alive) {
            if (this.world.gameSound.actionSound.sound == true) { this.world.gameSound.actionSound.hurt_pepe.play(); }
            this.playAnimation(this.IMAGES_HURT);
        }
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    shortIdle() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    longIdle() {
        if (this.world.gameSound.actionSound.sound == true) { this.world.gameSound.actionSound.snore.play(); }
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }

    kill() {
        clearInterval(this.currentAnimationInterval);
        this.alive = false;
        this.currentImage = 0;
        this.setStopableInterval(() => {
            if (this.currentImage < 6) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if (this.currentImage >= 6 && this.alpha > 0) {
                this.fadeOut();
            }
            else {
                world.gameLost();
            }
        }, 1000 / 60);
    }

    fadeOut() {
        if (this.alpha > 0) {
            this.alpha -= 0.01;
        }
    }
}