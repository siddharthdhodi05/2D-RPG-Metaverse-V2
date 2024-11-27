import { Animations } from "./src/Animations";
import { Camera } from "./src/Camera";
import { events } from "./src/Events";
import { FrameIndexPattern } from "./src/FrameIndexPattern";
import { GameLoop } from "./src/GameLoop";
import { GameObject } from "./src/GameObject";
import { gridCells, isSpaceFree } from "./src/helpers/grid";
import { moveTowards } from "./src/helpers/moveTowards";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input";
import { walls } from "./src/levels/level1";
import { Hero } from "./src/objects/Hero/hero";
import { PICK_UP_DOWN, STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from "./src/objects/Hero/heroAnimations";
import { Inventory } from "./src/objects/Inventory/Inventory";
import { Rod } from "./src/objects/Rod/Rod";
import { resourses } from "./src/Resource";
import { Sprite } from "./src/Sprite";
import { Vector2 } from "./src/Vector2";
import "./style.css";

// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

//Establish the root scene 
const mainScene =  new GameObject({
  position: new Vector2(0,0)
})


// build up the scene by adding a sky, ground and hero
const skySprite = new Sprite({
  resource: resourses.images.sky,
  frameSize: new Vector2(320, 180),
});
//mainScene.addChild(skySprite)

const groundSprite = new Sprite({
  resource: resourses.images.ground,
  frameSize: new Vector2(320, 180),
});
mainScene.addChild(groundSprite)


const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero)


const camera = new Camera();
mainScene.addChild(camera);


const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod)

const inventory = new Inventory()


// add an Input class to the main Scene
mainScene.input = new Input();


//establish update and draw loops
const update = (delta) => {
  mainScene.stepEntry(delta,mainScene)
};
const draw = () => {
  //clear anything stale
  ctx.clearRect(0,0, canvas.width, canvas.height);

  skySprite.drawImage(ctx,0,0)

  //save the current state(for camera offset)
  ctx.save()

  //offset by camera position
  ctx.translate(camera.position.x,camera.position.y)

  //restore the original state
  mainScene.draw(ctx,0,0);

  ctx.restore();

  inventory.draw(ctx,0,0)
  
};


//start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
