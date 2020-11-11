export const MAX_SPRITES = 999;
export const WIDTH = 400;
export const HEIGHT = 240;

// Enhanced Object Literals или Литералы
// export const Sprite = {
//     'loaded': false,
//     'spr': "",
//     'x': 0,
//     'y': 0,
//     'speed': 0,
//     'col_box_x': 0,
//     'col_box_y': 0,
//     'prev_x': 0,
//     'prev_y': 0,
//     'animation': 0,
//     'scale_x': 0,
//     'scale_y': 0,
//     'center_x': 0,
//     'center_y': 0,
//     'rotate': 0,
// };

// var Player = Sprite;
// Player.x = 2;

export var camera_x = 0;
export var camera_y = 0;

export var sprite_id_arr = [];

export var sprites_used = 0;
export var RenderDistanceOptimize = false;
export var distanse = 0;

export var sprites = [];
// sprites.length = MAX_SPRITES;

// for(let i = 0; i < MAX_SPRITES; i++) {
//     let obj = Object.assign({}, Sprite);
//     sprites[i] = obj;
// }

export var textures = [];
// textures.length = MAX_SPRITES;

// int timer[99];
export var timer = [];
timer.length = 99;

export var keys = [];

// bool timerdone[99];
export var timerdone = [];
timerdone.length = 99;

export var canvas, ctx;

export var scene_color = 'black';

// key checking
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

export function prepareScene(){
	document.body.style.margin = "0px";
	document.body.style.display = "flex";
    var canv = document.createElement('canvas');
    canv.id = 'scene';
    // canvas_area.innerHTML = "Простите, ваш браузер не поддерживается!";
    document.body.appendChild(canv); // пихаем canvas в body

    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    ctx.fillStyle=scene_color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

export function resizeScene(width, height) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
}

export function colorScrene(color) {
	scene_color = color;
}

export function refreshScene(){
    ctx.clearRect(0,0,WIDTH,HEIGHT); // clear canvas 
    ctx.fillStyle=scene_color;
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

// export async function loadTexture(id, texture, count=0) {
// 	textures[id] = [];
// 	for(let i = 0; i <= count; i++){
// 		textures[id][i] = new Image();
// 	}
// 	var img;
//     const imageLoadPromise = new Promise(resolve => {
//         for(let i = 0; i <= count; i++){
// 			img = new Image();
//             img.onload = resolve;
//             if (count == 0) img.src = texture+".png";
//             else img.src = texture+"_"+i.toString()+".png";
//             textures[id][i] = img;
//         }
//     });

//     await imageLoadPromise;
// }

export function loadTexture(id, texture, count=0) {
	textures[id] = [];
	for(let i = 0; i <= count; i++){
		textures[id][i] = new Image();
	}
	var img;
	for(let i = 0; i <= count; i++){
		img = new Image();	
		if (count == 0) img.src = texture+".png";
		else img.src = texture+"_"+i.toString()+".png";
		textures[id][i] = img;
	}

    // await imageLoadPromise;
}

export function animateSprite(id, sprite_id, start_frame, max_frame, speed){
	if(sprites[id]['animation'] < max_frame*speed){
			if(sprites[id]['animation'] % speed == 0){
				changeSprite(id, sprite_id, start_frame+sprites[id]['animation']/speed);	
			}
			sprites[id]['animation'] = sprites[id]['animation'] + 1;
	}
	else sprites[id]['animation'] = 0;
}

export function changeSprite(id, sprite_id, frame){
	sprites[id]['spr'] = textures[sprite_id][frame];
}

export function createSprite(id,texture,x,y,scale_x = 1, scale_y = 1) {
    sprites[id] = [];
    sprites[id]['x'] = x;
	sprites[id]['y'] = y;
	sprites[id]['col_box_x'] = 0;
	sprites[id]['col_box_y'] = 0;
	sprites[id]['prev_x'] = x;
	sprites[id]['prev_y'] = y;
	sprites[id]['animation'] = 0;
	sprites[id]['scale_x'] = scale_x;
	sprites[id]['scale_y'] = scale_y;
	sprites[id]['center_x'] = 0;
	sprites[id]['center_y'] = 0;
	sprites[id]['rotate'] = 0;
	sprites[id]['flip_x'] = 1;
	sprites[id]['flip_y'] = 1;
    sprite_id_arr[sprites_used] = id;
	sprites_used++;
    sprites[id]['spr'] = textures[texture][0];
}

export function scaleSprite(id, scale_x, scale_y){
    sprites[id]['scale_x'] = scale_x;
	sprites[id]['scale_y'] = scale_y;
}

export function flipSprite(id, x, y){
    sprites[id]['flip_x'] = x;
	sprites[id]['flip_y'] = y;
}

export function drawSprite(id){
    if (RenderDistanceOptimize == true) {
        if (spriteTouchPlace(id, camera_x - distanse + canvas.width / 2, camera_y - distanse + canvas.height / 2, 2 * distanse, 2 * distanse)) {
            ctx.drawImage(sprites[id]['spr'], 0, 0, sprites[id]['spr'].width, sprites[id]['spr'].height, sprites[id]['x']-camera_x, sprites[id]['y']-camera_y, sprites[id]['spr'].width*sprites[id]['scale_x'],sprites[id]['spr'].height*sprites[id]['scale_y']);
        }
	}
    else {
		ctx.drawImage(sprites[id]['spr'], 0, 0, sprites[id]['spr'].width, sprites[id]['spr'].height, sprites[id]['x']-camera_x, sprites[id]['y']-camera_y, sprites[id]['spr'].width*sprites[id]['scale_x'], sprites[id]['spr'].height*sprites[id]['scale_y']);
    }
    
}

export function spriteTouchPlace(id, x, y, width, height){
    if ((sprites[id]['x'] + sprites[id]['col_box_x'] >= x) && (sprites[id]['x'] <= x + width) && (sprites[id]['y'] + sprites[id]['col_box_y'] >= y) && (sprites[id]['y'] <= y + height))
        return true;
    else
        return false;
}

export function placeTouchPlace(x, y, width, height, second_x, second_y, second_width, second_height){
    if ((x + width >= second_x) && (x <= second_x + second_width) && (y + height >= second_y) && (y <= second_y + second_height))
        return true;
    else
        return false;
}

export function setSpriteColBox(id, width, height) {
    sprites[id]['col_box_x'] = width;
    sprites[id]['col_box_y'] = height;
}

export function setSpriteRotate(id, degrees){
	sprites[id]['rotate'] = degrees;
}

export function restoreSpritePos(id){
    sprites[id]['x'] = sprites[id]['prev_x'];
    sprites[id]['y'] = sprites[id]['prev_y'];
}

export function setSpritePos(id, x, y){
	sprites[id]['prev_x'] = sprites[id]['x'];
	sprites[id]['prev_y'] = sprites[id]['y'];
	sprites[id]['x'] = x;
    sprites[id]['y'] = y;
}

export function moveSprite(id, x, y){
    if (x != 0) sprites[id]['prev_x'] = sprites[id]['x'];
	if (y != 0) sprites[id]['prev_y'] = sprites[id]['y'];
	sprites[id]['x'] += x;
	sprites[id]['y'] += y;
}

export function setSolidSpace(x, y, width, height){
	for(let i=0; i<sprites_used; i++){
		if(!((sprites[sprite_id_arr[i]]['col_box_x'] == 0)&&(sprites[sprite_id_arr[i]]['col_box_y'] == 0))){
			if((sprites[sprite_id_arr[i]]['x'] + sprites[sprite_id_arr[i]]['col_box_x'] >= x) && (sprites[sprite_id_arr[i]]['x'] <= x + width) && (sprites[sprite_id_arr[i]]['y'] + sprites[sprite_id_arr[i]]['col_box_y'] >= y) && (sprites[sprite_id_arr[i]]['y'] <= y + height)){
				if(!((sprites[sprite_id_arr[i]]['prev_x'] + sprites[sprite_id_arr[i]]['col_box_x'] >= x) && (sprites[sprite_id_arr[i]]['prev_x'] <= x + width) && (sprites[sprite_id_arr[i]]['y'] + sprites[sprite_id_arr[i]]['col_box_y'] >= y) && (sprites[sprite_id_arr[i]]['y'] <= y + height))){
					sprites[sprite_id_arr[i]]['x'] = sprites[sprite_id_arr[i]]['prev_x'];
				}
				else if(!((sprites[sprite_id_arr[i]]['x'] + sprites[sprite_id_arr[i]]['col_box_x'] >= x) && (sprites[sprite_id_arr[i]]['x'] <= x + width) && (sprites[sprite_id_arr[i]]['prev_y'] + sprites[sprite_id_arr[i]]['col_box_y'] >= y) && (sprites[sprite_id_arr[i]]['prev_y'] <= y + height))){
					sprites[sprite_id_arr[i]]['y'] = sprites[sprite_id_arr[i]]['prev_y'];
				}
				else{
					sprites[sprite_id_arr[i]]['x'] = sprites[sprite_id_arr[i]]['prev_x'];
					sprites[sprite_id_arr[i]]['y'] = sprites[sprite_id_arr[i]]['prev_y'];
				}
			}
		}
	}
}

export function restoreSpritePosSmart(id, x, y, width, height){
	if((sprites[id]['x'] + sprites[id]['col_box_x'] >= x) && (sprites[id]['x'] <= x + width) && (sprites[id]['y'] + sprites[id]['col_box_y'] >= y) && (sprites[id]['y'] <= y + height)){
		if(!((sprites[id]['prev_x'] + sprites[id]['col_box_x'] >= x) && (sprites[id]['prev_x'] <= x + width) && (sprites[id]['y'] + sprites[id]['col_box_y'] >= y) && (sprites[id]['y'] <= y + height))){
			sprites[id]['x'] = sprites[id]['prev_x'];
		}
		else if(!((sprites[id]['x'] + sprites[id]['col_box_x'] >= x) && (sprites[id]['x'] <= x + width) && (sprites[id]['prev_y'] + sprites[id]['col_box_y'] >= y) && (sprites[id]['prev_y'] <= y + height))){
			sprites[id]['y'] = sprites[id]['prev_y'];
		}
		else{
			sprites[id]['x'] = sprites[id]['prev_x'];
			sprites[id]['y'] = sprites[id]['prev_y'];
		}
	}
}

export function sprX(id){
	return sprites[id]['x'];
}
export function sprY(id){
	return sprites[id]['y'];
}

export function isKeyHeld(key) {
    if (keys[key]) return true; else return false;
}

export function removeSpriteSmoothing() {
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
}

export function moveCamera(x, y){
	camera_x += x;
	camera_y += y;
}

export function setCamera(x, y){
	camera_x = x;
	camera_y = y;
}

export function cameraFollow(id){
	setCamera(sprites[id]['x']-ctx.canvas.width/2, sprites[id]['y']-ctx.canvas.height/2);
}

export function cameraShiftCenter(x, y){
	camera_x -= x;
	camera_y -= y;
}

export function renderDistaneOptimize(mode, dist){
	RenderDistanceOptimize = mode;
	distanse = dist;
}

export function moveTimer(id, ticktime){
	if(timer[id] <= ticktime)
		timer[id]++;
	else
		timerdone[id] = true;
}

export function timerDone(id){
    if(timerdone[id] == true) 
        return true;
    else 
        return false;
}

export function resetTimer(id){
	timer[id] = 0;
	timerdone[id] = false;
}

export function loadTileset(id, texture, size_x, size_y, scale_x=1, scale_y=1) {
	loadTexture(id+'_tileset',texture);
	textures[id+'_tileset']['size_x'] = size_x;
	textures[id+'_tileset']['size_y'] = size_y;
	textures[id+'_tileset']['scale_x'] = scale_x;
	textures[id+'_tileset']['scale_y'] = scale_y;
}

export function scaleTileset(id, scale_x, scale_y) {
	textures[id+'_tileset']['scale_x'] = scale_x;
	textures[id+'_tileset']['scale_y'] = scale_y;
}

export function drawTile(tileset, x, y, tile_x, tile_y){
	if (RenderDistanceOptimize == true) {
        if (placeTouchPlace(x, y, textures[tileset+'_tileset']['size_x'], textures[tileset+'_tileset']['size_y'], camera_x - distanse + canvas.width / 2, camera_y - distanse + canvas.height / 2, 2 * distanse, 2 * distanse)) {
            ctx.drawImage(textures[tileset+'_tileset'][0], tile_x*textures[tileset+'_tileset']['size_x'], tile_y*textures[tileset+'_tileset']['size_y'], textures[tileset+'_tileset']['size_x'], textures[tileset+'_tileset']['size_y'], x-camera_x, y-camera_y, textures[tileset+'_tileset']['size_x']*textures[tileset+'_tileset']['scale_x'],textures[tileset+'_tileset']['size_y']*textures[tileset+'_tileset']['scale_y']);
        }
	}
    else {
		ctx.drawImage(textures[tileset+'_tileset'][0], tile_x*textures[tileset+'_tileset']['size_x'], tile_y*textures[tileset+'_tileset']['size_y'], textures[tileset+'_tileset']['size_x'], textures[tileset+'_tileset']['size_y'], x-camera_x, y-camera_y, textures[tileset+'_tileset']['size_x']*textures[tileset+'_tileset']['scale_x'],textures[tileset+'_tileset']['size_y']*textures[tileset+'_tileset']['scale_y']);
    }
}