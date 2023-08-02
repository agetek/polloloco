class GameSound {

    actionSound = {
        'sound': true,
        'bottle_hit': new Audio('audio/bottle_hit.mp3'),
        'bottle_pickup': new Audio('audio/bottle_pickup.mp3'),
        'bottle_throw': new Audio('audio/bottle_throw.mp3'),
        'chicken_die': new Audio('audio/chicken_die.mp3'),
        'coin_pickup': new Audio('audio/coin_pickup.mp3'),
        'fire': new Audio('audio/fire.mp3'),
        'footsteps': new Audio('audio/footsteps.mp3'),
        'hurt_pepe': new Audio('audio/hurt_pepe.mp3'),
        'jump_pepe': new Audio('audio/jump_pepe.mp3'),
        'snore': new Audio('audio/snore.mp3'),
        'background': new Audio('audio/background.mp3')
    }

    soundOff() {
        this.actionSound.sound = false;
    }

    soundOn() {
        this.actionSound.sound = true;
    }

    checkSound() {
        if (world.keyboard.M) {
            this.soundOff();
        } else {
            this.soundOn();
        }
    }
}