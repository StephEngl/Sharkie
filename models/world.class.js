class World {
  character = new Character();
  statusbar = new Statusbar();
  level = level1;
  camera_x;
  flyingObjects = [];
  isPaused = false;
  runInterval = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
    this.startPauseCheck();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.runInterval = setInterval(() => {
      if (!this.isPaused) {
        this.checkCollisions();
        this.checkFlyingObjects();
      }
    }, 300);
  }

  startPauseCheck() {
    setInterval(() => {
      this.checkForPause();
    }, 100); // Überprüft häufiger auf Pause-Eingabe
  }

  checkForPause() {
    if (this.keyboard.SPACE) {
      this.togglePause();
      this.keyboard.SPACE = false;
    }
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      console.log("Spiel pausiert");
      clearInterval(this.runInterval);
    } else {
      console.log("Spiel fortgesetzt");
      this.run();
    }
  }


  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.energy > 0) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  checkFlyingObjects() {
    if (this.keyboard.D) {
      this.character.playAnimation(this.character.imagesAttack);
      let fireball = new FlyingObject(
        this.character.x + this.character.offset.right,
        this.character.y + this.character.offset.top
      );
      this.flyingObjects.push(fireball);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.isPaused) {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);

      this.ctx.translate(-this.camera_x, 0);
      // Space for fixed objects//
      this.addToMap(this.statusbar);
      this.ctx.translate(this.camera_x, 0);

      this.addObjectsToMap(this.level.lights);
      if (!gameOver) {
        this.addObjectsToMap(this.level.enemies);
      }
      this.addObjectsToMap(this.flyingObjects);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.foregroundObjects);

      this.ctx.translate(-this.camera_x, 0);
    } else {
      this.drawPauseScreen();
    }
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  drawPauseScreen() {
    this.ctx.font = "30px magical_neverland";
    this.ctx.fillStyle = "white";
    const text = "Spiel pausiert";
    const textWidth = this.ctx.measureText(text).width;
    this.ctx.fillText(text, (this.canvas.width - textWidth) / 2, this.canvas.height / 2);
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}
