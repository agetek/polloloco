class Bottle extends StaticObject {
    orientation = 0;
    width = 70;
    height = 70;

    IMAGE_BOTTLE_0 = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    IMAGE_BOTTLE_1 = 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png';

    constructor() {
        super();
        this.create();
    }

    collect() {
        if (world.gameSound.actionSound.sound == true) { world.gameSound.actionSound.bottle_pickup.play(); }
        this.collected = true;
        this.alpha = 0;
    }

    create() {
        this.x = this.randomizeX();
        this.y = this.randomizeY();
        this.orientation = this.randomizeOrientation();
        if (this.orientation == 0) {
            this.loadImage(this.IMAGE_BOTTLE_0);
        } else {
            this.loadImage(this.IMAGE_BOTTLE_1);
        }
    }

    randomizeX() {
        return Math.round(Math.random() * (2500)) + 300;
    }

    randomizeY() {
        return Math.round(Math.random() * 20) + 360;
    }

    randomizeOrientation() {
        return Math.round(Math.random());
    }
}