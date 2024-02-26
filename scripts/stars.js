document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('starCanvas');
    var ctx = canvas.getContext('2d');

    // Resize the canvas to fill browser window dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    var starCount = 200; // Number of stars
    var stars = []; // Array to hold stars

    // Function to create stars
    function createStars() {
        for (var i = 0; i < starCount; i++) {
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            var radius = Math.random() * 1.5; // Random radius for stars
            var opacity = Math.random(); // Random opacity for twinkling effect
            stars.push({x, y, radius, opacity});
        }
    }

    // Function to draw stars
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        stars.forEach(function(star) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = "rgba(255, 255, 255," + star.opacity + ")";
            ctx.fill();
        });
    }

    // Function to update star opacity for twinkling effect
    function updateStars() {
        stars.forEach(function(star) {
            star.opacity += Math.random() * 0.2 - 0.1; // Randomly increase or decrease opacity
            // Ensure opacity stays within bounds
            if (star.opacity < 0.3) star.opacity = 0.3;
            if (star.opacity > 0.7) star.opacity = 0.7;
        });
    }

    // Initialize and animate stars
    createStars();
    setInterval(function() {
        drawStars();
        updateStars();
    }, 100); // Adjust interval for twinkling speed
});
