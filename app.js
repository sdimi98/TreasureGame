import {createSprite} from './helpers.js'

Start();

async function Start() {

    /** Init **/
    const app = new PIXI.Application();
    await app.init({
        transparent: false,
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

    /** Sprites **/
    //Background
    let bgSprite = await createSprite('./assets/bg.png', window.innerWidth, window.innerHeight);
    bgSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    app.stage.addChild(bgSprite);

    //blinkSpriteOne
    let blinkSpriteOne = await createSprite('./assets/blink.png', window.innerWidth, window.innerHeight);
    blinkSpriteOne.position.set(app.renderer.width / 2 * 1.05, app.renderer.height / 2 * 1.24);
    blinkSpriteOne.setSize(blinkSpriteOne.width * 0.15, blinkSpriteOne.height * 0.15);
    app.stage.addChild(blinkSpriteOne);

    //blinkSpriteTwo
    let blinkSpriteTwo = await createSprite('./assets/blink.png', window.innerWidth, window.innerHeight);
    blinkSpriteTwo.position.set(app.renderer.width / 2 * 0.97, app.renderer.height / 2 * 0.98);
    blinkSpriteTwo.setSize(blinkSpriteTwo.width * 0.15, blinkSpriteTwo.height * 0.15);
    app.stage.addChild(blinkSpriteTwo);

    //blinkSpriteThree
    let blinkSpriteThree = await createSprite('./assets/blink.png', window.innerWidth, window.innerHeight);
    blinkSpriteThree.position.set(app.renderer.width / 2 * 0.83, app.renderer.height / 2 * 1);
    blinkSpriteThree.setSize(blinkSpriteThree.width * 0.15, blinkSpriteThree.height * 0.15);
    app.stage.addChild(blinkSpriteThree);

    //doorShadowSprite
    let doorShadowSprite = await createSprite('./assets/doorOpenShadow.png', window.innerWidth, window.innerHeight);
    doorShadowSprite.position.set(app.renderer.width / 2 * 1.492, app.renderer.height / 2 * 0.998);
    doorShadowSprite.setSize(bgSprite.width * 0.21, bgSprite.height * 0.58);
    app.stage.addChild(doorShadowSprite);
    doorShadowSprite.alpha = 0;

    //doorOpenSprite
    let doorOpenSprite = await createSprite('./assets/doorOpen.png', window.innerWidth, window.innerHeight);
    doorOpenSprite.position.set(app.renderer.width / 2 * 1.46, app.renderer.height / 2 * 0.966);
    doorOpenSprite.setSize(bgSprite.width * 0.2, bgSprite.height * 0.58);
    app.stage.addChild(doorOpenSprite);
    doorOpenSprite.alpha = 0;

    //doorSprite
    let doorSprite = await createSprite('./assets/door.png', window.innerWidth, window.innerHeight);
    doorSprite.position.set(app.renderer.width / 2 * 1.02, app.renderer.height / 2 * 0.97);
    doorSprite.setSize(bgSprite.width * 0.33, bgSprite.height * 0.6);
    app.stage.addChild(doorSprite);
    doorSprite.alpha = 1;

    //handleShadow
    let handleShadowSprite = await createSprite('./assets/handleShadow.png', window.innerWidth, window.innerHeight);
    handleShadowSprite.position.set((doorSprite.position.x * 0.977), (doorSprite.position.y * 1.01));
    handleShadowSprite.setSize(bgSprite.width * 0.11, bgSprite.height * 0.24)
    app.stage.addChild(handleShadowSprite);
    handleShadowSprite.alpha = 1;

    //handleSprite
    let handleSprite = await createSprite('./assets/handle.png', window.innerWidth, window.innerHeight);
    handleSprite.position.set(doorSprite.position.x * 0.97, doorSprite.position.y * 0.989);
    handleSprite.setSize(bgSprite.width * 0.11, bgSprite.height * 0.24);
    app.stage.addChild(handleSprite);
    handleSprite.alpha = 1;

    //leftRect
    const leftRect = new PIXI.Graphics();
    leftRect.fill({color: 0xFF0000, alpha: 0})
    .rect(0, 0, app.renderer.width / 2, app.renderer.height)
    .position.set(0, 0);
    leftRect.fill();
    leftRect.interactive = true;
    leftRect.on('pointerdown', () => rotateHandle('left'));
    app.stage.addChild(leftRect);

    //rightRect
    const rightRect = new PIXI.Graphics();
    rightRect.fill({color: 0xFF0000, alpha: 0})
    .rect(0, 0, app.renderer.width / 2, app.renderer.height)
    .position.set(bgSprite.x, 0);
    rightRect.fill();
    rightRect.interactive = true;
    rightRect.on('pointerdown', () => rotateHandle('right'));
    app.stage.addChild(rightRect);

    //counterText
    const style = new PIXI.TextStyle({
        fontSize: 23,
        fill: 'red',
    });
    const counterText = new PIXI.Text('Hello world!', style);
    counterText.position.set((app.renderer.width / 2) * 0.592, (app.renderer.height / 2) * 0.875);
    counterText.setSize(bgSprite.width * 0.05, bgSprite.height * 0.03);
    app.stage.addChild(counterText);

    /** Functions **/

    function countSeconds() {
        ticker.add(delta => {
            counterText.text = `${(performance.now() / 1000).toFixed()}`
        });
        ticker.start();
    }

    countSeconds();

    function generateSecretCode() {
        let combination = [];
        for (let i = 0; i < 3; i++) {
            const randomNumber = Math.ceil(Math.random() * 9)
            let directionInt = Math.ceil(Math.random() * 2);
            let direction;
            combination.push(randomNumber);
            if (directionInt === 1) {
                direction = 'clockwise';
                combination.push(direction);
            } else if (directionInt === 2) {
                direction = 'counterclockwise';
                combination.push(direction);
            }
            console.log(`#${i + 1}: ${randomNumber} ${direction}`)
        }
        return combination;
    }


    function rotateHandle(direction) {

        if (direction === 'left' && secretCode[step + 1] === 'counterclockwise') {
            handleLeftRotation();
        } else if (direction === 'right' && secretCode[step + 1] === 'clockwise') {
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

    function handleLeftRotation(){

        counterclockwiseRotations++;
        gsap.to(handleSprite, {
            duration: 0.5,
            rotation: handleSprite.rotation - 1.0472,
        });
        gsap.to(handleShadowSprite, {
            duration: 0.5,
            rotation: handleShadowSprite.rotation - 1.0472
        });
    }
    function handleRightRotation(){
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
    function handleIncorrectCombination(){
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
        console.log('💲💲💲💲💲')
        gsap.to(blinkSpriteOne, {
            yoyo: true,
            startAt: {alpha: 0.8},
            alpha: 1,
            repeat: -1,
            ease: "power1.inOut",
            duration: 0.85

        });
        gsap.to(blinkSpriteTwo, {
            yoyo: true,
            startAt: {alpha: 0.8},
            alpha: 1,
            repeat: -1,
            ease: "power1.inOut",
            duration: 0.85

        });
        gsap.to(blinkSpriteThree, {
            yoyo: true,
            startAt: {alpha: 0.8},
            alpha: 1,
            repeat: -1,
            ease: "power1.inOut",
            duration: 0.85

        });
        app.stage.removeChild(doorSprite);
        app.stage.removeChild(handleSprite);
        app.stage.removeChild(handleShadowSprite);
        doorOpenSprite.alpha = 1;
        doorShadowSprite.alpha = 1;
        style.fill = 'green'
        ticker.stop();
    }

    app.renderer.view.canvas.style.position = 'absolute';

}