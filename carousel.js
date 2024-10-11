const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
let slideIndex = 0;

function showSlides() {
  let translateX = -slideIndex * 100 + '%';
  carousel.style.transform = 'translateX(' + translateX + ')';

  slideIndex++;
  if (slideIndex >= slides.length) { slideIndex = 0; }

  setTimeout(showSlides, 4000); // Change image every 4 seconds
}

showSlides(); // Start the carousel