console.log('spa.js lodaded')

let slide = document.querySelector('#slide')

slide.addEventListener('click', function (event) {
    //console.log(this.id);
    this.classList.toggle('left-right')
})


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}