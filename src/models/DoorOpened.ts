import { TreasureGameSprite } from "./TreasureGameSprite";

export class DoorOpened extends TreasureGameSprite {
  constructor(scaleFactor: number) {
    super("./assets/doorOpen.png",scaleFactor,1445,-30);
  }
}