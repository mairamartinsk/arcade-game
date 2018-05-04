// Enemies class
var Enemy = function(x, y) {
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // If enemy reaches end of canvas, reposition it
  if (this.x <= 500) {
    this.x += this.speed * dt;
    this.x = Math.floor(this.x);
  } else {
    this.x = -100;
  }

  // Detect collision and restart Player position
  if (Math.abs(this.y - player.y) === 0) {
    if (Math.abs(this.x - player.x) < 75) {
      player.x = 200;
      player.y = 400;
      player.lives--;
      if (player.lives === 0) {
        gameOver();
      }
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate all enemies
var bug1 = new Enemy(0, 72);
var bug2 = new Enemy(200, 72);
var bug3 = new Enemy(100, 154);
var bug4 = new Enemy(0, 236);
var bug5 = new Enemy(100, 318);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5);

// Player class
var Player = function(x, y) {
  this.sprite = "images/char-princess-girl.png";
  this.x = x;
  this.y = y;
  this.speed;
  this.lives = 3;
};

// Required method
Player.prototype.update = function() {
  showLives(this.lives);
};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Control player movement using arrow keys
Player.prototype.handleInput = function(move) {
  switch (move) {
    case "up":
      if (this.y === -10) {
        this.y = this.y;
      } else {
        this.y -= 82;
      }
      break;
    case "down":
      if (this.y === 400) {
        this.y = this.y;
      } else {
        this.y += 82;
      }
      break;
    case "left":
      if (this.x === 0) {
        this.x = this.x;
      } else {
        this.x -= 100;
      }
      break;
    case "right":
      if (this.x === 400) {
        this.x = this.x;
      } else {
        this.x += 100;
      }
      break;
  }
};

// Create the player object
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// Gem class
var Gem = function(sprite, x, y) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
};

// Generate random X and Y coordinates for each Gem
var getGemX = function getX() {
  var gemX = [0, 100, 200, 300, 400];
  return gemX[Math.floor(Math.random() * gemX.length)];
};

var getGemY = function getY() {
  var gemY = [72, 154, 236, 318];
  return gemY[Math.floor(Math.random() * gemY.length)];
};

// Implement gem collection mechanism
Gem.prototype.update = function() {
  // If player gets to gem, remove it from board
  if (Math.abs(this.y - player.y) === 0) {
    if (Math.abs(this.x - player.x) < 75) {
      this.x = -500;
    }
  }
};

// Draw the Gems on the screen
Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Instantiate all three Gems
var gem1 = new Gem("images/Gem Blue.png", getGemX(), getGemY());
var gem2 = new Gem("images/Gem Green.png", getGemX(), getGemY());
var gem3 = new Gem("images/Gem Orange.png", getGemX(), getGemY());

// Place all Gems in an array called allGems
var allGems = [];
allGems.push(gem1, gem2, gem3);

// Key Class
var Key = function(x) {
  this.sprite = "images/Key.png";
  this.x = x;
  this.y = -10;
};

// Render Key on canvas
Key.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Implement key collection mechanism
Key.prototype.update = function() {
  // Check if all gems are collected
  if (gem1.x === -500 && gem2.x === -500 && gem3.x === -500) {
    // If player collects key, remove it from board
    if (Math.abs(this.y - player.y) === 0) {
      if (Math.abs(this.x - player.x) < 75) {
        this.x = -500;
        gameWin();
      }
    }
  }
};

// Generate key
var key = new Key(getGemX());

// Generate html to display hearts-lives
function showLives(num) {
  var lives = document.querySelector('.hearts');
  var heartHtml = '<img src="images/Heart.png">';
  lives.innerHTML = "";

  for (let i = 0; i < num; i++) {
    lives.innerHTML += heartHtml;
  }
}

// Display modal game-start when game starts
document.addEventListener("DOMContentLoaded", gameStart);

function gameStart() {
  var gameStartModal = document.querySelector('.game-start');
  var modal = document.querySelector('.modal');
  gameStartModal.style.display = "block";

  // If user clicks outside pop-up, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// Display modal game-over after player dies
function gameOver() {
  var gameOverModal = document.querySelector('.game-over');
  gameOverModal.style.display = "block";

  var restartButton = document.querySelector('.--over');
  restartButton.addEventListener('click', function() {
    location.reload();
  });
}

// Display modal game-win after player wins game
function gameWin() {
  var gameWinModal = document.querySelector('.game-win');
  gameWinModal.style.display = "block";

  var restartButton = document.querySelector('.--win');
  restartButton.addEventListener('click', function() {
    location.reload();
  });
}
