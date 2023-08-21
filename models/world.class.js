class World {
    character = new Character();
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    bossBar = new BossBar();
    coinBar = new CoinBar();
    gameSound = new GameSound();
    collectedBottles = 0;
    collectedCoins = 0;
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    endbossStart = false;
    level = setLevel();
    endscreen = new EndScreen(0);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    gameLost() {
        this.endscreen = new EndScreen(1);
        this.endgame();
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    gameWon() {
        this.endscreen = new EndScreen(2);
        this.endgame();
        setTimeout(() => {
            location.reload();
        }, 3000);
    }

    endgame() {
        inters.forEach(clearInterval);
        inters = [];
        
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.setStopableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            if (!this.endbossStart) { this.checkBossStart(); }
            this.gameSound.checkSound();
            if (this.gameSound.actionSound.sound == true) { this.gameSound.actionSound.background.play(); }
            else { this.gameSound.actionSound.background.pause(); }
        }, 20);
    }

    setStopableInterval(fn, time) {
        let id = setInterval(fn, time);
        inters.push(id);
        return id;
    }

    checkBossStart() {
        if (this.character.x > 2000) {
            this.bossBar.fadeIn();
            this.level.enemies[0].initBoss();
            this.endbossStart = true;
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 1;
            this.bottleBar.setPercentage(this.bottlePercentage());
            this.keyboard.D = false;
        }
    }

    checkCollisions() {
        if (this.level.enemies.length > 0) {
            this.checkChickensStamped();
            this.checkChickensSplashed();
            this.checkBoss();
            this.checkChickens();
        }
        this.checkBottleCollect();
        this.checkCoinsCollect();
    }

    checkBoss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.level.enemies[0]) && bottle.energy > 0) {
                bottle.energy = 0;
                this.level.enemies[0].hit();
                this.bossBar.setPercentage(this.level.enemies[0].energy);
                bottle.splash();
                if (this.level.enemies[0].isDead()) {
                    this.level.enemies[0].kill();
                }
            }
        }
        )
    }

    checkChickensSplashed() {
        for (let i = 0; i < this.throwableObjects.length; i++) {
            for (let j = 1; j < this.level.enemies.length; j++) {
                if (this.throwableObjects[i].isColliding(this.level.enemies[j])) {
                    this.level.enemies[j].kill();
                    this.throwableObjects[i].splash();
                }
            }
        }
    }

    checkChickensStamped() {
        if (this.character.isAboveGround() && this.character.speedY < 0) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isCollidingPepe(enemy) && enemy.alive == true && (enemy instanceof Chicken || enemy instanceof BabyChicken)) {
                    enemy.kill();
                }
            }
            )
        }
    }

    checkChickens() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingPepe(enemy) && enemy.alive == true) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }
        )
    }

    checkBottleCollect() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollidingPepe(bottle) && bottle.collected == false) {
                this.collectedBottles += 1;
                this.bottleBar.setPercentage(this.bottlePercentage());
                bottle.collect();
            }
        })
    }

    checkCoinsCollect() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingPepe(coin) && coin.collected == false) {
                this.collectedCoins += 1;
                this.coinBar.setPercentage(this.coinPercentage());
                coin.collect();
            }
        })
    }

    bottlePercentage() {
        return Math.round((this.collectedBottles / this.level.bottles.length) * 100);
    }

    coinPercentage() {
        return Math.round((this.collectedCoins / this.level.coins.length) * 100);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawparallax();
        this.ctx.translate(this.camera_x * 1, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x * 1, 0);
        this.addToMap(this.bottleBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bossBar);
        this.addToMap(this.endscreen);
        let self = this;
        requestAnimationFrame(function () { self.draw(); });
    }

    drawparallax() {
        this.ctx.translate(this.camera_x * 0.125, 0);
        this.addObjectsToMap(this.level.backgroundObjects0);
        this.ctx.translate(-this.camera_x * 0.125, 0);
        this.ctx.translate(this.camera_x * 0.25, 0);
        this.addObjectsToMap(this.level.backgroundObjects1);
        this.ctx.translate(-this.camera_x * 0.25, 0);
        this.ctx.translate(this.camera_x * 0.5, 0);
        this.addObjectsToMap(this.level.backgroundObjects2);
        this.ctx.translate(-this.camera_x * 0.5, 0);
        this.ctx.translate(this.camera_x * 1, 0);
        this.addObjectsToMap(this.level.backgroundObjects3);
        this.ctx.translate(-this.camera_x * 1, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            mo.applyOtherDirection(this.ctx);
        }

        if (mo.alpha < 1.0 && mo.alpha > 0) {
            mo.drawAlpha(this.ctx, mo.alpha);
        } else if (mo.alpha <= 0) {
        } else {
            mo.draw(this.ctx);
        }

        if (mo.otherDirection) {
            mo.restoreOtherDirection(this.ctx);
        }
    }
} 