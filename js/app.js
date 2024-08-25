// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation menu
    const nav = document.getElementById("nav-sections");
    
    // Get all the sections
    const sections = document.querySelectorAll("section");

    // Variable to store the menu button
    let menuButton;

    // Make the navigation menu
    function makeNavBar() {
        // Get all sections
        const sections = Array.from(document.getElementsByTagName("section"));

        // Loop through all sections
        for (let section of sections) {
            // Create new list item
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            
            // Set the link's href to the section's id
            link.href = "#" + section.id;
            // Set the link's text content to the section's data-nav attribute
            link.textContent = section.getAttribute("data-nav");

            // Add click event listener for smooth scrolling
            link.addEventListener('click', function(event) {
                event.preventDefault();
                section.scrollIntoView({behavior: "smooth"});
                
                // Close the menu if it's open on small screens
                if (window.innerWidth <= 1024) {
                    nav.classList.remove('show');
                }
            });

            // Append the link to the list item, and the list item to the nav
            listItem.appendChild(link);
            nav.appendChild(listItem);
        }
    }

    // Highlight the active section
    function highlightActiveSection() {
        const scrollPosition = window.pageYOffset;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionBottom - 50) {
                // Remove highlight from all sections
                for (let j = 0; j < sections.length; j++) {
                    sections[j].classList.remove('active-section');
                }
                // Add highlight to current section
                section.classList.add('active-section');

                // Highlight the nav item
                const navItems = document.querySelectorAll('#nav-sections a');
                for (let k = 0; k < navItems.length; k++) {
                    navItems[k].classList.remove('active');
                    if (navItems[k].getAttribute('href') === '#' + section.id) {
                        navItems[k].classList.add('active');
                    }
                }
            }
        }
    }

    // Make the menu button work
    function setupMenuButton() {
        menuButton = document.createElement('button');
        menuButton.textContent = 'Menu';
        menuButton.className = 'menu-button';
        document.querySelector('header').insertBefore(menuButton, document.querySelector('header').firstChild);
    
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('show');
        });

        // Initial setup based on window width
        handleResize();
    }

    let slidePosition = 0;
    //Get images
    const slides = document.getElementsByClassName("carousel_bookImg");
    //Get length of carousel
    const totalSlides = slides.length;

    //Get next and prev buttons
    document.getElementById('carousel-btn--next').addEventListener("click", moveToNextSlide);
    document.getElementById('carousel-btn--prev').addEventListener("click", moveToPrevSlide);

    function updateSlidePositions() {
        for (let slide of slides) {
            slide.classList.remove('carousel_bookImg--visible');
            slide.classList.add('carousel_bookImg--hidden');
        }
        slides[slidePosition].classList.add('carousel_bookImg--visible');
    }

    //Create next function
    function moveToNextSlide() {
        if (slidePosition === totalSlides - 1) {
            slidePosition = 0;
        } else {
            slidePosition++;
        }
        updateSlidePositions();
    }

    //Create prev function
    function moveToPrevSlide() {
        if (slidePosition === 0) {
            slidePosition = totalSlides - 1;
        } else {
            slidePosition--;
        }
        updateSlidePositions();
    }

    // Initialize the first slide
    updateSlidePositions();


    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 1024) {
            nav.style.display = 'flex';
            nav.classList.remove('show');
            menuButton.style.display = 'none';
        } else {
            nav.style.display = nav.classList.contains('show') ? 'flex' : 'none';
            menuButton.style.display = 'block';
        }
    }

    // Start everything
    makeNavBar();
    setupMenuButton();
    highlightActiveSection(); // Set initial active section
    
    // Update active section when scrolling
    window.addEventListener('scroll', highlightActiveSection);

    // Handle window resize
    window.addEventListener('resize', handleResize);
});