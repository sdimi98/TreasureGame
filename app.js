Start();

async function Start() {
    const app = new PIXI.Application();
    await app.init({
        transparent: false,
        antialias: true
    });
    app.renderer.resize(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.canvas);

    await PIXI.Assets.load('./assets/bg.png');
    let bgSprite = PIXI.Sprite.from('./assets/bg.png');
    bgSprite.height = window.innerHeight;
    bgSprite.width = window.innerWidth;
    app.stage.addChild(bgSprite);
    app.renderer.view.canvas.style.position = 'absolute';

    await PIXI.Assets.load('./assets/door.png');
    let doorSprite = PIXI.Sprite.from('./assets/door.png');
    doorSprite.scale.set(0.31,0.31);
    doorSprite.position.x = (bgSprite.width / 2) - (doorSprite.width / 2) + 18;
    doorSprite.position.y = (bgSprite.height / 2) - (doorSprite.height / 2) - 12;
    app.stage.addChild(doorSprite);
    app.renderer.view.canvas.style.position = 'absolute';

}