let particlesArray = [];
const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let gyroscope = {x: 0, y: 0};

const context = canvas.getContext("2d");

function maxParticles() {
    const max = Math.floor((window.innerHeight * window.innerWidth) / 400);
    console.log(max);
    return max;
}




function init(gyroAllowed) {
    if (gyroAllowed) {
        let gyroscope = new Gyroscope({ frequency: 60 });
        gyroscope.start();
    }
    const max = maxParticles();
    const current = particlesArray.length;
    if (max > current) {
        for (let i = 0; i < max - current; i++)
            particlesArray.push(new Particle(canvas.width, canvas.height));
    }
    if (max < current) {
        for (let i = 0; i < current - max; i++)
            particlesArray.pop();
    }
    animate(gyroAllowed);
}


function animate() {
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, canvas.width, canvas.height); // clear canvas
    particlesArray.forEach(particle => {
        
        particle.update(gyroscope.x, gyroscope.y);
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
    particlesArray.forEach((particle) => particle)
});

function requestGyro() {
    navigator.permissions.query({ name: 'gyroscope' }).then(function (result) {
        handleRequestUpdate(result);
        result.onchange = function () {
            handleRequestUpdate(result);
        }
    }).catch(() => init(false));
}

function handleRequestUpdate(result) {
    if (result.state == 'granted') {
        init(true);
    } else if (result.state == 'prompt') {
        init(true);
    } else if (result.state == 'denied') {
        init(false);
    }
}

requestGyro();
