import * as PIXI from "pixi.js";

export async function createSprite(imagePath: string, width: number, height: number): Promise<PIXI.Sprite> {
  await PIXI.Assets.load(imagePath);
  const sprite = PIXI.Sprite.from(imagePath);
  sprite.anchor.set(0.5, 0.5);
  const scaleFactor = Math.min(width / sprite.texture.width, height / sprite.texture.height);
  sprite.width = sprite.texture.width * scaleFactor;
  sprite.height = sprite.texture.height * scaleFactor;

  return sprite;
}