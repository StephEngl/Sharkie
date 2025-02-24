class Character extends MovableObject {
  imagesIntro = [
    "img/Elara/mage_elara/Idle/idle1.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle10.png",
    "img/Elara/mage_elara/Idle/idle11.png",
    "img/Elara/mage_elara/Idle/idle12.png",
    "img/Elara/mage_elara/Idle/idle13.png",
    "img/Elara/mage_elara/Idle/idle14.png",
  ];
  imagesWalking = [
    "img/Elara/mage_elara/Walk/walk1.png",
    "img/Elara/mage_elara/Walk/walk2.png",
    "img/Elara/mage_elara/Walk/walk3.png",
    "img/Elara/mage_elara/Walk/walk4.png",
    "img/Elara/mage_elara/Walk/walk5.png",
    "img/Elara/mage_elara/Walk/walk6.png",
  ];
  imagesIdle = [
    "img/Elara/mage_elara/Idle/idle1.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle10.png",
    "img/Elara/mage_elara/Idle/idle11.png",
    "img/Elara/mage_elara/Idle/idle12.png",
    "img/Elara/mage_elara/Idle/idle13.png",
    "img/Elara/mage_elara/Idle/idle14.png",
  ];
  imagesLongIdle = [
    "img/Elara/mage_elara/Idle/idle1.png",
    "img/Elara/mage_elara/Idle/idle2.png",
    "img/Elara/mage_elara/Idle/idle3.png",
    "img/Elara/mage_elara/Idle/idle4.png",
    "img/Elara/mage_elara/Idle/idle5.png",
    "img/Elara/mage_elara/Idle/idle6.png",
    "img/Elara/mage_elara/Idle/idle7.png",
    "img/Elara/mage_elara/Idle/idle8.png",
    "img/Elara/mage_elara/Idle/idle9.png",
    "img/Elara/mage_elara/Idle/idle10.png",
    "img/Elara/mage_elara/Idle/idle11.png",
    "img/Elara/mage_elara/Idle/idle12.png",
    "img/Elara/mage_elara/Idle/idle13.png",
    "img/Elara/mage_elara/Idle/idle14.png",
  ];
  imagesJump = [
    "img/Elara/mage_elara/Jump/jump1.png",
    "img/Elara/mage_elara/Jump/jump2.png",
    "img/Elara/mage_elara/Jump/jump3.png",
    "img/Elara/mage_elara/Jump/jump4.png",
    "img/Elara/mage_elara/Jump/jump5.png",
    "img/Elara/mage_elara/Jump/jump6.png",
    "img/Elara/mage_elara/Jump/jump7.png",
  ];
  imagesHurt = [
    "img/Elara/mage_elara/Hurt/hurt1.png",
    "img/Elara/mage_elara/Hurt/hurt2.png",
    "img/Elara/mage_elara/Hurt/hurt3.png",
    "img/Elara/mage_elara/Hurt/hurt4.png",
  ];
  imagesDying = [
    "img/Elara/mage_elara/Death/death1.png",
    "img/Elara/mage_elara/Death/death2.png",
    "img/Elara/mage_elara/Death/death3.png",
    "img/Elara/mage_elara/Death/death4.png",
    "img/Elara/mage_elara/Death/death5.png",
    "img/Elara/mage_elara/Death/death6.png",
    "img/Elara/mage_elara/Death/death7.png",
    "img/Elara/mage_elara/Death/death8.png",
    "img/Elara/mage_elara/Death/death9.png",
    "img/Elara/mage_elara/Death/death10.png",
  ];
  imagesAttack = [
    "img/Elara/mage_elara/Attack/attack1.png",
    "img/Elara/mage_elara/Attack/attack2.png",
    "img/Elara/mage_elara/Attack/attack3.png",
    "img/Elara/mage_elara/Attack/attack4.png",
    "img/Elara/mage_elara/Attack/attack5.png",
    "img/Elara/mage_elara/Attack/attack6.png",
    "img/Elara/mage_elara/Attack/attack7.png",
  ];
  world;
  idleTimer = 0;
  longIdleThreshold = 10000;
  isAttacking = false;
  audioDyingSound = this.world.createAudio("assets/audio/elara_dying_sound.mp3");
  audioHittingSound = new Audio("assets/audio/hurting_sound.mp3");
  audioJumpingSound = new Audio("assets/audio/elara_jumping_sound.mp3");
  elaraJumpedOnEnemy = false;

  constructor() {
    super().setImage("img/Elara/mage_elara/Jump/jump1.png");
    this.y = 270;
    this.offset = {
      top: 70,
      right: 75,
      bottom: 20,
      left: 30,
    };
    this.speed = 5;
    this.loadImages(this.imagesIntro);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesLongIdle);
    this.loadImages(this.imagesJump);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDying);
    this.loadImages(this.imagesAttack);
    this.applyGravity();
    this.isLongIdleActive = false;
    this.animate();
    this.deathAnimationFrame = 0;
    this.deathAnimationComplete = false;
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.setOtherDirection(false);
        this.resetIdleTimer();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft(this.speed);
        this.setOtherDirection(true);
        this.resetIdleTimer();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.resetIdleTimer();
      }

      this.idleTimer += 1000 / 60;
      this.world.camera_x = -this.x + 30;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playDeathAnimation(this.imagesDying);
        if (this.deathAnimationComplete) {
          stopGame();
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.imagesHurt);
        this.audioHittingSound.play();
        this.resetIdleTimer();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesJump);
        this.resetIdleTimer();
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.imagesWalking);
          this.resetIdleTimer();
        } else if (this.idleTimer >= this.longIdleThreshold) {
          this.playAnimation(this.imagesLongIdle);
        } else {
          this.playAnimation(this.imagesIdle);
        }
      }
    }, 200);
  }

  jump() {
    this.speedY = 30;
    this.audioJumpingSound.play();
  }

  isJumpedOn(/** @type MovableObject */ mo) {
    let isFalling = this.speedY < 0;
    if (!isFalling) {
      return false;
    }
    let charCollisionRect = this.getCurrentCollisionRect();
    let moCollisionRect = mo.getCurrentCollisionRect();
    if (charCollisionRect.y2 < moCollisionRect.y1) {
      return false;
    }
    let charMid = (charCollisionRect.x1 + charCollisionRect.x2) / 2;
    let moMid = (moCollisionRect.x1 + moCollisionRect.x2) / 2;
    let tolerance = (charCollisionRect.x2 - charCollisionRect.x1) / 2;
    tolerance = 60;
    let moBoundLeft = moMid - tolerance;
    let moBoundRight = moMid + tolerance;
    let horizontalOverlap = charMid >= moBoundLeft && charMid <= moBoundRight;
    this.elaraJumpedOnEnemy = horizontalOverlap;
    return horizontalOverlap;
  }

  resetIdleTimer() {
    this.idleTimer = 0;
  }

  playDeathAnimation() {
    if (!this.deathAnimationComplete) {
      this.audioDyingSound.play();
      this.audioDyingSound.playbackRate = 0.7;
      this.img = this.imageCache[this.imagesDying[this.deathAnimationFrame]];
      this.deathAnimationFrame++;
      if (this.deathAnimationFrame >= this.imagesDying.length) {
        this.deathAnimationComplete = true;
        this.deathAnimationFrame = this.imagesDying.length - 2; // Setzt auf vorletztes Bild zurück
      }
    } else {
      // Wechselt zwischen den letzten beiden Bildern
      this.deathAnimationFrame =
        this.imagesDying.length - 2 + (this.deathAnimationFrame % 2);
      this.img = this.imageCache[this.imagesDying[this.deathAnimationFrame]];
    }
  }
}
