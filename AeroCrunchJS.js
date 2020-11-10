export const MAX_SPRITES = 999;
export const WIDTH = 400;
export const HEIGHT = 240;

// Enhanced Object Literals или Литералы
export const Sprite = {
    'loaded': false,
    'spr': "",
    'x': 0,
    'y': 0,
    'speed': 0,
    'col_box_x': 0,
    'col_box_y': 0,
    'prev_x': 0,
    'prev_y': 0,
    'animation': 0,
    'scale_x': 0,
    'scale_y': 0,
    'center_x': 0,
    'center_y': 0,
    'rotate': 0,
};

// var Player = Sprite;
// Player.x = 2;

export var camera_x = 0;
export var camera_y = 0;

export var sprite_id_arr = [];
sprite_id_arr.length = MAX_SPRITES;

export var sprites_used = 0;
export var RenderDistanceOptimize = false;
export var distanse = 0;

export var sprites = [];
sprites.length = MAX_SPRITES;
sprites.fill(Sprite, 0, MAX_SPRITES);

// int timer[99];
export var timer = [];
timer.length = 99;

// bool timerdone[99];
export var timerdone = [];
timerdone.length = 99;

export var ctx;

export function prepareScene(){
    var canv = document.createElement('canvas');
    canv.id = 'scene';
    // canvas_area.innerHTML = "Простите, ваш браузер не поддерживается!";
    document.body.appendChild(canv); // пихаем canvas в body

    var canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

export function createSprite(spr,id,x,y) {
    sprites[id]['spr'] = spr;
	sprites[id]['x'] = x;
	sprites[id]['y'] = y;
	sprites[id]['col_box_x'] = 0;
	sprites[id]['col_box_y'] = 0;
	sprites[id]['prev_x'] = x;
	sprites[id]['prev_y'] = y;
	sprites[id]['animation'] = 0;
	sprites[id]['scale_x'] = 1;
	sprites[id]['scale_y'] = 1;
	sprites[id]['center_x'] = 0;
	sprites[id]['center_y'] = 0;
	sprites[id]['rotate'] = 0;
	sprites_used++;
	sprite_id_arr[sprites_used] = id;
}

export async function drawSprite(id){

    var img;
    const imageLoadPromise = new Promise(resolve => {
        img = new Image();
        img.onload = resolve;
        img.src = sprites[id]['spr'];
    });
    
    await imageLoadPromise;
    
    ctx.drawImage(img, sprites[id]['x']-camera_x, sprites[id]['y']-camera_y);

	// if(RenderDistanceOptimize == true){
    //     if(Aer_SpriteTouchPlace(id, camera_x-distanse, camera_y-distanse, WIDTH+2*distanse, HEIGHT+2*distanse)){
    //         ctx.drawImage(sprites[id]['spr'], sprites[id]['x']-camera_x, sprites[id]['y']-camera_y);
    //     }
	// }
	// else{
	// 	ctx.drawImage(sprites[id]['spr'], sprites[id]['x']-camera_x, sprites[id]['y']-camera_y);
    // }
    
}

export function spriteTouchPlace(id, second_x, second_y, second_width, second_height){
    if ((sprites[id]['x'] + sprites[id]['col_box_x'] >= second_x) && (sprites[id]['x'] <= second_x + second_width) && (sprites[id]['y'] + sprites[id]['col_box_y'] >= second_y) && (sprites[id]['y'] <= second_y + second_height))
        return true;
    else
        return false;
}

export function spritePosition(id, x, y){
	sprites[id]['prev_x'] = sprites[id]['x'];
	sprites[id]['prev_y'] = sprites[id]['y'];
	sprites[id]['x'] = x;
	sprites[id]['y'] = y;
}

export function sprX(id){
	return sprites[id]['x'];
}
export function sprY(id){
	return sprites[id]['y'];
}

export function refreshRoom(){
    ctx.clearRect(0,0,WIDTH,HEIGHT); // clear canvas
}

// Aer_PrepareScene();
// Aer_CreateSprite('gfx/sprite/idle_1.png', 0, WIDTH/2-32/2, HEIGHT/2-56/2);

// id = setInterval(draw, 1);

// function draw () {
//     ctx.clearRect(0,0,WIDTH,HEIGHT); // clear canvas
//     Aer_SpritePosition(0, Aer_SprX(0)+test,Aer_SprY(0))
//     Aer_DrawSprite(0);
//     test=1;

//     if (Aer_SprX(0) > WIDTH) {
//         Aer_SpritePosition(0, 0 ,0);
//     };
// }

// while(true) {
    
//     Aer_DrawSprite(0);
//     test++;
// }
