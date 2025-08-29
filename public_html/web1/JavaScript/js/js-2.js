console.log("JS 2 in action")

// Step 1 - Selecting the element
const myShape = document.getElementById("circle");

// Step 2 - adding a click event
// myShape.addEventListener("click", function() {
myShape.addEventListener("click", () => {
    // myShape.style.borderColor = "blue transparent";
    myShape.classList.toggle("change-me");
})
