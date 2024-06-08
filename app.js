import {createSprite} from './helpers.js'

Start();

async function Start() {

    //Init
    const app = new PIXI.Application();
    await app.init({
        transparent: false,
        antialias: true,
        // resizeTo: window
    });
    app.renderer.resize(window.innerWidth, window.innerHeight);

    document.body.appendChild(app.canvas);
    let secretCode = generateSecretCode();
    let clockwiseRotations = 0;
    let counterclockwiseRotations = 0;
    let step = 0;

    //Background
    let bgSprite = await createSprite('./assets/bg.png', 0.5, 0.5, 1);
    bgSprite.width = window.innerWidth;
    bgSprite.height = window.innerHeight;
    bgSprite.position.set(app.renderer.width / 2, app.renderer.height / 2);
    app.stage.addChild(bgSprite);

    //Door
    let doorSprite = await createSprite('./assets/door.png', 0.5, 0.5, 0.31);
    doorSprite.position.set(app.renderer.width / 2 + 18, app.renderer.height / 2 - 12);
    app.stage.addChild(doorSprite);


    //handleShadow
    let handleShadowSprite = await createSprite('./assets/handleShadow.png', 0.5, 0.5, 0.31);
    handleShadowSprite.position.set(doorSprite.position.x - 22, doorSprite.position.y + 6);
    app.stage.addChild(handleShadowSprite);


    //handleSprite
    let handleSprite = await createSprite('./assets/handle.png', 0.5, 0.5, 0.31);
    handleSprite.position.set(doorSprite.position.x - 27, doorSprite.position.y - 5);
    app.stage.addChild(handleSprite);


    //leftRect
    const leftRect = new PIXI.Graphics();
    leftRect.fill({color: 0x000000, alpha: 0});
    leftRect.rect(0, 0, app.renderer.width / 2, app.renderer.height);
    leftRect.position.set(-100, 0)
    leftRect.fill();
    leftRect.interactive = true;
    leftRect.on('pointerdown', () => rotateHandle('left'));
    app.stage.addChild(leftRect);

    //rightRect
    const rightRect = new PIXI.Graphics();
    rightRect.fill({color: 0x000000, alpha: 0});
    rightRect.rect(0, 0, app.renderer.width / 2, app.renderer.height);
    rightRect.position.set(bgSprite.x + 90, 0)
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


        if (direction === 'left' && secretCode[step+1]==='counterclockwise') {
            counterclockwiseRotations++;
            gsap.to(handleSprite, {
                duration: 0.5,
                rotation: handleSprite.rotation - 1.0472
            });
            gsap.to(handleShadowSprite, {
                duration: 0.5,
                rotation: handleShadowSprite.rotation - 1.0472
            });
        } else if (direction === 'right' && secretCode[step+1]==='clockwise') {
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