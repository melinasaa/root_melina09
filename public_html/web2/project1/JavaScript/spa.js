console.log('spa.js lodaded')

let cards = document.querySelectorAll('#move')

for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function (event) {
        //console.log(this.id);
        this.classList.toggle('move-down')
    })
}


