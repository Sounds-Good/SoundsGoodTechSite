var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawWaves();
    }
    resizeCanvas();

    function drawWaves() {
        var layers = [
            { color: "rgba(22, 45, 61, 0.5)", speed: 0.07, height: 20, frequency: 0.05 },
            { color: "rgba(35, 123, 182, 0.3)", speed: 0.09, height: 40, frequency: 0.03 },
            { color: "rgba(7, 61, 8, 0.2)", speed: 0.06, height: 60, frequency: 0.02 },
        ]; // Different layers for ocean waves

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            layers.forEach(function(layer) {
                var time = Date.now() * layer.speed;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);

                for (var i = 0; i <= canvas.width; i++) {
                    var angle = (i + time) * layer.frequency;
                    var y = Math.sin(angle) * layer.height + (canvas.height / 2);
                    ctx.lineTo(i, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.fillStyle = layer.color;
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();
    }