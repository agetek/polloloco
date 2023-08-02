class StaticObject extends DrawableObject {
    collected = false;
    alpha = 1.0;

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}