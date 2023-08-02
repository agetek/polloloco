class BossBar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/boss_0.svg',
        'img/7_statusbars/2_statusbar_endboss/boss_20.svg',
        'img/7_statusbars/2_statusbar_endboss/boss_40.svg',
        'img/7_statusbars/2_statusbar_endboss/boss_60.svg',
        'img/7_statusbars/2_statusbar_endboss/boss_80.svg',
        'img/7_statusbars/2_statusbar_endboss/boss_100.svg'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
        this.alpha = 0;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    fadeIn() {
        this.setStopableInterval(() => {
            if (this.alpha < 1.0) {
                this.alpha += 0.01;
            } else {
                this.alpha = 1.0;
            }
        }, 20);
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 80) {
            return 4;
        }
        else if (this.percentage > 60) {
            return 3;
        }
        else if (this.percentage > 40) {
            return 2;
        }
        else if (this.percentage > 20) {
            return 1;
        }
        else {
            return 0;
        }
    }
}
