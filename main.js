import * as aer from './AeroCrunchJS.js';

var test = 1;

function setup() {
    // Prepare
    aer.prepareScene();

    // Create sprites
    aer.createSprite('gfx/sprite/idle_1.png', 0, WIDTH/2, HEIGHT/2);

    // Need remove in future
    id = setInterval(draw, 1);
}

function draw() {
    // Refresh
    aer.refreshRoom();

    // Move sprite
    aer.spritePosition(0, aer.sprX(0) + test, aer.sprY(0))

    // Draw sprite
    aer.drawSprite(0);

    // Check sprite outside?
    if (aer.sprX(0) > WIDTH) {
        aer.spritePosition(0, 0 ,0);
    };
}

setup();