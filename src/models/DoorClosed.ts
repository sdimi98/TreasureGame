import { TreasureGameSprite } from "./TreasureGameSprite";

export class DoorClosed extends TreasureGameSprite {
  constructor(scaleFactor: number) {
    super("./assets/door.png",scaleFactor,20,-40);
  }
}