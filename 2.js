// Player2 (center)
    const centerX = (canvas.width - barWidth) / 2;
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.fillRect(centerX, topY, (player2.health / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(centerX, topY, barWidth, barHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Health: " + player2.health + "%", centerX + barWidth / 2, topY + 13);
    let shieldColor2 = player2.shield > 0
      ? ctx.createLinearGradient(centerX, topY + barHeight + 5, centerX + barWidth, topY + barHeight + 5)
      : "#777";
    if (player2.shield > 0) {
      shieldColor2.addColorStop(0, "#4A90E2");
      shieldColor2.addColorStop(1, "#003366");
    }
    ctx.fillStyle = shieldColor2;
    ctx.fillRect(centerX, topY + barHeight + 5, (player2.shield / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(centerX, topY + barHeight + 5, barWidth, barHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Shield: " + player2.shield + "% 🛡️", centerX + barWidth / 2, topY + barHeight * 2 + 3);
    if (player2.shieldActive) {
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 3;
      ctx.strokeRect(centerX - 2, topY - 2, barWidth + 4, barHeight * 2 + 9);
    }
    
    // Player3 (right)
    const rightX = canvas.width - barWidth - 20;
    ctx.textAlign = "right";
    ctx.fillStyle = "green";
    ctx.fillRect(rightX, topY, (player3.health / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(rightX, topY, barWidth, barHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Health: " + player3.health + "%", rightX + barWidth - 5, topY + 13);
    let shieldColor3 = player3.shield > 0
      ? ctx.createLinearGradient(rightX, topY + barHeight + 5, rightX + barWidth, topY + barHeight + 5)
      : "#777";
    if (player3.shield > 0) {
      shieldColor3.addColorStop(0, "#90ee90");
      shieldColor3.addColorStop(1, "#006400");
    }
    ctx.fillStyle = shieldColor3;
    ctx.fillRect(rightX, topY + barHeight + 5, (player3.shield / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(rightX, topY + barHeight + 5, barWidth, barHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Shield: " + player3.shield + "% 🛡️", rightX + barWidth - 5, topY + barHeight * 2 + 3);
    if (player3.shieldActive) {
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 3;
      ctx.strokeRect(rightX - 2, topY - 2, barWidth + 4, barHeight * 2 + 9);
    }
    
    // Name boxes for Trio Mode
    const nameBoxWidth = 160, nameBoxHeight = 30;
    ctx.fillStyle = "white";
    ctx.fillRect(20, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(20, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    ctx.fillText("🟦 " + p1Name, 20 + nameBoxWidth / 2, topY + barHeight * 2 + 40);
    
    const centerBoxX = (canvas.width - nameBoxWidth) / 2;
    ctx.fillStyle = "white";
    ctx.fillRect(centerBoxX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(centerBoxX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.fillStyle = "red";
    ctx.fillText("🟥 " + p2Name, centerBoxX + nameBoxWidth / 2, topY + barHeight * 2 + 40);
    
    const rightBoxX = canvas.width - nameBoxWidth - 20;
    ctx.fillStyle = "white";
    ctx.fillRect(rightBoxX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(rightBoxX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.fillStyle = "green";
    ctx.fillText("🟩 " + "Computer", rightBoxX + nameBoxWidth / 2, topY + barHeight * 2 + 40);
    ctx.textAlign = "left";
  } else {
    // Duo/Solo Mode status
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
    
    const rightX = canvas.width - barWidth - 20;
    ctx.textAlign = "right";
    ctx.fillStyle = "red";
    ctx.fillRect(rightX, topY, (player2.health / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(rightX, topY, barWidth, barHeight);
    ctx.font = "14px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Health: " + player2.health + "%", rightX + barWidth - 5, topY + 13);
    
    let shieldColor2 = player2.shield > 0 
      ? ctx.createLinearGradient(rightX, topY + barHeight + 5, rightX + barWidth, topY + barHeight + 5) 
      : "#777";
    if (player2.shield > 0) {
      shieldColor2.addColorStop(0, "#4A90E2");
      shieldColor2.addColorStop(1, "#003366");
    }
    ctx.fillStyle = shieldColor2;
    ctx.fillRect(rightX, topY + barHeight + 5, (player2.shield / 100) * barWidth, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(rightX, topY + barHeight + 5, barWidth, barHeight);
    ctx.fillStyle = "white";
    ctx.fillText("Shield: " + player2.shield + "% 🛡️", rightX + barWidth - 5, topY + barHeight * 2 + 3);
    if (player2.shieldActive) {
      ctx.strokeStyle = "orange";
      ctx.lineWidth = 3;
      ctx.strokeRect(rightX - 2, topY - 2, barWidth + 4, barHeight * 2 + 9);
    }
    
    const nameBoxWidth = 220, nameBoxHeight = 30;
    ctx.fillStyle = "white";
    ctx.fillRect(leftX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(leftX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";
    ctx.font = "bold 16px Arial";
    ctx.fillText("🟦 " + p1Name, leftX + nameBoxWidth / 2, topY + barHeight * 2 + 27);
    
    ctx.fillStyle = "white";
    ctx.fillRect(rightX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(rightX, topY + barHeight * 2 + 20, nameBoxWidth, nameBoxHeight);
    ctx.fillStyle = "red";
    ctx.fillText("🟥 " + (gameMode === "solo" ? "Computer" : p2Name), rightX + nameBoxWidth / 2, topY + barHeight * 2 + 27);
    ctx.textAlign = "left";
  }
}

// Draw control boxes at bottom
function drawControls() {
  const boxWidth = 300, boxHeight = 50, padding = 20, radius = 10;
  if (gameMode === "trio") {
    // Left control box for Player1
    const leftX = padding;
    const leftY = canvas.height - boxHeight - padding;
    let grad1 = ctx.createLinearGradient(leftX, leftY, leftX, leftY + boxHeight);
    grad1.addColorStop(0, "#777");
    grad1.addColorStop(1, "#444");
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    drawRoundedRect(ctx, leftX, leftY, boxWidth, boxHeight, radius);
    ctx.fillStyle = grad1;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("🟦P1: WASD | SPACE shoot | Q shield", leftX + 10, leftY + 30);
    
    // Center control box for Player2
    const centerX = (canvas.width - boxWidth) / 2;
    const centerY = canvas.height - boxHeight - padding;
    let grad2 = ctx.createLinearGradient(centerX, centerY, centerX, centerY + boxHeight);
    grad2.addColorStop(0, "#777");
    grad2.addColorStop(1, "#444");
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    drawRoundedRect(ctx, centerX, centerY, boxWidth, boxHeight, radius);
    ctx.fillStyle = grad2;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("🟥P2: Arrow Keys | ENTER shoot | M shield", centerX + 10, centerY + 30);
    
    // Right control box for Player3 (Computer)
    const rightX = canvas.width - boxWidth - padding;
    const rightY = canvas.height - boxHeight - padding;
    let grad3 = ctx.createLinearGradient(rightX, rightY, rightX, rightY + boxHeight);
    grad3.addColorStop(0, "#777");
    grad3.addColorStop(1, "#444");
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    drawRoundedRect(ctx, rightX, rightY, boxWidth, boxHeight, radius);
    ctx.fillStyle = grad3;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("🟩P3 (Computer): AI controlled", rightX + 10, rightY + 30);
  } else {
    // Duo/Solo Mode: two control boxes
    // Left control box for Player1
    const leftX = padding;
    const leftY = canvas.height - boxHeight - padding;
    let grad1 = ctx.createLinearGradient(leftX, leftY, leftX, leftY + boxHeight);
    grad1.addColorStop(0, "#777");
    grad1.addColorStop(1, "#444");
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    drawRoundedRect(ctx, leftX, leftY, boxWidth, boxHeight, radius);
    ctx.fillStyle = grad1;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    ctx.fillText("🟦P1: WASD | SPACE shoot | Q shield", leftX + 10, leftY + 30);
    
    // Right control box for Player2/Computer
    const rightX = canvas.width - boxWidth - padding;
    const rightY = canvas.height - boxHeight - padding;
    let grad2 = ctx.createLinearGradient(rightX, rightY, rightX, rightY + boxHeight);
    grad2.addColorStop(0, "#777");
    grad2.addColorStop(1, "#444");
    ctx.save();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 6;
    drawRoundedRect(ctx, rightX, rightY, boxWidth, boxHeight, radius);
    ctx.fillStyle = grad2;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "white";
    if (gameMode === "solo") {
      ctx.fillText("🟥P2: Computer AI", rightX + 10, rightY + 30);
    } else {
      ctx.fillText("🟥P2: Arrow Keys | ENTER shoot | M shield", rightX + 10, rightY + 30);
    }
  }
}

// --- Drop Animation ---
// Players drop from off-screen into the canvas center.
function dropAnimation(callback) {
  const dropSpeed = 5; 
  const destinationY = canvas.height / 2 - player1.height / 2;
  function animate() {
    let done = true;
    if (player1.y < destinationY) {
      player1.y += dropSpeed;
      if (player1.y > destinationY) player1.y = destinationY;
      done = false;
    }
    if (gameMode !== "solo") {
      if (player2.y < destinationY) {
        player2.y += dropSpeed;
        if (player2.y > destinationY) player2.y = destinationY;
        done = false;
      }
    }
    if (gameMode === "trio") {
      if (player3.y < destinationY) {
        player3.y += dropSpeed;
        if (player3.y > destinationY) player3.y = destinationY;
        done = false;
      }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayers();
    drawTopStatus();
    drawControls();
    if (!done) {
      requestAnimationFrame(animate);
    } else {
      callback();
    }
  }
  animate();
}

// Shooting function
function shootBullet(player, playerNum) {
  const bullet = {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2,
    speed: 10,
    direction: player.lastDir,
    player: playerNum
  };
  bullets.push(bullet);
  shootSound.currentTime = 0;
  shootSound.play();
}

// Update shields (gradual depletion when active, recharge when inactive)
function updateShields() {
  const players = [player1, player2];
  if (gameMode === "trio") {
    players.push(player3);
  }
  players.forEach(player => {
    if (player.shieldActive && player.shield > 0) {
      player.shield -= 0.5;
      if (player.shield <= 0) {
        player.shield = 0;
        player.shieldActive = false;
        player.shieldBroken = true;
        shieldBreakSound.currentTime = 0;
        shieldBreakSound.play();
        setTimeout(() => {
          player.shieldBroken = false;
        }, 3000);
      }
    } else if (!player.shieldActive && !player.shieldBroken && player.shield < 100) {
      player.shield += 0.2;
      if (player.shield > 100) player.shield = 100;
    }
  });
}

// --- Check Win Condition ---
// Returns the winner's name if one player (or group) has won, otherwise returns null.
function checkWinCondition() {
  if (gameMode === "duo" || gameMode === "solo") {
    if (player1.health <= 0) return p2Name;
    if (player2.health <= 0) return p1Name;
  } else if (gameMode === "trio") {
    let remaining = [];
    if (player1.health > 0) remaining.push({ name: p1Name, health: player1.health });
    if (player2.health > 0) remaining.push({ name: p2Name, health: player2.health });
    if (player3.health > 0) remaining.push({ name: "Computer", health: player3.health });
    if (remaining.length === 1) return remaining[0].name;
  }
  return null;
}

// --- Main Game Loop ---
function gameLoop() {
  if (!gameRunning || gamePaused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update bullets: move, check collisions, and draw
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    switch(bullet.direction) {
      case "up":    bullet.y -= bullet.speed; break;
      case "down":  bullet.y += bullet.speed; break;
      case "left":  bullet.x -= bullet.speed; break;
      case "right": bullet.x += bullet.speed; break;
    }
    // Remove bullet if off-screen
    if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
      bullets.splice(i, 1);
      continue;
    }
    // Check collision with Player1 (if not fired by Player1)
    if (bullet.player !== 1 && bulletHitsPlayer(bullet, player1)) {
      player1.health = Math.max(0, player1.health - 10);
      hitSound.currentTime = 0;
      hitSound.play();
      bullets.splice(i, 1);
      continue;
    }
    // Check collision with Player2 (if not fired by Player2)
    if (bullet.player !== 2 && bulletHitsPlayer(bullet, player2)) {
      player2.health = Math.max(0, player2.health - 10);
      hitSound.currentTime = 0;
      hitSound.play();
      bullets.splice(i, 1);
      continue;
    }
    // In Trio mode, check collision with Player3 (if not fired by Player3)
    if (gameMode === "trio" && bullet.player !== 3 && bulletHitsPlayer(bullet, player3)) {
      player3.health = Math.max(0, player3.health - 10);
      hitSound.currentTime = 0;
      hitSound.play();
      bullets.splice(i, 1);
      continue;
    }
    
    // Draw bullet if no collision occurred
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  updateShields();
  drawPlayers();
  movePlayers();
  drawTopStatus();
  drawControls();
  
  // Check for win condition
  let winner = checkWinCondition();
  if (winner !== null) {
    gameRunning = false;
    document.getElementById("gameOverScreen").classList.remove("hidden");
    document.getElementById("winnerText").innerText = winner + " Wins 🏆!";
    return; // Stop the loop
  }
  
  requestAnimationFrame(gameLoop);
}

function startGame() {
  document.getElementById("startScreen").classList.add("hidden");
  const p1Input = document.getElementById("p1Name");
  if (p1Input.value.trim() !== "") p1Name = p1Input.value;
  const p2Input = document.getElementById("p2Name");
  if (p2Input.value.trim() !== "") p2Name = p2Input.value;
  gameRunning = true;
  startBackgroundMusic();
  
  // Set players off-screen for drop animation
  player1.y = -player1.height;
  player2.y = -player2.height;
  if (gameMode === "trio") { player3.y = -player3.height; }
  
  dropAnimation(() => {
    gameLoop();
  });
}

function restartGame() {
  location.reload();
}

function playAgain() {
  restartGame();
}

// Toggle Pause: pauses/unpauses the game and shows/hides the pause overlay.
function togglePause() {
  if (!gameRunning) return;
  gamePaused = !gamePaused;
  const pauseScreen = document.getElementById("pauseScreen");
  if (gamePaused) {
    pauseScreen.classList.remove("hidden");
  } else {
    pauseScreen.classList.add("hidden");
    gameLoop();
  }
}

// Expose functions for HTML onclicks
window.startGame = startGame;
window.restartGame = restartGame;
window.togglePause = togglePause;
window.playAgain = playAgain;
