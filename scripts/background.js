document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById('starCanvas') || document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    // Resize the canvas to fill browser window dynamically
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', function() {
        resizeCanvas();
        draw(); // Call the unified draw function
    }, false);
    resizeCanvas();

    var starCount = 200; // Number of stars
    var stars = []; // Array to hold stars

    // Function to create stars
    function createStars() {
        stars = []; // Reset stars array to avoid duplicating
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

    var layers = [
        { color: "rgba(22, 45, 61, 0.5)", speed: 0.02, height: 20, frequency: 0.05 },
        { color: "rgba(35, 123, 182, 0.3)", speed: 0.04, height: 40, frequency: 0.03 },
        { color: "rgba(7, 61, 8, 0.2)", speed: 0.06, height: 60, frequency: 0.02 },
    ];

    function drawWaves() {
        layers.forEach(function(layer) {
            var time = Date.now() * layer.speed;
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            for (var i = 0; i <= canvas.width; i++) {
                var angle = (i + time) * layer.frequency;
                var y = Math.sin(angle) * layer.height + (canvas.height / 1.2);
                ctx.lineTo(i, y);
            }
            ctx.lineTo(canvas.width, canvas.height);
            ctx.fillStyle = layer.color;
            ctx.fill();
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawStars(); // Draw stars
        drawWaves(); // Then draw waves
        updateStars(); // Update stars for the next frame
        requestAnimationFrame(draw); // Loop the draw function
    }

    createStars(); // Initial creation of stars
    draw(); // Start the drawing loop
});
