import { Sprite, Texture } from "pixi.js";
import { createSprite } from "../utils/createSprite";

export abstract class TreasureGameSprite extends Sprite{

  private _offsetX = 0;
  private _offsetY = 0;
  private _texturePath:string = "";

    protected constructor(texturePath:string,scaleFactor: number, offsetX:number,offsetY:number) {
      super(Texture.EMPTY);
      this._offsetX=offsetX;
      this._offsetY=offsetY;
      this._texturePath=texturePath;
      this.loadSprite(scaleFactor);
    }

  public async loadSprite(scaleFactor: number) {
    const sprite = await createSprite(this._texturePath, scaleFactor);
    this.texture = sprite.texture;
    this.scale.set(scaleFactor);
    this.anchor.set(0.5);
  }

  public positionSprite(x: number, y: number, scaleFactor: number) {
    this.position.set(x+this.offsetX * scaleFactor,y+this.offsetY * scaleFactor)
  }

  get offsetX(): number {
    return this._offsetX;
  }

  get offsetY(): number {
    return this._offsetY;
  }

}