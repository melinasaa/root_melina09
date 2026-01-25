var messageArray = ["À L’AIDE ! <br> Je naviguais sur le web ce matin lorsqu’un message est apparu devant moi : « Erreur 404 : Fichier introuvable». Avant même que j’aie le temps de paniquer, une décharge électrique a frappé mon écran et, en un instant, je ne regardais plus mon desktop. J’ÉTAIS À L’INTÉRIEUR DE MON ORDINATEUR!! <br> À présent, je suis coincé, le système est infecté par un virus, et la seule façon de sortir est de le réparer. Trois fichiers corrompus sont à l’origine du chaos et je pense que si je peux les restaurer, j’aurai peut - être une chance de m’échapper. Le temps presse et si je ne répare pas rapidement les fichiers, je serai piégé ici pour toujours! <br><br> Votre mission : <br> Trouver les fichiers corrompus. <br> Survivre au cauchemar numérique. <br> Restaurer le système avant qu’il ne soit trop tard. <br><br> Appuyez sur Commencer…"];
var textPosition = 0;
var speed = 30;

// typewriter intro effect
typewriter = () => {
    document.querySelector("#message").
        innerHTML = messageArray[0].substring(0,
            textPosition) + "<span>\u25ae</span>";

    if (textPosition++ != messageArray[0].length)
        setTimeout(typewriter, speed);
}

window.addEventListener("load", typewriter);

// button apperance
function showMessage() {
    const messageElement = document.getElementById('button');
    messageElement.classList.remove('hidden');
    messageElement.classList.add('visible');
}

setTimeout(showMessage, 5000);