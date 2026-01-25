const wordText = document.querySelector(".word"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word")

let correctWord;

const initGame = () => {
    let randomObj = words[Math.floor(Math.random() * words.length)]
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    correctWord = randomObj.word.toLocaleLowerCase();
    inputField.value = "";
    inputField.setAttribute("Maxlength", correctWord)
    console.log(randomObj);
}
initGame();

const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert("");

    if (userWord !== correctWord)
        return alert(`Oops! ${userWord} n'est pas le bon mot`);

    alert(`Bravo! ${userWord.toUpperCase()} est le bon mot`);
    showButtonR();
}

function showButtonR() {
    const messageElement = document.getElementById('button-r');
    messageElement.classList.remove('hidden');
    messageElement.classList.add('visible');
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);