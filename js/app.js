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
        // List of sections and their titles
        const sectionList = [
            { id: "landingIntro", title: "Books" },
            { id: "landingSynopsis", title: "Series Synopsis" },
            { id: "landingAuthor", title: "Author" },
            { id: "landingNewsletter", title: "Newsletter" }
        ];
        
        // Loop through the sections
        for (let i = 0; i < sectionList.length; i++) {
            const section = document.getElementById(sectionList[i].id);
            
            // Make a new list item
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            
            link.href = "#" + sectionList[i].id;
            link.textContent = sectionList[i].title;
    
            // Make the link scroll to the section when clicked
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const sectionToScrollTo = document.getElementById(this.getAttribute("href").slice(1));
                sectionToScrollTo.scrollIntoView({behavior: "smooth"});
                
                // Close the menu if it's open on small screens
                if (window.innerWidth <= 1024) {
                    nav.classList.remove('show');
                }
            });
    
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