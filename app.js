import {createSprite} from './helpers.js'

Start();

async function Start() {

    //Init
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

    //Background
    let bgSprite = await createSprite('./assets/bg.png', window.innerWidth, window.innerHeight);
    bgSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    app.stage.addChild(bgSprite);


    //doorSprite
    let doorSprite = await createSprite('./assets/door.png', window.innerWidth, window.innerHeight);
    doorSprite.position.set(app.renderer.width / 2 * 1.01, app.renderer.height / 2 * 0.96);
    doorSprite.setSize(doorSprite.width * 0.6, doorSprite.height * 0.6);
    app.stage.addChild(doorSprite);

    //doorOpenShadow
    let doorShadowSprite = await createSprite('./assets/doorOpenShadow.png', window.innerWidth, window.innerHeight);
    doorShadowSprite.position.set(app.renderer.width / 2 * 1.492, app.renderer.height / 2 * 0.988);
    doorShadowSprite.setSize(doorShadowSprite.width * 0.6, doorShadowSprite.height * 0.6);
    app.stage.addChild(doorShadowSprite);

    //doorOpen
    let doorOpenSprite = await createSprite('./assets/doorOpen.png', window.innerWidth, window.innerHeight);
    doorOpenSprite.position.set(app.renderer.width / 2 * 1.46, app.renderer.height / 2 * 0.966);
    doorOpenSprite.setSize(doorOpenSprite.width * 0.6, doorOpenSprite.height * 0.6);
    app.stage.addChild(doorOpenSprite);


    //handleShadow
    let handleShadowSprite = await createSprite('./assets/handleShadow.png', window.innerWidth, window.innerHeight);
    handleShadowSprite.position.set((doorSprite.position.x * 0.977), (doorSprite.position.y * 1.01));
    handleShadowSprite.setSize(handleShadowSprite.width * 0.24, handleShadowSprite.height * 0.24)
    app.stage.addChild(handleShadowSprite);

    //handleSprite
    let handleSprite = await createSprite('./assets/handle.png', window.innerWidth, window.innerHeight);
    handleSprite.position.set(doorSprite.position.x * 0.97, doorSprite.position.y * 0.989);
    handleSprite.setSize(handleSprite.width * 0.24, handleSprite.height * 0.24)
    app.stage.addChild(handleSprite);

    //leftRect
    const leftRect = new PIXI.Graphics();
    leftRect.fill({color: 0x000000, alpha: 0});
    leftRect.rect(0, 0, app.renderer.width / 2, app.renderer.height);
    leftRect.position.set(0, 0)
    leftRect.fill();
    leftRect.interactive = true;
    leftRect.on('pointerdown', () => rotateHandle('left'));
    app.stage.addChild(leftRect);

    //rightRect
    const rightRect = new PIXI.Graphics();
    rightRect.fill({color: 0x900000, alpha: 0});
    rightRect.rect(0, 0, app.renderer.width / 2, app.renderer.height);
    rightRect.position.set(bgSprite.x, 0)
    rightRect.fill();
    rightRect.interactive = true;
    rightRect.on('pointerdown', () => rotateHandle('right'));
    app.stage.addChild(rightRect);

    //functions

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
            counterclockwiseRotations++;
            gsap.to(handleSprite, {
                duration: 0.5,
                rotation: handleSprite.rotation - 1.0472
            });
            gsap.to(handleShadowSprite, {
                duration: 0.5,
                rotation: handleShadowSprite.rotation - 1.0472
            });
        } else if (direction === 'right' && secretCode[step + 1] === 'clockwise') {
            clockwiseRotations++;
            gsap.to(handleSprite, {
                duration: 0.5,
                rotation: handleSprite.rotation + 1.0472
            });
            gsap.to(handleShadowSprite, {
                duration: 0.5,
                rotation: handleShadowSprite.rotation + 1.0472
            });
        } else console.log('owie :(')


        if (clockwiseRotations === secretCode[step]) {
            console.log('nice')
            step++;
            step++;
            clockwiseRotations = 0;
        }
        if (counterclockwiseRotations === secretCode[step]) {
            console.log('nice')
            step++;
            step++;
            counterclockwiseRotations = 0;
        }
    }

    app.renderer.view.canvas.style.position = 'absolute';

}