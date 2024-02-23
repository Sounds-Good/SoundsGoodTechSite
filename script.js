document.addEventListener("DOMContentLoaded", () => {
    // Hide all sections except for the first one (Home)
    function hideAllSections() {
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
        });
    }

    // Show a specific section and hide all others
    function showSection(sectionId) {
        hideAllSections();
        document.querySelector(sectionId).style.display = 'block';
    }

    // Remove the 'active' class from all navigation links
    function deactivateAllLinks() {
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Add the 'active' class to the navigation link that corresponds to the visible section
    function activateLink(link) {
        deactivateAllLinks();
        link.classList.add('active');
    }

    // Function to show the selected system category
    function showSystemCategory(categoryId) {
        // Hide all categories
        document.querySelectorAll('.system-category').forEach(category => {
            category.style.display = 'none';
            category.classList.remove('active');
        });
        
        // Show the selected category
        const selectedCategory = document.querySelector(categoryId);
        if (selectedCategory) {
            selectedCategory.style.display = 'block';
            // Allow some time for the display change before adding the class for opacity transition
            setTimeout(() => selectedCategory.classList.add('active'), 10);
        }
    }

    // Event listener for navigation link clicks
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor behavior
            const sectionId = this.getAttribute('href'); // Get the section ID to show

            if (sectionId.startsWith("#systems-")) {
                // If it's a systems subsection, handle separately
                showSystemCategory(sectionId);
            } else {
                // Handle normal section navigation
                localStorage.setItem('lastVisitedSection', sectionId);
                showSection(sectionId); // Show the clicked section
                activateLink(this); // Highlight the clicked navigation link
            }

            // Smooth scroll to the section
            const section = document.querySelector(sectionId);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - document.querySelector('nav').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check for and show the last visited section, or default to 'Home'
    function showLastVisitedSection() {
        const lastVisitedSection = localStorage.getItem('lastVisitedSection');
        if (lastVisitedSection && document.querySelector(lastVisitedSection)) {
            showSection(lastVisitedSection);
            activateLink(document.querySelector(`nav ul li a[href="${lastVisitedSection}"]`));
        } else {
            showSection('#home');
            activateLink(document.querySelector('nav ul li a[href="#home"]'));
        }
    }

    showLastVisitedSection(); // Initial call replaced with this function

    // Initial setup for system categories, if applicable
    const initialSystemCategory = '#gaming'; // Default to gaming PCs
    showSystemCategory(initialSystemCategory);

    // Event listeners for system sub-nav link clicks (if part of the initial setup)
    document.querySelectorAll('.sub-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryId = this.getAttribute('href');
            showSystemCategory(categoryId); // Show the clicked system category
        });
    });
});