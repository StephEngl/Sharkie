let sounds = {
  character: {
    attack: new Audio("assets/audio/fireball-sound.mp3"),
    hurt: new Audio("assets/audio/elara-hurting-sound.mp3"),
    jump: new Audio("assets/audio/elara-jumping-sound.mp3"),
    ko: new Audio("assets/audio/elara-defeated-sound.mp3"),
    footsteps: new Audio("assets/audio/elara-footsteps.mp3"),
  },
  blueSlime: {
    ko: new Audio("assets/audio/slime-defeated.mp3"),
  },
  medusa: {
    ko: new Audio("assets/audio/medusa-defeated.mp3"),
  },
  littleDragon: {
    ko: new Audio("assets/audio/littleDragon-defeated.mp3"),
  },
  dragonBoss: {
    roar: new Audio("assets/audio/endboss-dragon-roar.mp3"),
    attack: new Audio("assets/audio/endboss-dragon-fire-attack.mp3"),
    hurt: new Audio("assets/audio/endboss-dragon-hurt.mp3"),
    ko: new Audio("assets/audio/endboss-dragon-defeated.mp3"),
  },
  kitsune: {
    laugh: new Audio("assets/audio/endboss-kitsune-laugh.mp3"),
    hurt: new Audio("assets/audio/endboss-kitsune-hurt.mp3"),
    ko: new Audio("assets/audio/endboss-kitsune-defeated.mp3"),
  },
  environment: {
    background: new Audio("assets/audio/bg-music-lvl1.mp3"),
    backgroundLvl2: new Audio("assets/audio/bg-music-lvl2.mp3"),
    bgBossfight: new Audio("assets/audio/bg-music-boss-lvl1.mp3"),
  },
  collectibles: {
    crystal: new Audio("assets/audio/collectCrystal.mp3"),
    flower: new Audio("assets/audio/collectFlower.mp3"),
  },
  other: {
    gameWon: new Audio("assets/audio/bg-music-game-won.mp3"),
    gameOver: new Audio("assets/audio/bg-music-game-over.mp3"),
  },
};

/**
 * Handles the game's sound state based on `isMuted`.
 */
function handleSoundState() {
  const soundButton = document.getElementById("sound-button");
  const soundIcon = document.getElementById("sound-icon");

  if (isMuted) {
    muteAllSounds();
    setSoundIconMuted(soundIcon, soundButton);
  } else {
    unmuteAllSounds();
    setSoundIconUnmuted(soundIcon, soundButton);
  }
}

/**
 * Toggles the game sound on and off.
 */
function toggleSound() {
  isMuted = !isMuted;
  handleSoundState();
}

/**
 * Sets the sound icon to the muted state.
 * @param {HTMLElement} icon - The sound icon element.
 * @param {HTMLElement} button - The sound button element.
 */
function setSoundIconMuted(icon, button) {
  icon.src = "assets/img/icons/speaker-mute.svg";
  icon.alt = "Ton aus";
  button.setAttribute("aria-label", "Ton ein");
}

/**
 * Sets the sound icon to the unmuted state.
 * @param {HTMLElement} icon - The sound icon element.
 * @param {HTMLElement} button - The sound button element.
 */
function setSoundIconUnmuted(icon, button) {
  icon.src = "assets/img/icons/speaker-volume.svg";
  icon.alt = "Ton ein";
  button.setAttribute("aria-label", "Ton aus");
}

/**
 * Starts playing the background music if not paused or muted.
 */
function startBackgroundMusic() {
  if (!isPaused && !isMuted) {
    world.level.playBackgroundMusic();
  }
}

/**
 * Stops the background music.
 */
function stopBackgroundMusic() {
  world.level.stopBackgroundMusic();
}

/**
 * Mutes all game sounds, including background music.
 */
function muteAllSounds() {
  Object.values(sounds).forEach((category) => {
    Object.values(category).forEach((sound) => {
      sound.muted = true;
      sound.pause();
    });
  });
  if (world.level && world.level.backgroundMusic) {
    world.level.backgroundMusic.muted = true;
    world.level.backgroundMusic.pause();
  }
  saveToLocalStorage();
}

/**
 * Unmutes all game sounds and resumes background music if not paused.
 */
function unmuteAllSounds() {
  Object.values(sounds).forEach((category) => {
    Object.values(category).forEach((sound) => {
      sound.muted = false;
    });
  });
  if (world.level && world.level.backgroundMusic) {
    world.level.backgroundMusic.muted = false;
    if (!world.isPaused) world.level.backgroundMusic.play();
  }
  saveToLocalStorage();
}
