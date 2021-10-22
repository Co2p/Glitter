class Particle {

    constructor(width, height, r, g, b) {
        this.width = width;
        this.height = height;
        this.setColor(r, g, b);
        this.resetPositionAndVelocity()
        this.size = Math.random() * 3;
        this.setMaxVelocity(1);
    }

    resetPositionAndVelocity() {
        this.x = Math.random() * this.width;
        this.velocityX = Math.random();
        this.y = Math.random() * this.height;
        this.velocityY = Math.random();
    }

    update() {
        if (this.isOutsideCanvas(5)) {
            this.resetPositionAndVelocity();
        }
        this.velocityX = this.gradualVelocityChange(this.velocityX);
        this.x += this.velocityX;
        this.velocityY = this.gradualVelocityChange(this.velocityY);
        this.y += this.velocityY;
    }

    resizeCanvas(width, height) {
        this.width = width;
        this.height = height;
    }

    setMaxVelocity(velocity) {
        this.maxVelocity = velocity;
    }
    setColor(r, g, b) {
        this.color = `rgb(${r}, ${g}, ${b})`;
    }

    isOutsideCanvas(margin) {
        return (this.x > this.width + margin || this.y > this.height + margin || this.x < 0 - margin || this.y < 0 - margin);
    }

    gradualVelocityChange(previousVelocity) {
        let newVelocity = previousVelocity + (Math.random() - 0.5);
        if (newVelocity < this.maxVelocity * -1) {
            newVelocity = newVelocity + 0.5
        }
        if (newVelocity > this.maxVelocity) {
            newVelocity = newVelocity - 0.5
        }
        return newVelocity;
    }

    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}