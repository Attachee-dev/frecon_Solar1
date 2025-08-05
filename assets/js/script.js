document.addEventListener('DOMContentLoaded', () => {
    // --- Image Slider Logic - Start ---

    // Get the main slider container for the images
    const sliderInner = document.getElementById('imageSliderInner');
    // Get all individual image elements within the slider
    const images = sliderInner.querySelectorAll('img');
    // Get the container where the navigation dots will be placed
    const dotsContainer = document.getElementById('sliderDotsContainer');

    let currentIndex = 0; // Tracks the currently active slide index
    let slideInterval; // Stores the interval ID for automatic sliding
    const slideDuration = 5000; // Time in milliseconds for each automatic slide (5 seconds)

    /**
     * Dynamically creates the pagination dots based on the number of images.
     */
    function createDots() {
        dotsContainer.innerHTML = ''; // Clear any existing dots to prevent duplicates
        images.forEach((_, index) => {
            const dot = document.createElement('div'); // Create a new div element for each dot
            dot.classList.add('dot'); // Add the 'dot' class for styling
            dot.dataset.index = index; // Store the index in a data attribute for easy reference
            dot.addEventListener('click', () => {
                showSlide(index); // When a dot is clicked, show the corresponding slide
                resetAutoSlide(); // Reset the automatic slider timer on user interaction
            });
            dotsContainer.appendChild(dot); // Add the dot to the dots container
        });
    }

    /**
     * Displays a specific slide by applying a CSS transform.
     * Updates the active state of the pagination dots.
     * @param {number} index The index of the slide to display.
     */
    function showSlide(index) {
        // Handle looping when reaching the end or beginning of slides
        if (index >= images.length) {
            currentIndex = 0; // Loop back to the first slide
        } else if (index < 0) {
            currentIndex = images.length - 1; // Loop back to the last slide
        } else {
            currentIndex = index; // Set the current index
        }

        // Apply CSS transform to the sliderInner to move images horizontally
        // Each image takes 100% width, so we shift by -100% * current index
        sliderInner.style.transform = `translateX(${-currentIndex * 100}%)`;

        // Update the visual state of the pagination dots
        updateDots();
    }

    /**
     * Updates the 'active' class on the pagination dots to highlight the current slide.
     */
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot'); // Get all dot elements
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active'); // Add 'active' class to the current dot
            } else {
                dot.classList.remove('active'); // Remove 'active' class from other dots
            }
        });
    }

    /**
     * Advances to the next slide in the sequence.
     */
    function nextSlide() {
        showSlide(currentIndex + 1); // Show the next slide
    }

    /**
     * Clears the current automatic slide interval and sets a new one.
     * This is called on initial load and after any user interaction.
     */
    function resetAutoSlide() {
        clearInterval(slideInterval); // Stop the existing auto-slide timer
        slideInterval = setInterval(nextSlide, slideDuration); // Start a new auto-slide timer
    }

    // Initialize the main image slider functionality
    if (images.length > 0) { // Only initialize if there are images
        createDots(); // Create the navigation dots
        showSlide(currentIndex); // Display the first slide initially
        resetAutoSlide(); // Start the automatic sliding
    }


    // --- Image Slider Logic - End ---
    // --- Fade-in on scroll Logic - Start ---
    // This part handles elements fading into view as the user scrolls.
    const fadeInElements = document.querySelectorAll(".fade-in");

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // If the element is currently visible in the viewport
                entry.target.classList.add("visible"); // Add 'visible' class to trigger fade-in
                observer.unobserve(entry.target); // Stop observing once it's visible to prevent re-triggering
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each element with the 'fade-in' class
    fadeInElements.forEach(el => {
        observer.observe(el);
    });
    // --- Fade-in on scroll Logic - End ---


    // --- Scroll Indicator Button Logic - Start ---
    const scrollIndicatorBtn = document.getElementById('scrollIndicatorBtn');
    const scrollShowThreshold = 300; // Pixels scrolled down from top to show the button
    const scrollBottomThreshold = 100; // Pixels from bottom of page to switch to 'up' arrow

    /**
     * Handles the scroll event to update the scroll indicator button's visibility and direction.
     */
    function handleScrollIndicator() {
        const scrollY = window.scrollY || document.documentElement.scrollTop; // Current vertical scroll position
        const documentHeight = document.documentElement.scrollHeight; // Total height of the scrollable content
        const windowHeight = window.innerHeight; // Height of the browser viewport

        // Show/hide the button based on vertical scroll position
        if (scrollIndicatorBtn) { // Ensure button exists before manipulating
            if (scrollY > scrollShowThreshold) {
                scrollIndicatorBtn.classList.add('show'); // Add 'show' class to make it visible
            } else {
                scrollIndicatorBtn.classList.remove('show'); // Remove 'show' class to hide it
            }

            // Determine the arrow direction (up or down) based on proximity to page bottom
            if (scrollY + windowHeight >= documentHeight - scrollBottomThreshold) {
                // User is near the bottom of the page, so the button should indicate "scroll UP"
                scrollIndicatorBtn.classList.add('up');
            } else {
                // User is not at the bottom, so the button should indicate "scroll DOWN"
                scrollIndicatorBtn.classList.remove('up');
            }
        }
    }

    /**
     * Handles the click event for the scroll indicator button.
     * Scrolls to the top of the page if the button indicates 'up',
     * otherwise scrolls down by a percentage of the viewport height.
     */
    function handleScrollBtnClick() {
        if (scrollIndicatorBtn && scrollIndicatorBtn.classList.contains('up')) {
            // If the button is in the 'up' state, smoothly scroll to the very top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (scrollIndicatorBtn) {
            // If the button is in the 'down' state, smoothly scroll down by 80% of the current viewport height
            window.scrollTo({
                top: window.scrollY + window.innerHeight * 0.8,
                behavior: 'smooth'
            });
        }
    }

    // Attach event listeners to the window and the button once the DOM is ready
    if (scrollIndicatorBtn) { // Ensure the button element exists before adding listeners
        window.addEventListener('scroll', handleScrollIndicator); // Listen for scroll events on the window
        scrollIndicatorBtn.addEventListener('click', handleScrollBtnClick); // Listen for clicks on the button
        // Call handleScrollIndicator once immediately on page load to set the initial state
        // (e.g., if the user loads the page already scrolled down)
        handleScrollIndicator();
    }
    // --- Scroll Indicator Button Logic - End ---
});

/*--------------------------------------------------------------Package Slider ------------------------------------------------------------------*/


document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            header.classList.toggle('nav-open');
        });
    }
});