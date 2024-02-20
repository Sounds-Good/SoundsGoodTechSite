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

            // Store the current section ID in localStorage
            localStorage.setItem('lastVisitedSection', sectionId);

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

    // Handle "Contact Us" form submission with AJAX
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this); // Create a FormData object from the form

        fetch('your-server-endpoint.php', { // Replace with your actual server-side script URL
            method: 'POST',
            body: formData,
        })
        .then(response => response.json()) // Assuming the server responds with JSON
        .then(data => {
            console.log('Success:', data);
            alert('Thank you for your message. We will get back to you soon!'); // Show success message
            this.reset(); // Reset the form after successful submission
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.'); // Show error message
        });
    });
});
