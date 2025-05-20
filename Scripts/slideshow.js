// This script controls the slideshow functionality
let currentSlide = 0;
let autoSlideInterval = null;
let slideIntervalTime = 5000;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);

    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, slideIntervalTime); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
}

function resetAutoSlide() {
    if (autoSlideInterval) {
        stopAutoSlide();
        startAutoSlide();
    }
}

// Add event listeners to the buttons
document.addEventListener('DOMContentLoaded', () => {
    const autoSlideToggle = document.getElementById('autoplay-toggle');
    const customIntervalInput = document.getElementById('custom-interval');
    const setIntervalButton = document.getElementById('set-interval');
    autoSlideToggle.addEventListener('change', () => {
        if (autoSlideToggle.checked) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }
    });

    setIntervalButton.addEventListener('click', (e) => {
        e.preventDefault();  // Prevent form submission
        const customInterval = parseInt(customIntervalInput.value, 10);
        if (customInterval >= 1 && customInterval <= 30) {
            slideIntervalTime = customInterval * 1000; // Convert to milliseconds
            resetAutoSlide(); // Restart the auto slide with the new interval
        } else {
            alert('Please enter a value between 1 and 30 seconds.');
        }
    });


    // Initialize the slideshow
    showSlide(currentSlide);
    if (autoSlideToggle.checked) {
        startAutoSlide();
    }
});