class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.4;
    energy = 100;
    hurt = false;
    lastHit = 0;
    alpha = 1.0;
    alive = true;
    lastFrame = 0;

    applyGravity() {
        this.setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let now = new Date().getTime();
        if (now - 100 > this.lastFrame) {
            this.lastFrame = new Date().getTime();
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 12;
        }
    }

    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y + 100, this.width, this.height - 100);
        ctx.stroke();
    }

    applyOtherDirection(ctx) {
        ctx.save();
        ctx.translate(this.width, 0);
        ctx.scale(-1, 1);
        this.x = this.x * -1;
    }

    restoreOtherDirection(ctx) {
        ctx.restore();
        this.x = this.x * -1;
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    isCollidingPepe(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y + 100 < mo.y + mo.height;
    }

    hit() {
        if (this.energy > 0) {
            this.energy -= 10;
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // Difference in seconds
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy <= 0;
    }
}