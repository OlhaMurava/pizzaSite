// Get all pizza image elements
const pizzaImages = document.querySelectorAll('.pizza-images img');

// Get the h1 element that will change
const pizzaTitle = document.querySelector('.text-content h1');

// Get the line element that will move
const line = document.getElementById('line');

// Get the large pizza image that will change
const pizzaGroup = document.querySelector('.pizza-group img');


// Get the screen width
const screenWidth = window.innerWidth;

// Function to set the line position for the first pizza on load
function setDefaultLinePosition() {
    const firstPizza = pizzaImages[0]; 
    const pizzaRect = firstPizza.getBoundingClientRect();
    const pizzaImagesContainerRect = pizzaImages[0].parentElement.getBoundingClientRect();

    const gapAdjustment =
        screenWidth > 1200
            ? parseInt(getComputedStyle(firstPizza.parentElement).gap || 0, 10) / 2
            : 0;

    const lineCenterPosition =
        pizzaRect.left - pizzaImagesContainerRect.left + pizzaRect.width / 2 + gapAdjustment;

    line.style.transform = `translateX(${lineCenterPosition - line.offsetWidth / 2}px)`;
}

// Add click event listeners to each pizza image
pizzaImages.forEach(pizza => {
    pizza.addEventListener('click', () => {
        const pizzaName = pizza.getAttribute('data-title');
        pizzaTitle.textContent = pizzaName;

        const pizzaRect = pizza.getBoundingClientRect();
        const pizzaImagesContainerRect = pizza.parentElement.getBoundingClientRect();

        const gapAdjustment =
            screenWidth > 1200
                ? parseInt(getComputedStyle(pizza.parentElement).gap || 0, 10) / 2
                : 0;

        const lineCenterPosition =
            pizzaRect.left - pizzaImagesContainerRect.left + pizzaRect.width / 2 + gapAdjustment;

        line.style.transition = 'transform 0.3s ease';
        line.style.transform = `translateX(${lineCenterPosition - line.offsetWidth / 2}px)`;

        // Change the large pizza image
        const newPizzaImg = pizza.getAttribute('data-img');
        pizzaGroup.src = newPizzaImg;

        // Reset and reapply animation
        setTimeout(() => {
            pizzaGroup.style.animation = 'none'; // Reset animation
            pizzaGroup.offsetHeight; // Trigger reflow to reset animation
            pizzaGroup.style.animation = 'slideIn 0.3s ease'; // Reapply animation
        }, 100);
    });
});

// Set the default line position on page load
window.addEventListener('load', setDefaultLinePosition);
// Визначає ширину екрана і враховує відступи (gap) для великих екранів.
// Розраховує точну позицію центру обраного зображення піци.
// Переміщує лінію під обране зображення, плавно зміщуючи її до розрахованої точки.

