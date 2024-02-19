document.addEventListener("DOMContentLoaded", () => {
    // Hide all sections except the first one (Home)
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

    // Event listener for navigation link clicks
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default anchor behavior
            const sectionId = this.getAttribute('href'); // Get the section ID to show

            showSection(sectionId); // Show the clicked section
            activateLink(this); // Highlight the clicked navigation link

            // Smooth scroll to the section
            const section = document.querySelector(sectionId);
            window.scrollTo({
                top: section.offsetTop - document.querySelector('nav').offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // Initially, hide all sections except 'Home'
    hideAllSections();
    document.querySelector('#home').style.display = 'block'; // Show home section
    activateLink(document.querySelector('nav ul li a[href="#home"]')); // Highlight home link

    // Handle "Contact Us" form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Implement the form submission here. For demonstration:
        alert('Thank you for your message. We will get back to you soon!');

        // Reset the form after submission
        this.reset();
    });
});
