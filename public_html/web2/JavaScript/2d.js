console.log('2d.js lodaded')

let car = document.querySelector('#car')

car.addEventListener('click', function (event) {
    //console.log(this.id);
    this.classList.toggle('move-right')
})
