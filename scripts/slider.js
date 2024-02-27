document.addEventListener('DOMContentLoaded', function () {
    const brandSlider = document.getElementById('brandSlider');
    const amdContents = document.querySelectorAll('.amdContent'); // Use class for AMD contents
    const intelContents = document.querySelectorAll('.intelContent'); // Use class for Intel contents

    // Function to toggle visibility
    function toggleContent(displayAmd) {
        amdContents.forEach(content => {
            content.style.display = displayAmd ? 'block' : 'none';
        });
        intelContents.forEach(content => {
            content.style.display = displayAmd ? 'none' : 'block';
        });
    }

    // Initial display setup
    toggleContent(!brandSlider.checked); // Show AMD content by default if unchecked, Intel if checked

    // Event listener for changes on the slider
    brandSlider.addEventListener('change', function () {
        toggleContent(!brandSlider.checked);
    });
});
