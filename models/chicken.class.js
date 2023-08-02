class Chicken extends MovableObject {
    y = 360;
    width = 60;
    height = 80;
    timeChange = 0;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    IMAGE_START = 'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png';

    constructor() {
        super().loadImage(this.IMAGE_START);
        this.loadImages(this.IMAGES_WALKING);
        this.defineEnemy();
    }

    defineEnemy() {
        this.speed = this.setRandomSpeed();
        this.x = this.setRandomStartPosition();
        this.otherDirection = this.setRandomDirection();
        this.timeChange = this.setRandomChangeTime();
        this.setStopableInterval(() => {
            if (this.alive) {
                this.chickenAlive();
            }
        }, 1000 / 60);
        this.setStopableInterval(() => {
            if (this.alive) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    };

    chickenAlive() {
        if (this.x < 0) {
            this.moveRight();
            this.otherDirection = true;
        }

        if (this.x > 2000) {
            this.moveLeft();
            this.otherDirection = false;
        }

        if (this.otherDirection) {
            this.moveRight();
        }
        else {
            this.moveLeft();
        }
        let now = new Date().getTime();
        if (now > this.timeChange) {
            this.timeChange = this.setRandomChangeTime();
            this.updateEnemy();
        }
    }

    updateEnemy() {
        this.speed = this.setRandomSpeed();
        this.otherDirection = this.setRandomDirection();
    };

    setRandomChangeTime() {
        let now = new Date().getTime();
        return now + 3000 + Math.round(Math.random() * 3000);
    };

    setRandomSpeed() {
        return 0.15 + Math.random() * 0.75;
    };

    setRandomDirection() {
        if (Math.random() >= 0.5) { return true } else { return false }
    };

    setRandomStartPosition() {
        return Math.round(400 + Math.random() * 200);
    };

    kill() {
        if (world.gameSound.actionSound.sound == true) { world.gameSound.actionSound.chicken_die.play(); }
        this.loadImage(this.IMAGE_DEAD);
        this.alive = false;
        let check = true;
        setInterval(() => {
            if (this.alpha > 0) {
                this.fadeOut();
            }
            else {
                if (check) {
                    this.removeEnemies();
                    check = false;
                }
            }
        }, 20);
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