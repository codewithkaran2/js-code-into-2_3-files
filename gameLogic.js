//gameLogic.js
// MODE SELECTION BUTTON EVENTS
const duoBtn = document.getElementById("duoButton");
const soloBtn = document.getElementById("soloButton");
const trioBtn = document.getElementById("trioButton");
const p2NameInput = document.getElementById("p2Name");
// Global game mode: "duo", "solo", or "trio" (default is "duo")
let gameMode = "duo";

duoBtn.addEventListener("click", () => {
  gameMode = "duo";
  duoBtn.style.border = "3px solid white";
  soloBtn.style.border = "none";
  trioBtn.style.border = "none";
  p2NameInput.disabled = false;
  p2NameInput.placeholder = "Enter 🟥 Player 2 Name";
  p2NameInput.value = "";
});
soloBtn.addEventListener("click", () => {
  gameMode = "solo";
  soloBtn.style.border = "3px solid white";
  duoBtn.style.border = "none";
  trioBtn.style.border = "none";
  p2NameInput.disabled = true;
  p2NameInput.value = "Computer";
});
trioBtn.addEventListener("click", () => {
  gameMode = "trio";
  trioBtn.style.border = "3px solid white";
  duoBtn.style.border = "none";
  soloBtn.style.border = "none";
  p2NameInput.disabled = false;
  p2NameInput.placeholder = "Enter 🟥 Player 2 Name";
  p2NameInput.value = "";
});

// Helper: draw a rounded rectangle
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Full screen toggle
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Default names and scores
const defaultP1Name = "Player 1";
const defaultP2Name = "Player 2";
let p1Name = defaultP1Name;
let p2Name = defaultP2Name;
let p1Score = 0, p2Score = 0;

const speed = 5;
let gameRunning = false;
let gamePaused = false;

// Audio elements
const bgMusic = document.getElementById("bgMusic");
const shootSound = document.getElementById("shootSound");
const hitSound = document.getElementById("hitSound");
const shieldBreakSound = document.getElementById("shieldBreakSound");

// Volume slider control
const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.addEventListener("input", function() {
  const vol = parseFloat(this.value);
  bgMusic.volume = vol;
  shootSound.volume = vol;
  hitSound.volume = vol;
  shieldBreakSound.volume = vol;
});

// Start background music (triggered on game start)
function startBackgroundMusic() {
  bgMusic.play();
}

// PLAYERS (starting y will be set by the drop animation)
const player1 = {
  x: 100,
  y: 0, // will be set in startGame (off-screen)
  width: 40,
  height: 40,
  color: "blue",
  health: 100,
  shield: 100,
  shieldActive: false,
  shieldBroken: false,
  canShoot: true,
  lastDir: "right"
};
const player2 = {
  x: 600,
  y: 0, // will be set in startGame
  width: 40,
  height: 40,
  color: "red",
  health: 100,
  shield: 100,
  shieldActive: false,
  shieldBroken: false,
  canShoot: true,
  lastDir: "left"
};
// In Trio mode, add a third (computer-controlled) player:
const player3 = {
  x: 1100,
  y: 0, // will be set in startGame
  width: 40,
  height: 40,
  color: "green",
  health: 100,
  shield: 100,
  shieldActive: false,
  shieldBroken: false,
  canShoot: true,
  lastDir: "left"
};

let bullets = [];

// Controls mapping for movement and shield keys
const keys = {
  w: false, a: false, s: false, d: false,
  ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false,
  q: false, m: false, p: false
};

// Update last direction based on key input (for movement)
function updateDirection() {
  if (keys.w) { player1.lastDir = "up"; }
  else if (keys.s) { player1.lastDir = "down"; }
  else if (keys.a) { player1.lastDir = "left"; }
  else if (keys.d) { player1.lastDir = "right"; }
  
  // For duo or trio modes, update player2 direction from arrow keys
  if (gameMode === "duo" || gameMode === "trio") {
    if (keys.ArrowUp) { player2.lastDir = "up"; }
    else if (keys.ArrowDown) { player2.lastDir = "down"; }
    else if (keys.ArrowLeft) { player2.lastDir = "left"; }
    else if (keys.ArrowRight) { player2.lastDir = "right"; }
  }
}

// --- Key events for shooting controls ---
document.addEventListener("keydown", (e) => {
  if (e.key === "CapsLock") { e.preventDefault(); return; }
  
  // Shooting for Player1 (Space)
  if (e.code === "Space") {
    if (player1.canShoot && gameRunning && !gamePaused) {
      shootBullet(player1, 1);
      player1.canShoot = false;
    }
    return;
  }
  // Shooting for Player2 (Enter) if not solo
  if (e.code === "Enter" && gameMode !== "solo") {
    if (player2.canShoot && gameRunning && !gamePaused) {
      shootBullet(player2, 2);
      player2.canShoot = false;
    }
    return;
  }
  
  // Process movement/shield keys if defined in our mapping
  if (keys.hasOwnProperty(e.key)) {
    if (e.key === "p") { togglePause(); return; }
    keys[e.key] = true;
    updateDirection();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "CapsLock") { e.preventDefault(); return; }
  
  if (e.code === "Space") {
    player1.canShoot = true;
    return;
  }
  if (e.code === "Enter" && gameMode !== "solo") {
    player2.canShoot = true;
    return;
  }
  
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
    updateDirection();
  }
});

// MOVE PLAYERS (with boundaries)
function movePlayers() {
  let oldP1 = { x: player1.x, y: player1.y };
  let oldP2 = { x: player2.x, y: player2.y };
  let oldP3 = gameMode === "trio" ? { x: player3.x, y: player3.y } : null;
  
  // Player1 movement
  let dx1 = 0, dy1 = 0;
  if (keys.a && player1.x > 0) dx1 = -speed;
  if (keys.d && player1.x + player1.width < canvas.width) dx1 = speed;
  if (keys.w && player1.y > 0) dy1 = -speed;
  if (keys.s && player1.y + player1.height < canvas.height) dy1 = speed;
  
  // Player2 movement (duo/trio)
  let dx2 = 0, dy2 = 0;
  if (gameMode === "duo" || gameMode === "trio") {
    if (keys.ArrowLeft && player2.x > 0) dx2 = -speed;
    if (keys.ArrowRight && player2.x + player2.width < canvas.width) dx2 = speed;
    if (keys.ArrowUp && player2.y > 0) dy2 = -speed;
    if (keys.ArrowDown && player2.y + player2.height < canvas.height) dy2 = speed;
  }
  
  player1.x += dx1;
  player2.x += dx2;
  if (rectCollision(player1, player2)) {
    player1.x = oldP1.x;
    player2.x = oldP2.x;
  }
  
  player1.y += dy1;
  player2.y += dy2;
  if (rectCollision(player1, player2)) {
    player1.y = oldP1.y;
    player2.y = oldP2.y;
  }
  
  if (gameMode === "solo") {
    updateAI();
    player2.y = Math.max(0, Math.min(player2.y, canvas.height - player2.height));
  }
  
  if (gameMode === "trio") {
    updateAIForPlayer3();
    player3.y = Math.max(0, Math.min(player3.y, canvas.height - player3.height));
    if (rectCollision(player1, player3)) {
      player1.x = oldP1.x;
      player3.x = oldP3.x;
      player1.y = oldP1.y;
      player3.y = oldP3.y;
    }
    if (rectCollision(player2, player3)) {
      player2.x = oldP2.x;
      player3.x = oldP3.x;
      player2.y = oldP2.y;
      player3.y = oldP3.y;
    }
  }
  
  // Shield toggles
  player1.shieldActive = keys.q;
  player2.shieldActive = keys.m;
  updateDirection();
}

/* 
  Collision detection with margin
*/
function rectCollision(rect1, rect2) {
  const margin = 5;
  return rect1.x < rect2.x + rect2.width + margin &&
         rect1.x + rect1.width > rect2.x - margin &&
         rect1.y < rect2.y + rect2.height + margin &&
         rect1.y + rect1.height > rect2.y - margin;
}

/* 
  AI for Solo mode (Player2)
*/
function updateAI() {
  if (gameMode === "solo") {
    let oldP2x = player2.x;
    let oldP2y = player2.y;
    
    let centerX1 = player1.x + player1.width / 2;
    let centerY1 = player1.y + player1.height / 2;
    let centerX2 = player2.x + player2.width / 2;
    let centerY2 = player2.y + player2.height / 2;
    
    let diffX = centerX1 - centerX2;
    let diffY = centerY1 - centerY2;
    
    let factor = 0.3;
    let moveX = Math.max(-speed, Math.min(speed, diffX * factor));
    let moveY = Math.max(-speed, Math.min(speed, diffY * factor));
    
    player2.x += moveX;
    player2.y += moveY;
    
    if (rectCollision(player1, player2)) {
      player2.x = oldP2x;
      player2.y = oldP2y;
    }
    
    let distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < 300 && player2.canShoot && gameRunning && !gamePaused) {
      shootBullet(player2, 2);
      player2.canShoot = false;
      setTimeout(() => { player2.canShoot = true; }, 50);
    }
  }
}

/* 
  AI for Trio mode (Player3)
*/
function updateAIForPlayer3() {
  if (gameMode === "trio") {
    let centerX1 = player1.x + player1.width / 2;
    let centerY1 = player1.y + player1.height / 2;
    let centerX2 = player2.x + player2.width / 2;
    let centerY2 = player2.y + player2.height / 2;
    let centerX3 = player3.x + player3.width / 2;
    let centerY3 = player3.y + player3.height / 2;
    
    // Choose the closer human target  
    let dx1 = centerX1 - centerX3;
    let dy1 = centerY1 - centerY3;
    let dx2 = centerX2 - centerX3;
    let dy2 = centerY2 - centerY3;
    let dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    let dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    let target = dist1 < dist2 ? player1 : player2;
    
    let oldP3x = player3.x;
    let oldP3y = player3.y;
    let centerX_target = target.x + target.width / 2;
    let centerY_target = target.y + target.height / 2;
    let diffX = centerX_target - centerX3;
    let diffY = centerY_target - centerY3;
    let factor = 0.3;
    let moveX = Math.max(-speed, Math.min(speed, diffX * factor));
    let moveY = Math.max(-speed, Math.min(speed, diffY * factor));
    player3.x += moveX;
    player3.y += moveY;
    if (rectCollision(player3, target)) {
      player3.x = oldP3x;
      player3.y = oldP3y;
    }
    let distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance < 300 && player3.canShoot && gameRunning && !gamePaused) {
      shootBullet(player3, 3);
      player3.canShoot = false;
      setTimeout(() => { player3.canShoot = true; }, 50);
    }
  }
}

// Helper: Checks if a bullet collides with a player.
function bulletHitsPlayer(bullet, player) {
  return bullet.x >= player.x &&
         bullet.x <= player.x + player.width &&
         bullet.y >= player.y &&
         bullet.y <= player.y + player.height;
}

// Draw players on canvas
function drawPlayers() {
  ctx.fillStyle = player1.color;
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  
  ctx.fillStyle = player2.color;
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
  
  if (gameMode === "trio") {
    ctx.fillStyle = player3.color;
    ctx.fillRect(player3.x, player3.y, player3.width, player3.height);
  }
}

// Draw UI (health bars, shield bars, names, control boxes)
function drawTopStatus() {
  const barWidth = 200, barHeight = 15;
  if (gameMode === "trio") {
    // Player1 (left)
    const leftX = 20, topY = 20;
    ctx.fillStyle = "red";
    ctx.fillRect(leftX, topY, (player1.health / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(leftX, topY, barWidth, barHeight);
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("Health: " + player1.health + "%", leftX + 5, topY + 13);
    let shieldColor1 = player1.shield > 0
      ? ctx.createLinearGradient(leftX, topY + barHeight + 5, leftX + barWidth, topY + barHeight + 5)
      : "#777";
    if (player1.shield > 0) {
      shieldColor1.addColorStop(0, "#4A90E2");
      shieldColor1.addColorStop(1, "#003366");
    }
    ctx.fillStyle = shieldColor1;
    ctx.fillRect(leftX, topY + barHeight + 5, (player1.shield / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(leftX, topY + barHeight + 5, barWidth, barHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Shield: " + player1.shield + "% 🛡️", leftX + 5, topY + barHeight * 2 + 3);
    if (player1.shieldActive) {
      ctx.strokeStyle = "cyan";
      ctx.lineWidth = 3;
      ctx.strokeRect(leftX - 2, topY - 2, barWidth + 4, barHeight * 2 + 9);
    }
    
