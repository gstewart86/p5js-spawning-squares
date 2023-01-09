function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//  ██████╗ ██████╗ ███╗   ██╗███████╗███████╗████████╗████████╗██╗
// ██╔════╝██╔═══██╗████╗  ██║██╔════╝██╔════╝╚══██╔══╝╚══██╔══╝██║
// ██║     ██║   ██║██╔██╗ ██║█████╗  █████╗     ██║      ██║   ██║
// ██║     ██║   ██║██║╚██╗██║██╔══╝  ██╔══╝     ██║      ██║   ██║
// ╚██████╗╚██████╔╝██║ ╚████║██║     ███████╗   ██║      ██║   ██║
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚══════╝   ╚═╝      ╚═╝   ╚═╝


class Confetti {
    constructor(n = 1000, confettoColor = color(0, 0, 255)) {
        this.numRectangles = n;
        this.confettoColor = confettoColor;
        this.confettiList = [];

        for (let i = 0; i < this.numRectangles; i++) {
            let lifetime = random(10, 100);
            let maxOpacity = random(100);
            let newConfetto = new Confetto(random(width), random(height), this.confettoColor, lifetime, maxOpacity);
            this.confettiList.push(newConfetto);
        }
    }


    render() {
        for (let i = this.confettiList.length - 1; i >= 0; i--) {
            let confetto = this.confettiList[i];
            confetto.render();
            if (confetto.isDead()) {
                this.confettiList.splice(i, 1);
                let lifetime = random(10, 100);
                let maxOpacity = random(100);
                let newConfetto = new Confetto(random(width), random(height), this.confettoColor, lifetime, maxOpacity);
                this.confettiList.push(newConfetto);
            }
        }
    }
}

class Confetto {
    constructor(x, y, c = color(random(255), random(255), random(255)), lifetime = random(10, 100), maxOpacity = random(100)) {
        this.id = uuidv4();
        this.x = x;
        this.y = y;
        this.width = 2;
        this.height = 2;
        this.color = c;
        this.startLifetime = lifetime;
        this.remainingLifetime = lifetime;
        this.maxOpacity = maxOpacity;
        this.alpha = 0;
    }

    render() {
        push();
        fill(this.color, this.alpha);
        rect(this.x, this.y, this.width, this.height);
        pop();
        if (this.remainingLifetime > this.startLifetime / 2) {
            this.alpha = map(this.remainingLifetime, this.startLifetime / 2, this.startLifetime, 0, this.maxOpacity);
        } else {
            this.alpha = map(this.remainingLifetime, 0, this.startLifetime / 2, this.maxOpacity, 0);
        }
        this.remainingLifetime--;
    }

    isDead() {
        return this.remainingLifetime <= 0;
    }
}

// ██████╗ ███████╗ ██████╗████████╗ █████╗ ███╗   ██╗ ██████╗ ██╗     ███████╗
// ██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗████╗  ██║██╔════╝ ██║     ██╔════╝
// ██████╔╝█████╗  ██║        ██║   ███████║██╔██╗ ██║██║  ███╗██║     █████╗  
// ██╔══██╗██╔══╝  ██║        ██║   ██╔══██║██║╚██╗██║██║   ██║██║     ██╔══╝  
// ██║  ██║███████╗╚██████╗   ██║   ██║  ██║██║ ╚████║╚██████╔╝███████╗███████╗
// ╚═╝  ╚═╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝


class Rectangle {
    constructor(x, y, maxSize, color) {
        this.x = x;
        this.y = y;
        this.maxSize = maxSize;
        this.size = 1;
        this.lifetime = 100;
        this.fade = 0;
        this.color = color;
        this.transparentCenter = random(1) > 0.5;
    }

    render() {
        push();
        // Draw the rectangle
        let c = this.color;
        if (this.transparentCenter) {
            fill(red(c), green(c), blue(c), this.lifetime);
            rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        } else {
            fill(c, this.lifetime);
            noStroke();
            rect(this.x - this.size / 2 + 1, this.y - this.size / 2 + 1, this.size - 2, this.size - 2);
            stroke(c, this.lifetime);
            strokeWeight(2);
            rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
        pop();
        // Update the size and lifetime of the rectangle
        this.size++;
        if (this.size > this.maxSize) {
            this.size = this.maxSize;
            this.fade++;
        }
        if (this.fade > this.lifetime) {
            this.lifetime--;
        }
    }
}
