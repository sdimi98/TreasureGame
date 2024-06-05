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
    await PIXI.Assets.load('./assets/bg.png');
    let bgSprite = PIXI.Sprite.from('./assets/bg.png');
    bgSprite.height = window.innerHeight;
    bgSprite.width = window.innerWidth;
    app.stage.addChild(bgSprite);
    app.renderer.view.canvas.style.position = 'absolute';

    //Door
    await PIXI.Assets.load('./assets/door.png');
    let doorSprite = PIXI.Sprite.from('./assets/door.png');
    doorSprite.scale.set(0.31,0.31);
    doorSprite.anchor.set(0.5, 0.5)
    doorSprite.position.x = app.renderer.width / 2 + 18;
    doorSprite.position.y = app.renderer.height / 2 - 12;
    app.stage.addChild(doorSprite);
    app.renderer.view.canvas.style.position = 'absolute';

    //Handle Shadow
    await PIXI.Assets.load('./assets/handleShadow.png');
    let handleShadowSprite = PIXI.Sprite.from('./assets/handleShadow.png');
    handleShadowSprite.anchor.set(0.5, 0.5)
    handleShadowSprite.scale.set(0.31,0.31);
    handleShadowSprite.position.x = doorSprite.position.x - 22;
    handleShadowSprite.position.y = doorSprite.position.y + 6;
    app.stage.addChild(handleShadowSprite);
    app.renderer.view.canvas.style.position = 'absolute';

    //Handle
    await PIXI.Assets.load('./assets/handle.png');
    let handleSprite = PIXI.Sprite.from('./assets/handle.png');
    handleSprite.anchor.set(0.5, 0.5)
    handleSprite.scale.set(0.31,0.31);
    handleSprite.position.x = doorSprite.position.x - 27;
    handleSprite.position.y = doorSprite.position.y - 5;
    app.stage.addChild(handleSprite);
    app.renderer.view.canvas.style.position = 'absolute';


}