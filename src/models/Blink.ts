import { TreasureGameSprite } from "./TreasureGameSprite";

export class Blink extends TreasureGameSprite {
  constructor(scaleFactor: number, offsetX: number, offsetY: number) {
    super("./assets/blink.png", scaleFactor, offsetX, offsetY);
  }
}