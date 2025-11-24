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

// Joueur
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

// Goodies
var goodyAReady = false;
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
var imagesArray = [goodyAImage, goodyBImage, goodyCImage, goodyDImage, goodyEImage]

//Image des baddies
var baddiesReady = false
var baddiesImage = new Image();
baddiesImage.src = "images/baddie.png";
baddiesImage.onload = function () {
    baddiesReady = true;
};


// Objets de jeux globaux
var player = {
    speed: 5,
    width: 32,
    height: 32
};

var goodies = [
    { width: 32, height: 32 }, // 1 goody
    { width: 32, height: 32 }, // 2 goodies
    { width: 32, height: 32 }  // 3 goodies
];

var baddies = [ // ceci est un tableau (array)
    { width: 32, height: 32 }, // 1 baddy
    { width: 32, height: 32 }, // 2 baddies
    { width: 32, height: 32 }  // 3 baddies
];

// Variables de vitesse
var vX = 0;
var vY = 0;

// Commandes du clavier 
addEventListener("keydown", function (e) {
    // Touches
    if (e.keyCode == 38) { // Haut
        vX = 0;
        vY = -player.speed;
    }
    if (e.keyCode == 40) { // Bas
        vX = 0;
        vY = player.speed;
    }
    if (e.keyCode == 37) { // Gauche
        vX = -player.speed;
        vY = 0;
    }
    if (e.keyCode == 39) { // Droite
        vX = player.speed;
        vY = 0;
    }
}, false);

// Commendes tactiles 
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // Haut
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // Bas
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // Gauche
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { // Droite
        vX = player.speed;
        vY = 0;
    }
    else { // ARRET S'arrete si vous touchez ailleurs
        vX = 0;
        vY = 0;
    }
});

// Verifier si gagnant
var checkWin = function () {
    if (goodies.length > 0) {
        return false;
    } else {
        return true;
    }
};

// Etat initial
var init = function () {
    // Joueur au centre
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

// La boucle de jeu principale
var main = function () {
    if (checkWin()) {
        //GAGNANT Afficher le cadre
        if (winReady) {
            ctx.drawImage(winImage, (canvas.width - winImage.width) / 2,
                (canvas.height - winImage.height) / 2);
        }
    }
    else {
        //Pas encore gagné, jouer le jeu
        //déplacer le joueur
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
        }
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }
    }

    //spawn tout
    if (Math.random() > 0.992) spawngoodies();
    if (Math.random() > 0.996) spawnbaddies();

    //decplacer goodies
    for (var i = goodies.length - 1; i >= 0; i--) {
        goodies[i].y += 2;
        if (checkCollision(player, goodies[i])) {
            score += 1;
            goodies.splice(i, 1);
        }
    }

    //deplacer baddies 
    for (var i = baddies.length - 1; i >= 0; i--) {
        baddies[i].y += 3;
        if (checkCollision(player, baddies[i])) {
            gameOver = true;
        }
    }

    render();
    window.requestAnimationFrame(main);
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
    //dessiner goodies
    for (var i in goodies) {
        ctx.drawImage(goodies[1].img, goodies[i].x, goodies[i].y);
    }
    //dessiner baddies
    if (baddiesReady) {
        for (var i in baddies) {
            ctx.drawImage(baddiesImage, baddies[i].x, baddies[i].y);
        }
    }

    // Label
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "20px Impact"
    ctx.fillText("score: " + score, 32, 32);

    //game over



};

//Vérifiez si nous avons gagné
var checkWin = function () {
    if (goodies.length > 0) {
        return false;
    } else {
        return true;
    }
};

// Demarrer 
window.requestAnimationFrame(main);

init();