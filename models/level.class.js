class Level {
    coins;
    bottles;
    enemies;
    clouds;
    backgroundObjects0;
    backgroundObjects1;
    backgroundObjects2;
    backgroundObjects3;
    level_end_x = 2800;

    constructor(coins, bottles, enemies, clouds, backgroundObjects0, backgroundObjects1, backgroundObjects2, backgroundObjects3) {
        this.coins = coins;
        this.bottles = bottles;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects0 = backgroundObjects0;
        this.backgroundObjects1 = backgroundObjects1;
        this.backgroundObjects2 = backgroundObjects2;
        this.backgroundObjects3 = backgroundObjects3;
    }
}