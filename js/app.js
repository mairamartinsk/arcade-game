// Enemies our player must avoid
var Enemy = function(x, y) {
  // The image/sprite for our enemies
  this.sprite = "images/enemy-bug.png";
  this.x = x;
  this.y = y;
  this.speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.y === 72) {
    this.speed = 220;
  } else if (this.y === 154) {
    this.speed = 170;
  } else if (this.y === 236) {
    this.speed = 120;
  }

  if (this.x <= 500) {
    this.x += this.speed * dt;
  } else {
    this.x = -100;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// Requires update(), render() and handleInput() methods
var Player = function(x, y) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
};

// Update the player's position
Player.prototype.update = function(dt) {};

// Draw the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

// Now instantiate your objects.
var bug1 = new Enemy(0, 72);
var bug2 = new Enemy(200, 72);
var bug3 = new Enemy(100, 154);
var bug4 = new Enemy(300, 154);
var bug5 = new Enemy(0, 236);
var bug6 = new Enemy(400, 236);

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);

// Place the player object in a variable called player
var player = new Player(300, 400);

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
