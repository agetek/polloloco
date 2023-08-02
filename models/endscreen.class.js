class EndScreen extends StaticObject {
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    IMAGE_LOST = [
        'img/9_intro_outro_screens/game_over/oh_no_you_lost.png'
    ];

    IMAGE_WON = [
        'img/9_intro_outro_screens/game_over/game_over.png'
    ];

    constructor(result) {
        super();
        if (result == 2) {
            this.loadImage(this.IMAGE_WON);
        }
        else if (result == 1) {
            this.loadImage(this.IMAGE_LOST);
        }
        else {
            this.loadImage(this.IMAGE_WON);
            this.width = 0;
            this.height = 0;
        }
    }
}