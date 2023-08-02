class Coin extends StaticObject {
    width = 60;
    height = 60;

    IMAGES_COIN = [
        'img/8_coin/coin_1.svg',
        'img/8_coin/coin_2.svg',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        this.create();
    }

    collect() {
        if (world.gameSound.actionSound.sound == true) { world.gameSound.actionSound.coin_pickup.play(); }
        this.collected = true;
        this.alpha = 0;
    }

    create() {
        this.x = this.randomizeX();
        this.y = this.randomizeY();
        
        this.animate();
    }

    animate() {
        this.setStopableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 500);
    }

    randomizeX() {
        return Math.round(Math.random() * (2500)) + 300;
    }

    randomizeY() {
        return Math.round(Math.random() * 150) + 100;
    }
}