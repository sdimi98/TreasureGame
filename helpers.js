export async function createSprite(imagePath, anchorX = 0.5, anchorY = 0.5, scale = 1) {
    await PIXI.Assets.load(imagePath);
    let sprite = PIXI.Sprite.from(imagePath);
    sprite.anchor.set(anchorX, anchorY);
    sprite.scale.set(scale);
    return sprite;
}