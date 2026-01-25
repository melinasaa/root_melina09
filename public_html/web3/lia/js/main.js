// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
canvas.style.position = "relative";
canvas.style.zIndex = "1";
document.querySelector("#gameBox").appendChild(canvas);

//Load sprites
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true;
};
// Win frame image
var winReady = false;
var winImage = new Image();
winImage.src = "images/win.png";
winImage.onload = function () {
    winReady = true;
};
// Player image
var playerReady = false;
var playerImage = new Image();
playerImage.src = "images/player.png";
playerImage.onload = function () {
    playerReady = true;
};
// Goodies image
var goodyReady = false;
var goodyImage = new Image();
goodyImage.src = "images/folder.png";
goodyImage.onload = function () {
    goodyReady = true;
};

//Pop-up
var popupReady = false;
var popupImage = new Image();
popupImage.src = "images/popup.png";
popupImage.onload = function () {
    popupReady = true;
};

// Lose
var loseReady = false;
var loseImage = new Image();
loseImage.src = "images/lose.png";
loseImage.onload = function () {
    loseReady = true;
};

// Last folder
var finalFolderReady = false;
var finalFolderImage = new Image();
finalFolderImage.src = "images/final_folder.png";
finalFolderImage.onload = function () {
    finalFolderReady = true;
};


// Create global game objects 
var player = {
    speed: 5, // movement in pixels per second 
    width: 52,
    height: 75
};
var goodies = [ // this is an array
    { width: 32, height: 32 },
    { width: 32, height: 32 },
    { width: 32, height: 32 }
];

var finalFolder = null;

// LOAD PROGRESS
let savedGoodies = sessionStorage.getItem("goodiesLeft");

if (savedGoodies !== null) {
    let count = parseInt(savedGoodies);

    // recreate goodies array with remaining amount
    goodies = [];
    for (let i = 0; i < count; i++) {
        goodies.push({ width: 32, height: 32 });
    }
}


// Velocity variables
var vX = 0;
var vY = 0;

var popupActive = false;
var gameRunning = true;
var gameLost = false;
var finalFolderSpawned = false;



// Handle keyboard controls
addEventListener("keydown", function (e) {
    //Keystrokes
    if (e.keyCode == 38) { // UP
        vX = 0;
        vY = -player.speed;
    }
    if (e.keyCode == 40) { // DOWN
        vX = 0;
        vY = player.speed;
    }
    if (e.keyCode == 37) { // LEFT
        vX = -player.speed;
        vY = 0;
    }
    if (e.keyCode == 39) { // RIGHT
        vX = player.speed;
        vY = 0;
    }
    if (e.keyCode == 32) { // STOP spacebar
        vX = 0;
        vY = 0;
    }
}, false);

// Handle touch controls
addEventListener("touchstart", function (e) {
    if (e.target.id == "uArrow") { // UP
        vX = 0;
        vY = -player.speed;
    }
    else if (e.target.id == "dArrow") { // DOWN
        vX = 0;
        vY = player.speed;
    }
    else if (e.target.id == "lArrow") { // LEFT
        vX = -player.speed;
        vY = 0;
    }
    else if (e.target.id == "rArrow") { //RIGHT
        vX = player.speed;
        vY = 0;
    }
    else { // STOP This stops if you touch anywhere else
        vX = 0;
        vY = 0;
    }
});

//Timer 

// Timer using real-time end timestamp
const timerDisplay = document.getElementById("timer");
const TIMER_DURATION = 60; // seconds
const STORAGE_KEY = "game_timer_end";

// Get stored end timestamp
let endTime = localStorage.getItem(STORAGE_KEY);

if (!endTime) {
    // First time: set end timestamp
    endTime = Date.now() + TIMER_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, endTime);
} else {
    endTime = Number(endTime);
}

function updateTimer() {
    if (!gameRunning) return;

    const now = Date.now();
    let timeLeft = Math.max(0, Math.ceil((endTime - now) / 1000));

    timerDisplay.textContent = `TEMPS : ${timeLeft}s`;

    if (timeLeft <= 0) {
        gameRunning = false;
        gameLost = true;
        vX = 0;
        vY = 0;
        localStorage.removeItem(STORAGE_KEY); // clear timer
        showMessage();
    }
}

// Run every second
setInterval(updateTimer, 1000);
// Run immediately
updateTimer();


//Set initial state
var init = function () {
    //Put the player in the centre
    player.x = (canvas.width - player.width) / 2;
    player.y = (canvas.height - player.height) / 2;
    //Place goodies at random locations 
    for (var i in goodies) {
        goodies[i].x = (Math.random() *
            (canvas.width - goodies[i].width));
        goodies[i].y = (Math.random() *
            (canvas.height - goodies[i].height));
    }
};


// The main game loop
var main = function () {

    // LOSS
    if (gameLost) {
        render();
        sessionStorage.removeItem("goodiesLeft");
        sessionStorage.removeItem("timeLeft");

        if (loseReady) {
            var scale = 0.4;

            var w = loseImage.width * scale;
            var h = loseImage.height * scale;

            ctx.drawImage(
                loseImage,
                (canvas.width - w) / 2,
                (canvas.height - h) / 2,
                w,
                h
            );
        }
        showButton();
        hidePopup();
        return;
    }

    if (checkWin()) {
        sessionStorage.removeItem("goodiesLeft");
        sessionStorage.removeItem("timeLeft");

        hidePopup();
        //WIN display win frame
        if (winReady) {
            var scale = 0.4;

            var w = winImage.width * scale;
            var h = winImage.height * scale;

            ctx.drawImage(
                winImage,
                (canvas.width - w) / 2,
                (canvas.height - h) / 2,
                w,
                h
            );
        }
        return;
    }

    else {
        //Not yet won, play game
        //move player
        if (player.x > 0 &&
            player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
        }
        if (player.y > 0 &&
            player.y < canvas.height - player.height) {
            player.y += vY
        }
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }
        //check collisions
        // Check collisions for normal goodies
        for (var i in goodies) {
            if (checkCollision(player, goodies[i])) {
                popupActive = true;
                goodies.splice(i, 1);
                vX = 0;
                vY = 0;

                // Spawn final folder when all three normal folders are collected
                if (goodies.length === 0 && !finalFolder) {
                    finalFolder = {
                        width: 32,
                        height: 32,
                        x: Math.random() * (canvas.width - 32),
                        y: Math.random() * (canvas.height - 32)
                    };
                }

                // Update sessionStorage for remaining goodies
                sessionStorage.setItem("goodiesLeft", goodies.length);

                showButtonS();
                break; // exit loop since goodies array changed
            }
        }


        if (finalFolder && checkCollision(player, finalFolder)) {
            finalFolder = null;   // remove final folder
            popupActive = false;
            vX = 0;
            vY = 0;

        }

        render();
        window.requestAnimationFrame(main);
    }
};
// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    }
    if (playerReady) {
        ctx.drawImage(playerImage, player.x, player.y);
    }
    if (goodyReady) {
        for (var i in goodies) {
            ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
        }
    }
    if (popupReady && popupActive) {
        ctx.drawImage(
            popupImage,

            (canvas.width - popupImage.width) / 2,
            (canvas.height - popupImage.height) / 2
        );
    }
    // Draw the final folder if it exists
    if (finalFolder && finalFolderReady) {
        ctx.drawImage(finalFolderImage, finalFolder.x, finalFolder.y);
    }

};

//Generic function to check for collisions 
var checkCollision = function (obj1, obj2) {
    if (obj1.x < (obj2.x + obj2.width) &&
        (obj1.x + obj1.width) > obj2.x &&
        obj1.y < (obj2.y + obj2.height) &&
        (obj1.y + obj1.height) > obj2.y
    ) {
        return true;
    }
};

//Check if we have won
var checkWin = function () {
    return !finalFolder && goodies.length === 0;
};


// button apperance
function showButton() {
    const messageElement = document.getElementById('button');
    messageElement.classList.remove('hidden');
    messageElement.classList.add('visible');
}

// button apperance folder
function showButtonS() {
    const messageElement = document.getElementById('button-s');
    messageElement.classList.remove('hidden-s');
    messageElement.classList.add('visible-s');
}

function hidePopup() {
    popupActive = false;

    const btnS = document.getElementById('button-s');
    btnS.classList.remove('visible-s');
    btnS.classList.add('hidden-s');
}



//Start the gameplay
init();
window.requestAnimationFrame(main);


