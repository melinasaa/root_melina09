console.log('spa.js lodaded')

let car = document.querySelector('#move')

car.addEventListener('click', function (event) {
    //console.log(this.id);
    this.classList.toggle('move-down')
})