class BabyChicken extends Chicken {
    y = 400;
    width = 40;
    height = 40;
    randomInterval = 0;
    timeChange = 0;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    IMAGE_START = 'img/3_enemies_chicken/chicken_small/1_walk/1_w.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.defineEnemy();
    }
}