let particlesArray = [];
const canvas = document.getElementById("canvas");
const sliderDiv = document.getElementById("sliders");
const velocitySlider = document.getElementById("velocity");
const colorRedSlider = document.getElementById("colorRed");
const colorGreenSlider = document.getElementById("colorGreen");
const colorBlueSlider = document.getElementById("colorBlue");

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
            particlesArray.push(new Particle(canvas.width, canvas.height, colorRedSlider.valueAsNumber, colorGreenSlider.valueAsNumber, colorBlueSlider.valueAsNumber));
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

velocitySlider.addEventListener("change", (event) => {
    particlesArray.forEach((particle) => particle.setMaxVelocity(event.target.value))
});

colorRedSlider.addEventListener("change", (event) => {
    particlesArray.forEach((particle) => particle.setColor(event.target.valueAsNumber, colorGreenSlider.valueAsNumber, colorBlueSlider.valueAsNumber))
});
colorGreenSlider.addEventListener("change", (event) => {
    particlesArray.forEach((particle) => particle.setColor(colorRedSlider.valueAsNumber, event.target.valueAsNumber, colorBlueSlider.valueAsNumber))
});
colorBlueSlider.addEventListener("change", (event) => {
    particlesArray.forEach((particle) => particle.setColor(colorRedSlider.valueAsNumber, colorGreenSlider.valueAsNumber, event.target.valueAsNumber))
});

canvas.addEventListener("click", (event) => {
    sliderDiv.style.display = sliderDiv.style.display === "grid" ? "none" : "grid";
});

init();