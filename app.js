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

    //Handle Shadow
    let handleShadowSprite = await createSprite('./assets/handleShadow.png', 0.5, 0.5, 0.31);
    handleShadowSprite.position.set(doorSprite.position.x - 22, doorSprite.position.y + 6);
    app.stage.addChild(handleShadowSprite);


    //Handle
    let handleSprite = await createSprite('./assets/handle.png', 0.5, 0.5, 0.31);
    handleSprite.position.set(doorSprite.position.x - 27, doorSprite.position.y - 5);
    app.stage.addChild(handleSprite);
    app.renderer.view.canvas.style.position = 'absolute';


}