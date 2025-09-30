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
var playerImage = new Image();
playerImage.src = "images/palyer.png";
playerImage.onload = function () {
    playerReady = true;
};

// Goodies
var goodyReady = false;
var goodyImage = new Image();
goodyImage.src = "images/goody.png";
goodyImage.onload = function () {
    goodyReady = true;
};


// La boucle
var main = function () {
    render();
    window.requestAnimationFrame(main);
}

// Dessiner
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    if (playerReady) {
        ctx.drawImage(playerImage, 100, 100);
    }

    // Label
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillText("Game on!", 32, 32);
};

// Demarrer 
window.requestAnimationFrame(main);