import * as PIXI from "pixi.js";

export async function createText(scaleFactor: number): Promise<PIXI.Text> {

  const style = new PIXI.TextStyle({
    fontSize: 250,
    fill: "red"
  });
  const counterText = new PIXI.Text({ text: "0", style });
  counterText.scale.set(scaleFactor);
  counterText.anchor.set(1,0.5);
  return counterText;
}