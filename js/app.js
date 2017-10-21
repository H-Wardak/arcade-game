// global objects  
var rand = function(min, max){
    return min + Math.floor(Math.random()* max);
}

 // Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 505)
    {
        this.x = -101;
        this.y = 75 * rand(1,3);

        //update the initial speed
        this.speed = rand(100,500);
    }

    //Handles collision with the Player
    if(this.x > player.x && this.x < player.x + 5
     && this.y === player.y)
        player.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 202;
    this.y = 75 * 5;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    
};

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 75 * 5;
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(arrow){
    switch (arrow) {
        case "up" :
            this.y -= 75;
            if(this.y < 75)
                this.reset();
            break;
        case "right":
            this.x += 101;
            if(this.x > 404)
                this.x -= 101;
            break;
        case "down":
            this.y += 75;
            if(this.y > 375)
                this.y = 375;
            break;
        case "left":
            this.x -= 101;
            if(this.x < 0)
                this.x = 0;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();

var allEnemies = [];
for (var i = 0; i < 3; i++)
{
    var enemy = new Enemy(-101, 75 * rand(1,3), rand(100, 500));
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});