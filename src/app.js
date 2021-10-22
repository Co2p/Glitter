let particlesArray = [];
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");

function maxParticles() {
    const max = Math.floor((window.innerHeight * window.innerWidth) / 400);
    console.log(max);
    return max;
}




function init() {
    const max = maxParticles();
    const current = particlesArray.length;
    if (max > current) {
        for (let i = 0; i < max - current; i++)
            particlesArray.push(new Particle(canvas.width, canvas.height, colorComponent(1.1), colorComponent(1), colorComponent(0.4)));
    }
    if (max < current) {
        for (let i = 0; i < current - max; i++)
            particlesArray.pop();
    }
    animate();
}

function colorComponent(bias = 1) {
    return Math.min(Math.floor(Math.random() * 255 * bias), 255);
}

function animate() {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, canvas.width, canvas.height); // clear canvas
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
    particlesArray.forEach(particle => particle.resizeCanvas(canvas.width, canvas.height));
}

const velocitySlider = document.getElementById("velocity");
velocitySlider.addEventListener("change", (event) => {
    particlesArray.forEach((particle) => particle.setMaxVelocity(event.target.value))
});

init();