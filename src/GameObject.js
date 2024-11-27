import { events } from "./Events";
import { Vector2 } from "./Vector2";


export class GameObject{
  constructor({position}){
    this.position = position ?? new Vector2(0,0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }
  //first entry point of the loop
  stepEntry(delta, root){
    //call updates on all children first
    this.children.forEach((child)=>child.stepEntry(delta, root))

    //call ready on the first frame
    if(!this.hasReadyBeenCalled){
      this.hasReadyBeenCalled=true;
      this.ready()
    }

    // call implemented step code
    this.step(delta, root)

  }

  // called before the first step
  ready(){

  }

  step(_delta){

  }

  draw(ctx,x,y){
    const drawPosX = x + this.position.x 
    const drawPosY = y + this.position.y 

    //do the actual rendering of the images
    this.drawImage(ctx,drawPosX,drawPosY);

    //pass on the children
    this.children.forEach((child)=>child.draw(ctx,drawPosX,drawPosY));
  }

  drawImage(ctx,drawPosX,drawPosY){
    //...
  }

  //remove from the tree
  destroy(){
    this.children.forEach(child=>{
        child.destroy();
    })
    this.parent.removeChild(this)
  }



  // other game objects are nestable inside this one
  addChild(gameObject){
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject){
    //console.log("gameobject",gameObject);
    
    events.unsubscribe(gameObject);
    this.children = this.children.filter(g =>{
      return gameObject !==g;
    })
  }

}