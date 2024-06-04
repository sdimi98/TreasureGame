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
    let sprite = PIXI.Sprite.from('./assets/bg.png');
    sprite.height = window.innerHeight;
    sprite.width = window.innerWidth;
    app.stage.addChild(sprite);
    app.renderer.view.canvas.style.position = 'absolute';

}