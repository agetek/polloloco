let canvas = false;
let world = false;
let keyboard = new Keyboard;
keyboard.M = false;
let toggle = false;
let widthImportant = false;
let level1 = false;
let mobile = false;
let landscape = false;
let inters = [];

function init() {
    level1 = setLevel();
    canvas = document.getElementById('can');
    world = new World(canvas, keyboard);
    document.getElementById('startlevel').style.display = 'none';
    if (window.innerWidth < 900) {
        document.getElementById('hud').style.display = 'flex';
        hudOn();
        toggleFullscreen();
    } else {
        document.getElementById('hud').style.display = 'flex';
        hudOff();
    }
}

function startGame() {
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 27) {
        keyboard.ESC = true;
        toggle = false;
        exitFullscreen();
    }
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 27) {
        keyboard.ESC = false;
    }
    if (e.keyCode == 77) {
        toggleSound();
    }
});

function mobileFullscreen() {
    toggle = true;
    enterFullscreen(document.getElementById('hud'));
    document.getElementById('fullscreen_button').style.display = 'none';
}

function toggleSound() {
    if (keyboard.M == true) {
        keyboard.M = false;
        document.getElementById('sound_button').style.backgroundImage = 'url(img/hud/volume-high-solid.svg)';
    } else {
        keyboard.M = true;
        document.getElementById('sound_button').style.backgroundImage = 'url(img/hud/volume-xmark-solid.svg)';
    }
}

function hudOn() {
    document.getElementById('hud_left').style.display = 'flex';
    document.getElementById('hud_right').style.display = 'flex';
    document.getElementById('hud_jump').style.display = 'flex';
    document.getElementById('hud_bottle').style.display = 'flex'
}

function hudOff() {
    document.getElementById('hud_left').style.display = 'none';
    document.getElementById('hud_right').style.display = 'none';
    document.getElementById('hud_jump').style.display = 'none';
    document.getElementById('hud_bottle').style.display = 'none';
}

function hudAndCanvasToNormal() {
    if (!toggle) {
        document.getElementById('can').style.width = '720px';
        document.getElementById('can').style.height = '480px';
        document.getElementById('hud').style.width = '720px';
        document.getElementById('hud').style.height = '480px';
    }
}

function toggleFullscreen() {
    if (!toggle) {
        toggle = true;
        enterFullscreen(document.getElementById('canvas_hud_others'));
    }
    else {
        toggle = false;
        exitFullscreen();
    }
}

function enterFullscreen(el) {

    document.getElementById('fullscreen_button').style.backgroundImage = 'url(img/hud/compress-solid.svg)';
    if (el.requestFullscreen) {

        el.requestFullscreen();
    } else if (del.msRequestFullscreen) {
        el.msRequestFullscreen();
    } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
    }
    else {
        console.log(el.requestFullscreen());
    }
    document.getElementById('can').style.width = '100vw';
    document.getElementById('can').style.height = '100vh';
}

function exitFullscreen() {
    document.getElementById('can').style.width = '720px';
    document.getElementById('can').style.height = '480px';

    document.getElementById('fullscreen_button').style.backgroundImage = 'url(img/hud/expand-solid.svg)';
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function hudLeft() {
    keyboard.LEFT = true;
}

function hudRight() {
    keyboard.RIGHT = true;
}

function hudJump() {
    keyboard.UP = true;
}

function hudBottle() {
    keyboard.D = true;
}

function hudLeftOut() {
    keyboard.LEFT = false;
}

function hudRightOut() {
    keyboard.RIGHT = false;
}

function hudJumpOut() {
    keyboard.UP = false;
}

function hudBottleOut() {
    keyboard.D = false;
}
