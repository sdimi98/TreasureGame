import { TreasureGameSprite } from "./TreasureGameSprite";

export class HandleShadow extends TreasureGameSprite {
  constructor(scaleFactor: number) {
    super("./assets/handleShadow.png",scaleFactor,-65,10);
  }
}