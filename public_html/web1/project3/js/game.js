console.log(" 🪿 QUACK 🪿 ")

const stage = document.querySelector("body");
const sombreroDuck = document.getElementById("duck");

// Sounds
const duckSound = new Audio("sounds/cartoon.mp3");

sombreroDuck.onclick = function() {
    this.classList.toggle("move"); 
    duckSound.play();
}

stage.addEventListener("click", function(event) {
    console.log(event.clientX + " : " + event.clientY)
    /*sombreroDuck.style.transform = "translateX("+ event.clientX +"px) translateY("+ event.clientY +"px)"*/
    sombreroDuck.style.transform = `translateX(${event.clientX-100}px) translateY(${event.clientY-92}px)`;

})

// Keyboard input
document.onkeydown = checkKeys;

function checkKeys(event) {
    
    var style = window.getComputedStyle(sombreroDuck);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;    
    var coords;

    //left arrow
    if(event.keyCode == "37") {
        coords = `translateX(${xVal-200}px) translateY(${yVal}px)`;
        sombreroDuck.style.transform = coords;
    }
    //right arrow
    if(event.keyCode == "39") {
        coords = `translateX(${xVal+200}px) translateY(${yVal}px)`;
        sombreroDuck.style.transform = coords;
    }
    //up arrow
    if(event.keyCode == "38") {
        coords = `translateX(${xVal}px) translateY(${yVal-200}px)`;
        sombreroDuck.style.transform = coords;
    }
    //down arrow
    if(event.keyCode == "40") {
        coords = `translateX(${xVal}px) translateY(${yVal+200}px)`;
        sombreroDuck.style.transform = coords;
    }

}

let myObject;
function addMyObject() {
       
    /* Custom object */
    myObject = document.createElement("img");
    myObject.src = "img/grapes.svg";
    myObject.style.width = "100px"
    stage.append(myObject);

    let w = window.innerWidth -100;
    let randoX = Math.floor((Math.random() * w) + 1);
    let h = window.innerHeight -58;
    let randoY = Math.floor((Math.random() * h) + 1);

    myObject.style.transform = `translateX(${randoX}px) translateY(${randoY}px)`;

    setTimeout(() => { 
        myObject.remove();
        addMyObject() }, 4000);
}
addMyObject();

/* Game update loop */

let characterCoordX;
let characterCoordY;
let objectCoordX;
let objectCoordY;

setInterval(() => {
    // console.log("update loop is running")
    characterCoordX = sombreroDuck.getBoundingClientRect().x;
    characterCoordY = sombreroDuck.getBoundingClientRect().y;

    //optional: move character coordinates to its center
    characterCoordX += 350; // half the width of the character
    characterCoordY += 175; // half the height of the character
    objectCoordX = myObject.getBoundingClientRect().x;
    objectCoordY = myObject.getBoundingClientRect().y;

    if((characterCoordX >= objectCoordX && characterCoordX <= objectCoordX + myObject.width)
&& (characterCoordY >= objectCoordY && characterCoordY <= objectCoordY + myObject.height)) {
        console.log("Hit!");
        objectAction();
    }
}, 50);

const bingSound = new Audio("sounds/gulp.mp3");

function objectAction() {
    sombreroDuck.classList.add("happy");
    setTimeout(() => {
        sombreroDuck.classList.remove("happy");
    }, 1000);
    myObject.remove();
    bingSound.play();

}
