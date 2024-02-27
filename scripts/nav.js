document.addEventListener("DOMContentLoaded", () => {
    // Function to hide all main sections
    function hideAllSections() {
        document.querySelectorAll('#home, #services, #systems, #contact').forEach(section => {
            section.style.display = 'none';
        });
    }

    // Function to show a specific section based on its ID
    function showSection(sectionId) {
        hideAllSections();
        const section = document.querySelector(sectionId);
        if (section) {
            section.style.display = 'block';
        }
    }

    // Function to deactivate all navigation links
    function deactivateAllLinks() {
        document.querySelectorAll('nav ul li a, .sub-nav a').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Function to activate the clicked navigation link
    function activateLink(link) {
        deactivateAllLinks();
        link.classList.add('active');
    }

    // Main navigation logic to handle clicks on navigation links
    function handleNavigation(e) {
        e.preventDefault(); // Prevent the default anchor action
        const link = e.target.closest('a'); // Ensure the target is an anchor element
        const sectionId = link.getAttribute('href'); // Get the href attribute to identify the section ID

        showSection(sectionId);
        activateLink(link);

        // Save the last visited section in localStorage for persistence across page reloads
        if (!link.closest('.sub-nav')) { // Only for main nav links, not sub-nav
            localStorage.setItem('lastVisitedSection', sectionId);
        }
    }

    // Attach the click event listener to all navigation links
    document.querySelectorAll('nav ul li a, .sub-nav a').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Function to show the last visited section or default to the home section
    function showLastVisitedSection() {
        const lastVisitedSection = localStorage.getItem('lastVisitedSection');
        if (lastVisitedSection && document.querySelector(lastVisitedSection)) {
            showSection(lastVisitedSection);
            activateLink(document.querySelector(`nav ul li a[href="${lastVisitedSection}"], .sub-nav a[href="${lastVisitedSection}"]`));
        } else {
            // Default to showing the home section if no last visited section is found
            const defaultSectionId = '#home';
            showSection(defaultSectionId);
            activateLink(document.querySelector(`nav ul li a[href="${defaultSectionId}"], .sub-nav a[href="${defaultSectionId}"]`));
        }
    }

    // Initialize the page by showing the last visited or the default section
    showLastVisitedSection();
});
