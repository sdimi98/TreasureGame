import gsap from "gsap";
import * as PIXI from "pixi.js";
import { createSprite } from "./utils/createSprite";
import { createText } from "./utils/createText";
import { Container } from "pixi.js";

Start();

async function Start() {

  /** Init **/
  const app = new PIXI.Application();
  await app.init({
    antialias: true,
    resizeTo: window
  });
  app.renderer.resize(window.innerWidth, window.innerHeight);

  document.body.appendChild(app.canvas);

  let secretCode = generateSecretCode();

  let clockwiseRotations = 0;
  let counterclockwiseRotations = 0;
  let step = 0;
  const ticker = new PIXI.Ticker();
  const gameContainer = new Container();
  let scaleX;
  let scaleY;
  let scaleFactor: number;
  app.stage.addChild(gameContainer);

  /** Sprites **/
    //Background
  let bgSprite = await createSprite("./assets/bg.png", window.innerWidth, window.innerHeight);
  bgSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
  scaleFactor = calculateScaleFactor();
  bgSprite.scale.set(scaleFactor);
  gameContainer.addChild(bgSprite);

  //blinkSpriteOne
  let blinkSpriteOne = await createSprite("./assets/blink.png", scaleFactor);
  blinkSpriteOne.position.set(app.renderer.width / 2 * 1.05, app.renderer.height / 2 * 1.24);
  gameContainer.addChild(blinkSpriteOne);

  //blinkSpriteTwo
  let blinkSpriteTwo = await createSprite("./assets/blink.png", scaleFactor);
  blinkSpriteTwo.position.set(app.renderer.width / 2 * 0.97, app.renderer.height / 2 * 0.98);
  gameContainer.addChild(blinkSpriteTwo);

  //blinkSpriteThree
  let blinkSpriteThree = await createSprite("./assets/blink.png", scaleFactor);
  blinkSpriteThree.position.set(app.renderer.width / 2 * 0.83, app.renderer.height / 2 * 1);
  gameContainer.addChild(blinkSpriteThree);

  //doorShadowSprite
  let doorShadowSprite = await createSprite("./assets/doorOpenShadow.png", scaleFactor);
  doorShadowSprite.position.set(app.renderer.width / 2 * 1.492, app.renderer.height / 2 * 0.998);
  gameContainer.addChild(doorShadowSprite);
  doorShadowSprite.alpha = 0;

  //doorOpenSprite
  let doorOpenSprite = await createSprite("./assets/doorOpen.png", scaleFactor);
  doorOpenSprite.position.set(app.renderer.width / 2 * 1.46, app.renderer.height / 2 * 0.966);
  gameContainer.addChild(doorOpenSprite);
  doorOpenSprite.alpha = 0;

  //doorSprite
  let doorSprite = await createSprite("./assets/door.png", scaleFactor);
  doorSprite.position.set(app.renderer.width / 2 * 1.02, app.renderer.height / 2 * 0.97);
  gameContainer.addChild(doorSprite);

  //handleShadow
  let handleShadowSprite = await createSprite("./assets/handleShadow.png", scaleFactor);
  handleShadowSprite.position.set((doorSprite.position.x * 0.977), (doorSprite.position.y * 1.01));
  gameContainer.addChild(handleShadowSprite);

  //handleSprite
  let handleSprite = await createSprite("./assets/handle.png", scaleFactor);
  handleSprite.position.set(doorSprite.position.x * 0.97, doorSprite.position.y * 0.989);
  gameContainer.addChild(handleSprite);

  //leftRect
  const leftRect = new PIXI.Graphics();
  leftRect.fill({ color: 0xFF0000, alpha: 0 })
    .rect(0, 0, app.renderer.width / 2, app.renderer.height)
    .position.set(0, 0);
  leftRect.fill();
  leftRect.interactive = true;
  leftRect.on("pointerdown", () => rotateHandle("left"));
  gameContainer.addChild(leftRect);

  //rightRect
  const rightRect = new PIXI.Graphics();
  rightRect.fill({ color: 0xFF0000, alpha: 0 })
    .rect(0, 0, app.renderer.width / 2, app.renderer.height)
    .position.set(bgSprite.x, 0);
  rightRect.fill();
  rightRect.interactive = true;
  rightRect.on("pointerdown", () => rotateHandle("right"));
  gameContainer.addChild(rightRect);

  //counterText
  let counterText =await createText(scaleFactor);
  const counterTextContainer = new Container();
  counterTextContainer.scale.set(scaleFactor);
  counterTextContainer.position.set(app.renderer.width / 2, app.renderer.height / 2 );
  counterText.x=-1090;
  counterText.y=-145;
  counterTextContainer.addChild(counterText);
  gameContainer.addChild(counterTextContainer);

  /** Functions **/

  window.onresize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    scaleFactor = calculateScaleFactor()
    scaleSprites();
    positionSprites();
  };

  function scaleSprites() {
    bgSprite.scale.set(scaleFactor);
    doorSprite.scale.set(scaleFactor);
    handleSprite.scale.set(scaleFactor);
    handleShadowSprite.scale.set(scaleFactor);
    blinkSpriteOne.scale.set(scaleFactor);
    blinkSpriteTwo.scale.set(scaleFactor);
    blinkSpriteThree.scale.set(scaleFactor);
    doorOpenSprite.scale.set(scaleFactor);
    doorShadowSprite.scale.set(scaleFactor);
    counterTextContainer.scale.set(scaleFactor);

  }
  function positionSprites(){
    bgSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    doorSprite.position.set(app.renderer.width / 2 * 1.02, app.renderer.height / 2 * 0.97);
    handleSprite.position.set(doorSprite.position.x * 0.97, doorSprite.position.y * 0.989);
    handleShadowSprite.position.set((doorSprite.position.x * 0.977), (doorSprite.position.y * 1.01));
    blinkSpriteOne.position.set(app.renderer.width / 2 * 1.05, app.renderer.height / 2 * 1.24);
    blinkSpriteTwo.position.set(app.renderer.width / 2 * 0.97, app.renderer.height / 2 * 0.98);
    blinkSpriteThree.position.set(app.renderer.width / 2 * 0.83, app.renderer.height / 2 * 1);
    doorShadowSprite.position.set(app.renderer.width / 2 * 1.492, app.renderer.height / 2 * 0.998);
    doorOpenSprite.position.set(app.renderer.width / 2 * 1.46, app.renderer.height / 2 * 0.966);
    counterTextContainer.position.set((app.renderer.width / 2), (app.renderer.height / 2));


  }
  function calculateScaleFactor(){
    scaleX = window.innerWidth / bgSprite.texture.width;
    scaleY = window.innerHeight / bgSprite.texture.height;
   return scaleFactor = Math.max(scaleX, scaleY);
  }


  function countSeconds() {
    ticker.add(() => {
      counterText.text = `${(performance.now() / 1000).toFixed()}`;
    });
    ticker.start();
  }

  countSeconds();

  function generateSecretCode() {
    let combination = [];
    for (let i = 0; i < 3; i++) {
      const randomNumber = Math.ceil(Math.random() * 9);
      let directionInt = Math.ceil(Math.random() * 2);
      let direction;
      combination.push(randomNumber);
      if (directionInt === 1) {
        direction = "clockwise";
        combination.push(direction);
      } else if (directionInt === 2) {
        direction = "counterclockwise";
        combination.push(direction);
      }
      console.log(`#${i + 1}: ${randomNumber} ${direction}`);
    }
    return combination;
  }


  function rotateHandle(direction: string) {

    if (direction === "left" && secretCode[step + 1] === "counterclockwise") {
      handleLeftRotation();
    } else if (direction === "right" && secretCode[step + 1] === "clockwise") {
      handleRightRotation();
    } else {
      handleIncorrectCombination();
    }
    if (clockwiseRotations === secretCode[step]) {
      advanceClockwiseStep();
    }
    if (counterclockwiseRotations === secretCode[step]) {
      advanceCounterClockwiseStep();
    }
    if (step === 6) {
      openDoor();
    }
  }

  function handleLeftRotation() {

    counterclockwiseRotations++;
    gsap.to(handleSprite, {
      duration: 0.5,
      rotation: handleSprite.rotation - 1.0472
    });
    gsap.to(handleShadowSprite, {
      duration: 0.5,
      rotation: handleShadowSprite.rotation - 1.0472
    });
  }

  function handleRightRotation() {
    clockwiseRotations++;
    gsap.to(handleSprite, {
      duration: 0.5,
      rotation: handleSprite.rotation + 1.0472
    });
    gsap.to(handleShadowSprite, {
      duration: 0.5,
      rotation: handleShadowSprite.rotation + 1.0472
    });
  }

  function handleIncorrectCombination() {
    clockwiseRotations = 0;
    counterclockwiseRotations = 0;
    step = 0;
    gsap.to(handleSprite, {
      yoyo: true,
      duration: 1,
      rotation: 15,
      onComplete: () => {
        handleSprite.rotation = 0;
      }
    });
    gsap.to(handleShadowSprite, {
      yoyo: true,
      duration: 1,
      rotation: 15,
      onComplete: () => {
        handleShadowSprite.rotation = 0;
      }
    });
  }

  function advanceCounterClockwiseStep() {
    step++;
    step++;
    counterclockwiseRotations = 0;
  }

  function advanceClockwiseStep() {
    step++;
    step++;
    clockwiseRotations = 0;
  }

  function openDoor() {
    console.log("💲💲💲💲💲");
    gsap.to(blinkSpriteOne, {
      yoyo: true,
      startAt: { alpha: 0.8 },
      alpha: 1,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.85

    });
    gsap.to(blinkSpriteTwo, {
      yoyo: true,
      startAt: { alpha: 0.8 },
      alpha: 1,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.85

    });
    gsap.to(blinkSpriteThree, {
      yoyo: true,
      startAt: { alpha: 0.8 },
      alpha: 1,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.85

    });
    gameContainer.removeChild(doorSprite);
    gameContainer.removeChild(handleSprite);
    gameContainer.removeChild(handleShadowSprite);
    doorOpenSprite.alpha = 1;
    doorShadowSprite.alpha = 1;
    // style.fill = "green";
    ticker.stop();
  }


}