
let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let paneauMessage = document.querySelector("#message");
let panneauMessageGaganant = document.querySelector("#message img")
let winnerS = document.getElementById("winnerS");
let winnerA = document.getElementById("winnerA");
let tie = document.getElementById("tie");
let winReplayBtnA = document.getElementById("winReplayA");
let winReplayBtnS = document.getElementById("winReplayS");
let winReplayBtnN = document.getElementById("winReplayN");
let winner = false;

let joueurX = true;
let gagnant = '';
const patrons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

for (let boite of cases) {
    boite.active = true;
    boite.addEventListener("click", function () {
        if (boite.active) {
            if (joueurX) {
                boite.style.backgroundImage = "url('img/a.svg')";
                // boite.innerText = "X";
                joueurX = false;
            }
            else {
                boite.style.backgroundImage = "url('img/s.svg')";
                // boite.innerText = "O";
                joueurX = true;
            }
        }
        boite.active = false;
        valide();
    });
}


const valide = function () {
    let allUsed = Array.from(cases).every(boite => !boite.active);
    if (allUsed && !winner) {
        console.log("C'est une partie nulle!");
        tie.classList.add("active");
    }
    for (let patron of patrons) {
        let val1 = cases[patron[0]].style.backgroundImage.slice(5, 14);
        let val2 = cases[patron[1]].style.backgroundImage.slice(5, 14);
        let val3 = cases[patron[2]].style.backgroundImage.slice(5, 14);

        if (val1 &&
            val1 === val2 &&
            val1 === val3) {

            winner = true;
            console.log(`Le gagnant est ${val1}`);

            if (val1 == "img/s.svg") {
                winnerS.classList.add("active");
            }
            else {
                winnerA.classList.add("active");
            }

            for (let boite of cases) {
                boite.active = false;
            }

        }

    }
}

replayBtn.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true;
    }
});

winReplayBtnA.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true;
    }
    winnerA.classList.remove("active");
});

winReplayBtnS.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true;
    }
    winnerS.classList.remove("active");
});

winReplayBtnN.addEventListener("click", function () {
    for (let boite of cases) {
        boite.active = true;
        boite.style.backgroundImage = "";
        joueurX = true;
    }
    tie.classList.remove("active");
});