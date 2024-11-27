import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resourses } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Inventory extends GameObject {
  constructor() {
    super({
      position: new Vector2(0, 1),
    });

    this.nextId = 0;
    this.items = [
      {
        id: -1,
        image: resourses.images.rod
      },
      {
        id: -2,
        image: resourses.images.rod
      }
    ]

    //reacts to hero picking up an item
    events.on("HERO_PICKS_UP_ITEM", this, (data) => {
      
      this.nextId += 1;
      this.items.push({
        id:this.nextId,
        image:resourses.images.rod
      })
      this.renderInventory();
    });


    //draw initial state on bootup
    this.renderInventory()
  }

  renderInventory(){

    // remove stale drawings
    this.children.forEach(child => child.destroy())

    // draw fresh from latest version of the list
    this.items.forEach((item, index) =>{
      const sprite = new Sprite({
        resource: item.image,
        position: new Vector2(index*12,0)
      });
      this.addChild(sprite);
    })
  }

   removeFromInventory(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.renderInventory();
  }
}
