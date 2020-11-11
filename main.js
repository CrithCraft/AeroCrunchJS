import * as aer from './AeroCrunchJS.js';

const CHUNKS_X = 8;
const CHUNKS_Y = 8;

var move = false;
var chunk = [];

var current_generation_x = 0;
var current_generation_y = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max+1));
}

function setup() {
    // Prepare
    aer.prepareScene();
    aer.colorScrene('pink');
    aer.renderDistaneOptimize(true, 128);
    aer.removeSpriteSmoothing();
    
    for(let i=0; i<=CHUNKS_Y;i++){
        chunk[i] = [];
        for(let j=0; j<=CHUNKS_X;j++){
            chunk[i][j] = [];
            for(let k=0;k<=8;k++){
                chunk[i][j][k] = [];
                chunk[i][j][k]['x'] = k*32+i*(32*8);
                chunk[i][j][k]['y'] = getRandomInt(7)*32+j*(32*8);
            } 
        }
    }

    // Load texture
    aer.loadTexture('player_idle', 'gfx/sprite/idle', 3);
    aer.loadTexture('player_run', 'gfx/sprite/run', 3);
    aer.loadTexture('skeleton_run', 'gfx/sprite/Enemy/Skeleton/Run', 3);

    aer.loadTileset('dungeon','gfx/tileset/dungeon', 16, 16);
    aer.scaleTileset('dungeon', 2, 2);

    // Create sprites
    aer.createSprite('player', 'player_idle', aer.WIDTH/2, aer.HEIGHT/2);
    aer.setSpriteColBox('player', 32, 56);

    for(let i=0;i<=5;i++){
        aer.createSprite('skeleton_'+i, 'skeleton_run', 128*i, 32, 2, 2);
    }

    // Need remove in future - 1000ms / 60fps = 16.7ms ~= 17ms
    setInterval(draw, 17);
}

function draw() {
    // Refresh
    aer.resizeScene(window.innerWidth, window.innerHeight);
    aer.refreshScene();
    aer.removeSpriteSmoothing();
    // aer.ctx.filter = 'grayscale()';

    // Render draw optimization
    // if (window.innerWidth > window.innerHeight) aer.renderDistaneOptimize(true, window.innerWidth);
    // else aer.renderDistaneOptimize(true, window.innerHeight);
    aer.renderDistaneOptimize(true, 128);
    if (aer.isKeyHeld(79)) aer.renderDistaneOptimize(true, window.innerHeight);
    

    // Set player movement and camera follow
    controlPlayer('player', 4);
    aer.cameraFollow('player');
    aer.cameraShiftCenter(-16, -28);
    
    if (move) aer.animateSprite('player','player_run', 0, 3, 8);
    else aer.animateSprite('player','player_idle', 0, 3, 8);

    // Set solid space

    // Draw tileset
    


    if(aer.camera_x > current_generation_x-4*32*CHUNKS_X-aer.ctx.canvas.width/2){
        for(let i=0; i<=CHUNKS_Y;i++){
            for(let j=0; j<=CHUNKS_X;j++){
                for(let k=0;k<=8;k++){
                    aer.drawTile('dungeon', chunk[i][j][k]['x']-(4*32*CHUNKS_X), chunk[i][j][k]['y']-(4*32*CHUNKS_Y), 1, 4);
                    // aer.setSolidSpace(chunk[i][j][k]['x']-(4*32*CHUNKS_X), chunk[i][j][k]['y']-(4*32*CHUNKS_Y), 32, 32);
                } 
            }
        }
    }
    
    // Draw sprites
    for(let i=0;i<=5;i++){
        aer.animateSprite('skeleton_'+i,'skeleton_run', 0, 3, 8);
        aer.drawSprite('skeleton_'+i);
    }

    aer.drawSprite('player');
}

function controlPlayer(id, velocity) {
    // Player keyboard movement
    move = false;
    if (aer.isKeyHeld(40)) { // Up
        aer.moveSprite(id, 0, velocity); 
        move = true; 
    }
    if (aer.isKeyHeld(39)) { // Right
        aer.moveSprite(id, velocity, 0); 
        aer.flipSprite(id, 1, 1); 
        move = true; 
    }
    if (aer.isKeyHeld(38)) { // Down
        aer.moveSprite(id, 0,-velocity); 
        move = true; 
    }
    if (aer.isKeyHeld(37)) { // Left 
        aer.moveSprite(id,-velocity, 0); 
        aer.flipSprite(id, -1, 1); 
        move = true; 
    }
}

// Need remove in future
setup();