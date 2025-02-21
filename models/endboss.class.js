class Endboss extends MovableObject {
  imagesIntro = [
    "img/Elara/enemies/endboss/dragon/Walk1.png",
    "img/Elara/enemies/endboss/dragon/Walk2.png",
    "img/Elara/enemies/endboss/dragon/Walk3.png",
    "img/Elara/enemies/endboss/dragon/Walk4.png",
    "img/Elara/enemies/endboss/dragon/Walk5.png",
    "img/Elara/enemies/endboss/dragon/Walk1.png",
    "img/Elara/enemies/endboss/dragon/Walk2.png",
    "img/Elara/enemies/endboss/dragon/Walk3.png",
    "img/Elara/enemies/endboss/dragon/Walk4.png",
    "img/Elara/enemies/endboss/dragon/Walk5.png",
    "img/Elara/enemies/endboss/dragon/Walk1.png",
    "img/Elara/enemies/endboss/dragon/Walk2.png",
    "img/Elara/enemies/endboss/dragon/Walk3.png",
    "img/Elara/enemies/endboss/dragon/Walk4.png",
    "img/Elara/enemies/endboss/dragon/Walk5.png",
    "img/Elara/enemies/endboss/dragon/Attack1.png",
    "img/Elara/enemies/endboss/dragon/Attack2.png",
    "img/Elara/enemies/endboss/dragon/Attack3.png",
    "img/Elara/enemies/endboss/dragon/Attack4.png",
  ];
  imagesIdle = [
    "img/Elara/enemies/endboss/dragon/Idle1.png",
    "img/Elara/enemies/endboss/dragon/Idle2.png",
    "img/Elara/enemies/endboss/dragon/Idle3.png",
  ];
  hadFirstContact = false;

  constructor() {
    super().setImage(this.imagesIntro[1]);
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesIdle);
    this.x = 4000; //3800
    this.y = -40;
    this.height = 600;
    this.width = 600;
    this.speed = 10;
    this.offset = {
      top: 300,
      right: 100,
      bottom: 150,
      left: 150,
    };
    this.animate();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (i > 10) {
        this.playAnimation(this.imagesIdle);
      } else {
        this.playAnimation(this.imagesIntro);
        this.moveLeft(this.speed);
        this.otherDirection = true;
      }
      i++;
      if (world.character.x > 3300 && !this.hadFirstContact) {
        i = 0;
        this.hadFirstContact = true;
      }
    }, 250);
  }
}
