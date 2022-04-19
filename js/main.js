const Application = PIXI.Application;
const app = new Application({
    width: innerWidth,
    height: innerHeight,
    backgroundColor: 0x33373d
});

app.renderer.view.style.position = 'absolute';
document.body.appendChild(app.view);

// Variables
var catWH = window.innerWidth / 2.5;
var grav = 2;
var score = 0;

// Eggs
var eggs = [];

eggs[0] = {
    x : 100,
    y : 0
}

// Window Width and Height
var winW = 0;
var winH = 0;

// Load Game
PIXI.loader
    .add('./img/bgGame.png')
    .add('./img/catEat.png')
    .add('./img/catMain.png')
    .add('./img/egg.png')
    .load(startGame);

// Game function
function startGame() {
    // Div
    setTimeout(() => {
        var canvas =  document.getElementsByTagName("canvas")[0];
        const parent = document.createElement("div");
        const el = document.body.appendChild(parent);
        parent.appendChild(canvas);

        if (window.screen.availWidth < 500) {
            el.style.width = window.innerWidth;
            el.style.height = window.innerHeight;
            winW = window.innerWidth;
            winH = window.innerHeight;
        } else {
            el.style.height = "100vh";
            el.style.width = "30vw";

            winW = "30vw";
            winH = "100vh";

            el.style.position = "absolute";
            el.style.left = "35vw";

            app.renderer.resize(341, 970);
        }
    }, 3);

    // Add Sprites
    let bgGame = new PIXI.Sprite(PIXI.loader.resources['./img/bgGame.png'].texture);
    let catEat = new PIXI.Sprite(PIXI.loader.resources['./img/catEat.png'].texture);
    let catMain = new PIXI.Sprite(PIXI.loader.resources['./img/catMain.png'].texture);
    let egg = new PIXI.Sprite(PIXI.loader.resources['./img/egg.png'].texture);

    // Load Game window
    app.stage.addChild(bgGame);
    bgGame.width = window.innerWidth;
    bgGame.height = window.innerHeight;

    // Load Cat Main
    app.stage.addChild(catMain);
    catMain.width = catWH;
    catMain.height = catWH;
    catMain.anchor.set(0.5, 0.5);
    catMain.position.set(window.innerWidth / 2, window.innerHeight - catMain.height / 2 + 1);

    // Move cat
    // Touch
    document.addEventListener('touchstart', checkPosition => {
        if (checkPosition.touches[0].clientX < window.innerWidth / 2) {
            catMain.x -= 30;
            console.log("Left",);
        } else {
            catMain.x += 30;
            console.log("Right");
        }
    });

    // Keyboard
    document.addEventListener('keydown', event => {
        if (event.keyCode == 37) {
            catMain.x -= 30;
        }
        if (event.keyCode == 39) {
            catMain.x += 30;
        }
    });

    // Eggs
    for (var i = 0; i < eggs.length; i++) {
        app.stage.addChild(egg);
        egg.anchor.set(0.5, 0.5);
        egg.width = 50;
        egg.height = 65;
        egg.position.set(eggs[i].x, eggs[i].y)
        eggs[i].y += grav;
        console.log("Spawn")

        // Egg spawner
        if (eggs[i].y == innerHeight - (catWH * 2)) {
            eggs.push({
                x : Math.floor(Math.random() * (window.innerWidth - 50)),
                y : 0
            });
            console.log(eggs[i].x);
        }

        // Egg speed
        if (score / 10 == 0 && score != 0) {
            grav++;
        }
    }
 
}
