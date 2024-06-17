import * as PIXI from "pixi.js";

export async function createSprite(imagePath: string, scaleFactor: number): Promise<PIXI.Sprite>;
export async function createSprite(imagePath: string, width: number, height: number): Promise<PIXI.Sprite>;

export async function createSprite(imagePath: string, arg1: number, arg2?: number): Promise<PIXI.Sprite> {
  await PIXI.Assets.load(imagePath);
  const sprite = PIXI.Sprite.from(imagePath);
  sprite.anchor.set(0.5, 0.5);
  if (arg2 === undefined) {
    sprite.scale.set(arg1);

  } else {
    const scaleFactor = Math.max(arg1 / sprite.texture.width, arg2 / sprite.texture.height);
    sprite.scale.set(scaleFactor);
  }

  return sprite;
}