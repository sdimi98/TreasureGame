import { TreasureGameSprite } from "./TreasureGameSprite";

export class DoorOpenedShadow extends TreasureGameSprite {
  constructor(scaleFactor: number) {
    super("./assets/doorOpenShadow.png",scaleFactor,1545,20);
  }
}