class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 50;
    randomInterval = 0;
    timeChange = 0;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImage(this.IMAGES_DEAD[0]);
        this.loadImage(this.IMAGES_HURT[0]);
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.x = 2500;
    }

    initBoss() {
        this.currentImage = 0;
        this.currentAnimationInterval = this.setStopableInterval(() => {
            if (this.alive && this.currentImage < 9) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            else {
                this.defineEnemy();
                clearInterval(this.currentAnimationInterval);
            }
        }, 1000 / 7);
    }

    defineEnemy() {
        this.speed = this.setRandomSpeed();
        this.otherDirection = this.setRandomDirection();
        this.timeChange = this.setRandomChangeTime();
        this.currentImage = 0;
        this.setStopableInterval(() => {
            if (this.alive) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                }
                else if (this.x < 1000) {
                    this.restrictEndbossLeft();
                }
                else if (this.x > 3000) {
                    this.restrictEndbossRight();
                }
                else if (this.otherDirection) {
                    this.endbossRight();
                }
                else {
                    this.endbossLeft();
                }
                let now = new Date().getTime();
                if (now > this.timeChange) {
                    this.timeChange = this.setRandomChangeTime();
                    this.updateEnemy();
                }
            }
        }, 1000 / 60);
    };

    restrictEndbossLeft() {
        this.moveRight();
        this.otherDirection = true;
        this.playAnimation(this.IMAGES_WALK);
    }

    restrictEndbossRight() {
        this.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.IMAGES_WALK);
    }

    endbossLeft() {
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALK);
    }

    endbossRight() {
        this.moveRight();
        this.playAnimation(this.IMAGES_WALK);
    }

    updateEnemy() {
        this.speed = this.setRandomSpeed();
        this.otherDirection = this.setRandomDirection();
    };

    setRandomChangeTime() {
        let now = new Date().getTime();
        return now + 1000 + Math.round(Math.random() * 5000);
    };

    setRandomSpeed() {
        return 1 + Math.random() * 3;
    };

    setRandomDirection() {
        if (Math.random() >= 0.5) { return true } else { return false }
    };

    animate() {
        this.currentAnimationInterval = this.setStopableInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else if (this.alive) {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 1000 / 7);
    }

    kill() {
        if (world.gameSound.actionSound.sound == true) { world.gameSound.actionSound.fire.play(); }
        this.loadImage(this.IMAGES_DEAD[0]);
        this.alive = false;
        this.currentImage = 0;
        this.currentAnimationInterval = this.setStopableInterval(() => {
            if (this.currentImage < 3) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if (this.alpha > 0 && this.currentImage >= 3) {
                this.fadeOut();
            }
            else {
                this.removeEnemies();
                clearInterval(this.currentAnimationInterval);
                world.gameWon();
            }
        }, 1000 / 60);

    }

    fadeOut() {
        if (this.alpha > 0) {
            this.alpha -= 0.01;
        }
    }

    removeEnemies() {
        for (let i = 0; i < world.level.enemies.length; i++) {
            if (world.level.enemies[i].alive == false) {
                world.level.enemies.splice(i, 1);
            }
        }
    }
}