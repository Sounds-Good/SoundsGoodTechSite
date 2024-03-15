// Wait for the DOM to fully load before executing the code
document.addEventListener('DOMContentLoaded', function() {
    // Get the canvas element by ID, or the first canvas element if not found
    var canvas = document.getElementById('starCanvas') || document.querySelector('canvas');
    // Get the 2D rendering context for the canvas
    var ctx = canvas.getContext('2d');

    // Function to resize the canvas to fill the browser window dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    // Add an event listener to resize the canvas whenever the window size changes
    window.addEventListener('resize', function() {
        resizeCanvas();
        draw(); // Call the draw function to redraw everything on resize
    }, false);
    // Initial call to set the canvas size based on the current window size
    resizeCanvas();

    var starCount = 200; // Number of stars to draw on the canvas
    var stars = []; // Array to hold star objects

    // Function to populate the stars array with stars at random positions
    function createStars() {
        stars = []; // Clear the existing stars array
        for (var i = 0; i < starCount; i++) {
            var x = Math.random() * canvas.width; // Random x position
            var y = Math.random() * canvas.height; // Random y position
            var radius = Math.random() * 1.8; // Random radius for each star
            var opacity = Math.random(); // Random opacity for a twinkling effect
            stars.push({x, y, radius, opacity});
        }
    }

    // Function to draw each star in the stars array on the canvas
    function drawStars() {
        stars.forEach(function(star) {
            ctx.beginPath(); // Start a new path for the star
            // Draw a circle to represent the star
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            // Set the fill color with varying opacity for a twinkling effect
            ctx.fillStyle = "rgba(255, 255, 255," + star.opacity + ")";
            ctx.fill(); // Fill the star with the set color
        });
    }

    // Function to update the opacity of each star for the twinkling effect
    function updateStars() {
        stars.forEach(function(star) {
            // Randomly adjust the opacity to simulate twinkling
            star.opacity += Math.random() * 0.2 - 0.1;
            // Ensure the opacity remains within the bounds of 0.3 to 0.7
            if (star.opacity < 0.3) star.opacity = 0.3;
            if (star.opacity > 0.7) star.opacity = 0.7;
        });
    }

    // Definition for layers of waves with different properties
    var layers = [
        { color: "rgba(22, 45, 61, 0.5)", speed: 0.02, height: 20, frequency: 0.05 },
        { color: "rgba(35, 123, 182, 0.3)", speed: 0.04, height: 40, frequency: 0.03 },
        { color: "rgba(7, 61, 8, 0.2)", speed: 0.06, height: 60, frequency: 0.02 },
    ];

    // Function to draw moving wave layers based on the defined layers
    function drawWaves() {
        layers.forEach(function(layer) {
            var time = Date.now() * layer.speed;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            // Calculate wave positions across the width of the canvas
            for (var i = 0; i <= canvas.width; i++) {
                var angle = (i + time) * layer.frequency;
                var y = Math.sin(angle) * layer.height + (canvas.height / 1.2);
                ctx.lineTo(i, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.fillStyle = layer.color;
            ctx.fill(); // Fill the wave with the set color
        });
    }

    // Main draw function to clear the canvas and redraw everything
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawStars(); // Draw the stars
        drawWaves(); // Draw the waves
        updateStars(); // Update stars for twinkling effect
        requestAnimationFrame(draw); // Request to animate the drawing function
    }

    createStars(); // Initial population of stars
    draw(); // Start the drawing animation loop
});
