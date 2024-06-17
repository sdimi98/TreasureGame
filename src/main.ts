import gsap from "gsap";
import * as PIXI from "pixi.js";
import { createText } from "./utils/createText";
import { Container } from "pixi.js";
import { DoorClosed } from "./models/DoorClosed";
import { Background } from "./models/Background";
import { Blink } from "./models/Blink";
import { Handle } from "./models/Handle";
import { HandleShadow } from "./models/HandleShadow";
import { DoorOpened } from "./models/DoorOpened";
import { DoorOpenedShadow } from "./models/DoorOpenedShadow";

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
  let centerX = app.renderer.width / 2;
  let centerY = app.renderer.height / 2;
  let scaleFactor: number = 1;
  app.stage.addChild(gameContainer);

  /** Sprites **/
    //Background
  let bgSprite = new Background();
  await bgSprite.loadSprite(scaleFactor);
  scaleFactor = calculateScaleFactor();
  bgSprite.positionSprite(centerX,centerY,scaleFactor);
  bgSprite.scale.set(scaleFactor);
  gameContainer.addChild(bgSprite);

  //blinkSpriteOne
  let blinkSpriteOne = new Blink(scaleFactor,50,170);
  blinkSpriteOne.positionSprite(centerX,centerY,scaleFactor);
  gameContainer.addChild(blinkSpriteOne);

  //blinkSpriteTwo
  let blinkSpriteTwo = new Blink(scaleFactor,-90,0);
  blinkSpriteTwo.positionSprite(centerX,centerY,scaleFactor);
  gameContainer.addChild(blinkSpriteTwo);

  //blinkSpriteThree
  let blinkSpriteThree = new Blink(scaleFactor,-480,-50);
  blinkSpriteThree.positionSprite(centerX,centerY,scaleFactor);
  gameContainer.addChild(blinkSpriteThree);

  //doorShadowSprite
  let doorShadowSprite = new DoorOpenedShadow(scaleFactor);
  doorShadowSprite.positionSprite(centerX,centerY,scaleFactor);
  gameContainer.addChild(doorShadowSprite);
  doorShadowSprite.alpha = 0;

  //doorOpenSprite
  let doorOpenSprite = new DoorOpened(scaleFactor);
  doorOpenSprite.positionSprite(centerX,centerY,scaleFactor);
  gameContainer.addChild(doorOpenSprite);
  doorOpenSprite.alpha = 0;

  //doorSprite
  const doorSprite = new DoorClosed(scaleFactor);
  await doorSprite.loadSprite(scaleFactor);
  doorSprite.positionSprite(centerX,centerY,scaleFactor);
  gameContainer.addChild(doorSprite);
  doorSprite.alpha=1;

  //handleShadow
  let handleShadowSprite = new HandleShadow(scaleFactor);
  handleShadowSprite.positionSprite(doorSprite.position.x,doorSprite.position.y,scaleFactor);
  gameContainer.addChild(handleShadowSprite);
  handleShadowSprite.alpha=1;

  //handleSprite
  let handleSprite = new Handle(scaleFactor);
  handleSprite.positionSprite(doorSprite.position.x,doorSprite.position.y,scaleFactor);
  gameContainer.addChild(handleSprite);
  handleSprite.alpha=1;

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
    centerX=app.renderer.width / 2;
    centerY=app.renderer.height / 2;
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
    bgSprite.positionSprite(centerX,centerY,scaleFactor);
    doorSprite.positionSprite(centerX,centerY,scaleFactor);
    handleSprite.positionSprite(doorSprite.position.x,doorSprite.position.y,scaleFactor);
    handleShadowSprite.positionSprite(doorSprite.position.x,doorSprite.position.y,scaleFactor);
    blinkSpriteOne.positionSprite(centerX,centerY,scaleFactor);
    blinkSpriteTwo.positionSprite(centerX,centerY,scaleFactor);
    blinkSpriteThree.positionSprite(centerX,centerY,scaleFactor);
    doorShadowSprite.positionSprite(centerX,centerY,scaleFactor);
    doorOpenSprite.positionSprite(centerX,centerY,scaleFactor);
    counterTextContainer.position.set(centerX, centerY);


  }
  function calculateScaleFactor(){
   let scaleX = window.innerWidth / bgSprite.texture.width;
    let scaleY = window.innerHeight / bgSprite.texture.height;
   return scaleFactor = Math.min(scaleX, scaleY);
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
      startAt: { alpha: 0.65 },
      alpha: 1,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.95

    });
    gsap.to(blinkSpriteTwo, {
      yoyo: true,
      startAt: { alpha: 0.6 },
      alpha: 1,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.85

    });
    gsap.to(blinkSpriteThree, {
      yoyo: true,
      startAt: { alpha: 0.55 },
      alpha: 1,
      repeat: -1,
      ease: "power1.inOut",
      duration: 0.75

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