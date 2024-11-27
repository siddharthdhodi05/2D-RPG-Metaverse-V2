class Resources {
  constructor() {
    // Everything we plan to download
    this.toLoad = {
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      hero: "/sprites/hero-sheet.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png"
    };

    this.images = {
      // A bucket to keep our images
    };

    // Load each item
    Object.keys(this.toLoad).forEach(key => {
      const img = new Image(); // Use the global Image constructor
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resourses = new Resources();
