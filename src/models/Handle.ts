import { TreasureGameSprite } from "./TreasureGameSprite";

export class Handle extends TreasureGameSprite {
  constructor(scaleFactor: number) {
    super("./assets/handle.png",scaleFactor,-100,-10);
  }
}