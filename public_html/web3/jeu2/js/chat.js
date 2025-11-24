// Le Canevas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

// Background
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true;
};

// Gagnant
var winReady = false;
var winImage = new Image();
winImage.src = "images/win.png";
winImage.onload = function () {
    winReady = true;
};

// Joueur (directional)
var playerReady = false;
var playerImageUp = new Image();
var playerImageDown = new Image();
var playerImageLeft = new Image();
var playerImageRight = new Image();

playerImageUp.src = "images/spaceship_up.png";
playerImageDown.src = "images/spaceship_down.png";
playerImageLeft.src = "images/spaceship_left.png";
playerImageRight.src = "images/spaceship_right.png";

playerImageUp.onload = playerImageDown.onload = playerImageLeft.onload = playerImageRight.onload = function () {
    playerReady = true;
};

var currentPlayerImage = playerImageUp;

// Goodies (planets)
var goodyAImage = new Image();
var goodyBImage = new Image();
var goodyCImage = new Image();
var goodyDImage = new Image();
var goodyEImage = new Image();

goodyAImage.src = "images/yellow.png";
goodyBImage.src = "images/red.png";
goodyCImage.src = "images/blue.png";
goodyDImage.src = "images/green.png";
goodyEImage.src = "images/purple.png";

var imagesArray = [goodyAImage, goodyBImage, goodyCImage, goodyDImage, goodyEImage];

// Astéroïdes (baddies)
var baddiesReady = false;
var baddiesImage = new Image();
baddiesImage.src = "images/baddie.png";
baddiesImage.onload = function () {
    baddiesReady = true;
};

// Objets globaux
var player = {
    speed: 5,
    width: 48,
    height: 48
};

var goodies = [];
var baddies = [];
var vX = 0;
var vY = 0;
var score = 0;
var gameOver = false;

// Commandes du clavier
addEventListener("keydown", function (e) {
    if (e.keyCode == 38) { // Haut
        vX = 0;
        vY = -player.speed;
        currentPlayerImage = playerImageUp;
    }
    if (e.keyCode == 40) { // Bas
        vX = 0;
        vY = player.speed;
        currentPlayerImage = playerImageDown;
    }
    if (e.keyCode == 37) { // Gauche
        vX = -player.speed;
        vY = 0;
        currentPlayerImage = playerImageLeft;
    }
    if (e.keyCode == 39) { // Droite
        vX = player.speed;
        vY = 0;
        currentPlayerImage = playerImageRight;
    }
}, false);

// Initialisation
var init = function () {
    player.x = (canvas.width - player.width) / 2;
    player.y = (canvas.height - player.height) / 2;
};

// Vérifie collision
var checkCollision = function (obj1, obj2) {
    return (
        obj1.x < (obj2.x + obj2.width) &&
        (obj1.x + obj1.width) > obj2.x &&
        obj1.y < (obj2.y + obj2.height) &&
        (obj1.y + obj1.height) > obj2.y
    );
};

// Génère des planètes
let spawngoodies = function () {
    goodies.push({
        width: 32,
        height: 32,
        x: (Math.random() * (canvas.width - 32)),
        y: 0,
        img: imagesArray[Math.floor(Math.random() * imagesArray.length)]
    });
};

// Génère des astéroïdes
let spawnbaddies = function () {
    baddies.push({
        width: 32,
        height: 32,
        x: (Math.random() * (canvas.width - 32)),
        y: 0
    });
};

// Dessiner
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (playerReady) {
        ctx.drawImage(currentPlayerImage, player.x, player.y);
    }

    // Dessiner goodies
    for (var i in goodies) {
        ctx.drawImage(goodies[i].img, goodies[i].x, goodies[i].y);
    }

    // Dessiner baddies
    if (baddiesReady) {
        for (var i in baddies) {
            ctx.drawImage(baddiesImage, baddies[i].x, baddies[i].y);
        }
    }

    // Afficher score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 32, 32);

    // Si Game Over
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "60px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2 - 180, canvas.height / 2);
        ctx.font = "30px Arial";
        ctx.fillText("Appuyez sur R pour recommencer", canvas.width / 2 - 200, canvas.height / 2 + 50);
    }
};

// Boucle principale
var main = function () {
    if (gameOver) {
        render();
        return;
    }

    // Déplacer joueur
    player.x += vX;
    player.y += vY;

    // Garder dans l’écran
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;

    // Apparitions
    if (Math.random() > 0.992) spawngoodies();
    if (Math.random() > 0.996) spawnbaddies();

    // Déplacer goodies
    for (var i = goodies.length - 1; i >= 0; i--) {
        goodies[i].y += 2;
        if (checkCollision(player, goodies[i])) {
            score += 10;
            goodies.splice(i, 1);
        }
    }

    // Déplacer baddies
    for (var i = baddies.length - 1; i >= 0; i--) {
        baddies[i].y += 3;
        if (checkCollision(player, baddies[i])) {
            gameOver = true;
        }
    }

    render();
    window.requestAnimationFrame(main);
};

// Recommencer avec "R"
addEventListener("keydown", function (e) {
    if (gameOver && e.keyCode === 82) {
        goodies = [];
        baddies = [];
        score = 0;
        gameOver = false;
        init();
        window.requestAnimationFrame(main);
    }
});

// Démarrer
init();
window.requestAnimationFrame(main);
