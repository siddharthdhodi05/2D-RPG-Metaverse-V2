export class GameLoop{
  constructor(update, render){

    this.lastFrameTime = 0;
    this.accumulatedTime = 0;
    this.timeStep = 1000/60 //60 frames per second

    this.update =  update;
    this.render =  render;

    this.rafId = null;
    this.isRunning =  false;
  }

  mainLoop = (timestamp) => {
    if(!this.isRunning) return ; 
    let deltaTime =  timestamp - this.lastFrameTime;
    this.lastFrameTime =  timestamp;

    this.accumulatedTime += deltaTime // accumulate all the time since last frame


    //fix timestep update
    //if there is enought accumulated time to run one or more fixed update
    while (this.accumulatedTime>= this.timeStep){
      
      this.update(this.timeStep);// here we will pass fixed time step
      this.accumulatedTime -= this.timeStep
    }
    //render
    this.render();
    this.rafId = requestAnimationFrame(this.mainLoop)
  }

  start(){
    if(!this.isRunning){
      this.isRunning = true
      this.rafId=requestAnimationFrame(this.mainLoop)
    }
  }

  stop(){
    if(this.rafId){
        cancelAnimationFrame(this.rafId)
    }
    this.isRunning = false;
  }
}