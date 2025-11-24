
// Créer le canevas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

//Charger les sprites
// Image d'arrière-plan
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true;
};

// Estampe perdant
var loseReady = false;
var loseImage = new Image();
loseImage.src = "images/lose.png";
loseImage.onload = function () {
    loseReady = true;
};


// Estampe gagnant
var winReady = false;
var winImage = new Image();
winImage.src = "images/win.png";
winImage.onload = function () {
    winReady = true;
};

// Image du joueur
var playerReady = false;
var playerImageUp = new Image();
var playerImageDown = new Image();
var playerImageLeft = new Image();
var playerImageRight = new Image();
playerImageUp.src = "images/spaceship_up.png";
playerImageDown.src = "images/spaceship_down.png";
playerImageLeft.src = "images/spaceship_left.png";
playerImageRight.src = "images/spaceship_right.png";
playerImageUp.onload = function () {
    playerReady = true;
};

let currentPlayerImage = playerImageUp;


// Image des goodies
var goodyReady = false;
var goodyAImage = new Image();
goodyAImage.src = "images/blue.png";
goodyAImage.onload = function () {
    goodyReady = true;
};

var goodyReady = false;
var goodyBImage = new Image();
goodyBImage.src = "images/red.png";
goodyBImage.onload = function () {
    goodyReady = true;
};

var goodyReady = false;
var goodyCImage = new Image();
goodyCImage.src = "images/green.png";
goodyCImage.onload = function () {
    goodyReady = true;
};

var goodyReady = false;
var goodyDImage = new Image();
goodyDImage.src = "images/purple.png";
goodyDImage.onload = function () {
    goodyReady = true;
};

var goodyReady = false;
var goodyEImage = new Image();
goodyEImage.src = "images/yellow.png";
goodyEImage.onload = function () {
    goodyReady = true;
};

var goodiesCollected = 0;

//Image des baddies
var baddiesReady = false
var baddiesImage = new Image();
baddiesImage.src = "images/baddie.png";
baddiesImage.onload = function () {
    baddiesReady = true;
};

var imagesArray = [
    goodyAImage, goodyBImage, goodyCImage, goodyDImage, goodyEImage
];

var gameOver = false;
var playerWon = false;

// Créer des objets de jeu globaux 
var player = {
    speed: 5, // mouvement en pixels par tick 
    width: 150,
    height: 150
};

var goodies = [ // ceci est un tableau (array)
    { width: 32, height: 32 }, // un goody
    { width: 32, height: 32 }, // deux goodies
    { width: 32, height: 32 }  // trois goodies
];

var baddies = [ // ceci est un tableau (array)
    { width: 32, height: 32 }, // un baddy
    { width: 32, height: 32 }, // deux baddies
    { width: 32, height: 32 }  // trois baddies
];

// Variables de vitesse
var vX = 0;
var vY = 0;

// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 38: // UP
            if (vY >= 0) { // only change if not already moving up
                vX = 0;
                vY = -player.speed;
                currentPlayerImage = playerImageUp;
            }
            break;
        case 40: // DOWN
            if (vY <= 0) {
                vX = 0;
                vY = player.speed;
                currentPlayerImage = playerImageDown;
            }
            break;
        case 37: // LEFT
            if (vX >= 0) {
                vX = -player.speed;
                vY = 0;
                currentPlayerImage = playerImageLeft;
            }
            break;
        case 39: // RIGHT
            if (vX <= 0) {
                vX = player.speed;
                vY = 0;
                currentPlayerImage = playerImageRight;
            }
            break;
        case 32: // SPACE = STOP
            vX = 0;
            vY = 0;
            break;
    }
}, false);


// Gérer les commandes tactiles
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // HAUT
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // BAS
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // GAUCHE
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //DROIT
        vX = player.speed;
        vY = 0;
    }
    else { // ARRÊT S’arrête si vous touchez ailleurs
        vX = 0;
        vY = 0;
    }
});

//Définir l'état initial
var init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2;
    player.y = (canvas.height - player.height) / 2;

    //Placez des goodies à des endroits aléatoires 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = 0;
        goodies[i].img = Math.floor(Math.random() * imagesArray.length);
    }

    //Placez des baddies à des endroits aléatoires 
    for (var i in baddies) {
        baddies[i].x = (Math.random() * (canvas.width - baddies[i].width));
        baddies[i].y = 0;
    }
};

// La boucle de jeu principale
var main = function () {
    if (gameOver) {
        // Darken the screen
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)"; // last number = opacity (0.0–1.0)
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Show lose image
        if (loseReady) {
            ctx.drawImage(
                loseImage,
                (canvas.width - loseImage.width) / 2,
                (canvas.height - loseImage.height) / 2
            );
        }
        return; // stop the rest of the game loop from running
    }

    else if (checkWin()) {
        //GAGNANT Afficher le cadre
        if (winReady) {
            ctx.drawImage(winImage,
                (canvas.width - winImage.width) / 2,
                (canvas.height - winImage.height) / 2);
        }
    }

    else {
        // Pas encore gagné, jouer le jeu
        // déplacer le joueur
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

        if (Math.random() > 0.98) spawngoodies();
        if (Math.random() > 0.996) spawnbaddies();

        for (var i in goodies) {
            goodies[i].y++;
            if (checkCollision(player, goodies[i])) {
                goodiesCollected++; // add one to the counter
                goodies.splice(i, 1);
            }
        }

        for (var i in baddies) {
            baddies[i].y++;
            if (checkCollision(player, baddies[i])) {
                gameOver = true;
                playerWon = false;
            }
        }

        render();
        window.requestAnimationFrame(main);
    }
};

// Dessinez le tout
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (playerReady) {
        ctx.drawImage(currentPlayerImage, player.x, player.y);
    }

    if (goodyReady) {
        for (var i in goodies) {
            ctx.drawImage(imagesArray[goodies[i].img], goodies[i].x, goodies[i].y);
        }
    }
    if (baddiesReady) {
        for (var i in baddies) {
            ctx.drawImage(baddiesImage, baddies[i].x, baddies[i].y);
        }
    }

    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillText("Planètes visités : " + goodiesCollected, 32, 52);
    ctx.font = "bold 28px Impact";
};

//Fonction générique pour vérifier les collisions 
// var checkCollision = function (obj1, obj2) {
//     if (obj1.x < (obj2.x + obj2.width) &&
//         (obj1.x + obj1.width) > obj2.x &&
//         obj1.y < (obj2.y + obj2.height) &&
//         (obj1.y + obj1.height) > obj2.y
//     ) {
//         return true;
//     }
// };

var checkCollision = function (obj1, obj2) {
    const r1 = obj1.width / 2;
    const r2 = obj2.width / 2;
    const dx = (obj1.x + r1) - (obj2.x + r2);
    const dy = (obj1.y + r1) - (obj2.y + r2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (r1 + r2) * 1; // tweak 0.8 for precision
};


//Vérifiez si nous avons gagné
var checkWin = function () {
    if (goodies.length > 0) {
        return false;
    } else {
        return true;
    }
};

let spawngoodies = function () {
    //push puts items into array
    goodies.push({
        width: 32,
        height: 32,
        // places at random position
        x: (Math.random() * (canvas.width - 32)),
        y: 0,
        img: Math.floor(Math.random() * imagesArray.length)
    });
};

let spawnbaddies = function () {
    //push puts items into array
    baddies.push({
        width: 32,
        height: 32,
        // places at random position
        x: (Math.random() * (canvas.width - 32)),
        y: 0
    });
};

init();

//Démarrer le jeu
window.requestAnimationFrame(main);
