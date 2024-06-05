import {createSprite} from './helpers.js'

Start();

async function Start() {

    //Init
    const app = new PIXI.Application();
    await app.init({
        transparent: false,
        antialias: true
    });
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.canvas);

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

    // leftArrowSprite
    let leftArrowSprite = await createSprite('./assets/arrowLeft.png', 0.5, 0.5, 0.31);
    leftArrowSprite.position.set(doorSprite.position.x - 150, doorSprite.position.y - 150);
    leftArrowSprite.alpha = 0.5;
    leftArrowSprite.interactive = true;
    leftArrowSprite.cursor = 'pointer';
    leftArrowSprite.on('pointerdown', () => rotateHandle('left'));
    app.stage.addChild(leftArrowSprite);

    // rightArrowSprite
    let rightArrowSprite = await createSprite('./assets/arrowRight.png', 0.5, 0.5, 0.31);
    rightArrowSprite.position.set(doorSprite.position.x + 95, doorSprite.position.y - 150);
    rightArrowSprite.alpha = 0.5;
    rightArrowSprite.interactive = true;
    rightArrowSprite.cursor = 'pointer';
    rightArrowSprite.on('pointerdown', () => rotateHandle('right'));
    app.stage.addChild(rightArrowSprite);

    function rotateHandle(direction) {
        if (direction === 'left') {
            gsap.to(handleSprite, {
                duration: 0.5,
                rotation: handleSprite.rotation - 1.0472
            });
            gsap.to(handleShadowSprite, {
                duration: 0.5,
                rotation: handleShadowSprite.rotation - 1.0472
            });
        } else if (direction === 'right') {
            gsap.to(handleSprite, {
                duration: 0.5,
                rotation: handleSprite.rotation + 1.0472
            });
            gsap.to(handleShadowSprite, {
                duration: 0.5,
                rotation: handleShadowSprite.rotation + 1.0472
            });
        }
    }

    app.renderer.view.canvas.style.position = 'absolute';

}