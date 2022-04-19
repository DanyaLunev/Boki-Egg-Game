const Application = PIXI.Application;
const app = new Application({
    width: innerWidth,
    height: innerHeight,
    backgroundColor: 0x33373d
});
//.appendChild(canvas);

app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);

var catWH = innerWidth / 2.5;
var eggYPOS = 0;
var grav = 3;

PIXI.loader
    .add('./img/bgGame.png')
    .add('./img/catEat.png')
    .add('./img/catMain.png')
    .add('./img/egg.png')
    .load(startGame);

function startGame() {
    // Add Sprites
    let bgGame = new PIXI.Sprite(PIXI.loader.resources['./img/bgGame.png'].texture);
    let catEat = new PIXI.Sprite(PIXI.loader.resources['./img/catEat.png'].texture);
    let catMain = new PIXI.Sprite(PIXI.loader.resources['./img/catMain.png'].texture);
    let egg = new PIXI.Sprite(PIXI.loader.resources['./img/egg.png'].texture);

    // Load Game window
    app.stage.addChild(bgGame);
    bgGame.width = innerWidth;
    bgGame.height = innerHeight;

    // Div
    setTimeout(() => {
        var canvas =  document.getElementsByTagName("canvas")[0];
        const parent = document.createElement("div");
        const el = document.body.appendChild(parent);
        parent.appendChild(canvas);
        console.log(canvas);    
    }, 3);

    // Load Cat Main
    app.stage.addChild(catMain);
    catMain.width = catWH;
    catMain.height = catWH;
    catMain.anchor.set(0.5, 0.5)
    catMain.position.set(innerWidth / 2, innerHeight - catMain.height / 2 + 1);

    // Move cat
    document.addEventListener('touchstart', checkPosition => {
        if (checkPosition.touches[0].clientX < innerWidth / 2) {
            catMain.x -= 30;
            console.log("Left");
        } else {
            catMain.x += 30;
            console.log("Right");
        }
    });

    document.addEventListener('keydown', event => {
        if (event.keyCode == 37) {
            catMain.x -= 30;
        }
        if (event.keyCode == 39) {
            catMain.x += 30;
        }
    });

    // Eggs
    app.ticker.add(delta => loop(delta))
    function loop() {
        app.stage.addChild(egg);
        egg.width = 50;
        egg.height = 65;
        egg.anchor.set(0.5, 0.5)
        egg.position.set(Math.random() * app.screen.width, eggYPOS);
        eggYPOS += grav;
    }
 
}
