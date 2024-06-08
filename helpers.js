export async function createSprite(imagePath, width, height) {
    await PIXI.Assets.load(imagePath);
    let sprite = PIXI.Sprite.from(imagePath);
    sprite.anchor.set( 0.5,  0.5);
    sprite.width = width;
    sprite.height = height;
    const scaleFactor = Math.min(width / sprite.texture.width, height / sprite.texture.height);
    sprite.width = sprite.texture.width * scaleFactor;
    sprite.height = sprite.texture.height * scaleFactor;
    return sprite;
}