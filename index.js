let P_STILL;
let BACKGROUND;
let BOX;
let SPIKES;
let LADDER;
let LEVEL;
let STAR;
let BLOCKS_PER_SCREEN_H;
let BLOCKS_PER_SCREEN_W;
const PIXELS_PER_BLOCK = 24;
let SPRITE_X = 1; // block numbers
let SPRITE_Y = 2; // block numbers
let OFFSET_X = 0; // block numbers not pixel numbers 
let OFFSET_Y = -2; // block numbers not pixel numbers 
let JUMP = 0;
let COINS = 0;
let HEALTH = 100;
let GOAL = false;
let SHOW = "still";
let SOUND_COIN;
let SOUND_OUCH;


function preload() {
  P_STILL = loadImage("Assets/P_1.png");
  P_WALK_R = loadImage("Assets/Walking_R_P_1.gif");
  P_WALK_L = loadImage("Assets/Walking_L_P_1.gif"); // Define P_WALK_L here
  P_JUMP = loadImage("Assets/Jumping_P_1.gif");
  P_FALL = loadImage("Assets/P_1_Falling.png");
  BACKGROUND = loadImage("Assets/HK_sky_line_png.png");
  BOX = loadImage("Assets/box.png");
  COIN = loadImage("Assets/Fw3P.gif");
  SPIKES = loadImage("Assets/SPIKE (2).png");
  LADDER = loadImage("Assets/LADDER(2).png");
  STAR = loadImage("Assets/STAR.png.png");
  LEVEL = loadStrings("Levels.txt");
  SOUND_COIN = loadSound("Assets/coin.wav");
  SOUND_OUCH = loadSound("Assets/ouch.wav");
}


    function setup() {
    frameRate(10);
    createCanvas(windowWidth, windowHeight);
    BACKGROUND.resize(windowWidth,windowHeight);
    //P_STILL.resize(24, 40)
    BOX.resize(24,24);
    COIN.resize(20,20);
    LADDER.resize(24, 24);
    SPIKES.resize(30,24);
    STAR.resize(64,64);
    BLOCKS_PER_SCREEN_H = ceil(windowHeight / PIXELS_PER_BLOCK);
    BLOCKS_PER_SCREEN_W = ceil(windowWidth / PIXELS_PER_BLOCK);
    console.log("BLOCKS PER SCREEN height ", BLOCKS_PER_SCREEN_H, "width ", BLOCKS_PER_SCREEN_W);
    for (let i = 0; i < LEVEL.length; i++) {
        LEVEL[i] = LEVEL[i].split("");
    } 
    SOUND_COIN.playMode("restart");
    SOUND_OUCH.playMode("restart");
}

function drawSprite() {
    IMAGE = P_STILL; 
  if (SHOW === "left") {
    IMAGE = P_WALK_L;
  } else if (SHOW === "right") {
    IMAGE = P_WALK_R;
  } else if (SHOW === "jump") {
    IMAGE = P_JUMP;
  } else if (SHOW === "fall") {
    IMAGE = P_FALL;
  }
  
  noFill();
    let x = SPRITE_X * PIXELS_PER_BLOCK;
    let y = SPRITE_Y * PIXELS_PER_BLOCK;
    let w = PIXELS_PER_BLOCK; 
    let h = IMAGE.height;
  image(IMAGE, x - IMAGE.width / 2 + PIXELS_PER_BLOCK / 2, y - IMAGE.height + PIXELS_PER_BLOCK*4);
  rect(x, y, w, h); // x, y, w, h
}
function moveLeft() {
  let testX = OFFSET_X+SPRITE_X - 1;
  let testY = OFFSET_Y+SPRITE_Y;
  if (LEVEL[testY][testX] === '.' || LEVEL[testY][testX] === 'o'|| LEVEL[testY][testX] === '$'){
    if (LEVEL[testY-1][testX] === '.' || LEVEL[testY+1][testX] === 'o'|| LEVEL[testY+1][testX] === '$') {
      if (LEVEL[testY+2][testX] === '.' || LEVEL[testY+2][testX] === 'o'|| LEVEL[testY+2][testX] === '$' ) {
          OFFSET_X = OFFSET_X - 1;
          SHOW = "left";
      }
    }
  }
}

function moveRight() {
  let testX = OFFSET_X+SPRITE_X + 1;
  let testY = OFFSET_Y+SPRITE_Y;
  if (LEVEL[testY][testX] === '.' || LEVEL[testY][testX] === 'o'|| LEVEL[testY][testX] === '$') {
    if (LEVEL[testY-1][testX] === '.' || LEVEL[testY+1][testX] === 'o'|| LEVEL[testY+1][testX] === '$'  ) {
      if (LEVEL[testY+2][testX] === '.' || LEVEL[testY+2][testX] === 'o'|| LEVEL[testY+2][testX] === '$') {
          OFFSET_X = OFFSET_X + 1;
          SHOW = "right";
      }
    }
  }
}


function moveLeft() {
  OFFSET_X = OFFSET_X - 1;
  SHOW = "left"
}

function moveRight() {
  OFFSET_X = OFFSET_X + 1;
  SHOW = "right"
}

function moveJump() {
  OFFSET_Y = OFFSET_Y - 1;
  SHOW = "jump"
}

// RESPOND TO THE USER - KEYBOARD/MOUSE INTERACTION
SHOW = "still"
function keyPressed() {
  if (keyCode === 65) { // letter a
    moveLeft();
  }
  if (keyCode === 68) { // letter d
    moveRight();
  }
  if (keyCode === 87) { // letter w
    moveJump();
  }
  if (keyCode === 83) { // letter s
    OFFSET_Y = OFFSET_Y + 1;
  }
}

function mousePressed() {
  let mouseXPercentage = mouseX / windowWidth; 
  if (mouseButton === LEFT) {
    if (mouseXPercentage < 0.33) { 
      moveLeft();
    } else if (mouseXPercentage > 0.66) { 
      moveRight(); 
    } else { 
      moveJump(); 
    }
  } else if (mouseButton === RIGHT) { 
    let mouseXPercentage = mouseX / windowWidth;
    if (mouseXPercentage < 0.33) { 
      moveLeft(); 
    } else if (mouseXPercentage > 0.66) { 
      moveRight(); 
    } else {
      let testX = OFFSET_X + SPRITE_X;
      let testY = OFFSET_Y + SPRITE_Y + 1;
      if (LEVEL[testY][testX] === '.' || LEVEL[testY][testX] === 'o' || LEVEL[testY][testX] === '$') {
        OFFSET_Y += 1; 
        SHOW = "fall"; 
    }
  }
}
}



  function play() {

   
     // DRAW THE BACKGROUND
image(BACKGROUND, 0, 0);

// DRAW THE LEVELS
for (let row = OFFSET_Y; row < OFFSET_Y + BLOCKS_PER_SCREEN_H; row++) {
  for (let column = OFFSET_X; column < OFFSET_X + BLOCKS_PER_SCREEN_W; column++) {
    let x = (column - OFFSET_X) * PIXELS_PER_BLOCK;
    let y = (row - OFFSET_Y) * PIXELS_PER_BLOCK;
    if (row >= 0 && row < LEVEL.length && column >= 0 && column < LEVEL[row].length) {
      if (LEVEL[row][column] === "#") {
        // DRAW A BOX
        image(BOX, x, y);
      }
      if (LEVEL[row][column] === "W") {
        // DRAW A BOX
        image(BOX, x, y);
      }
      if (LEVEL[row][column] === "o") {
        // DRAW A coin
        image(COIN, x, y);
      }
      if (LEVEL[row][column] === "|") {
        // DRAW A spikes
        image(SPIKES, x, y);
      }
      if (LEVEL[row][column] === "M") {
        // DRAW A spikes
        image(SPIKES, x, y);
      }
      if (LEVEL[row][column] === "N") {
        // DRAW A ladder
        image(LADDER, x, y);
      }
      if (LEVEL[row][column] === "*") {
        // DRAW A star
        image(STAR, x, y);
      }
    }
  }
}

    function moveJump() {
      console.log("moveJump", JUMP);
      if (JUMP === 0) { // Check we aren't hitting our head
        if (SPRITE_Y + OFFSET_Y - 1 === LEVEL.length || LEVEL[SPRITE_Y + OFFSET_Y + 3][SPRITE_X + OFFSET_X] === "#") {
          JUMP = 7; // Increase the jump height
        }
      }
    }
    
    // Are we jumping
    if (JUMP > 0) {
      let jumpTestX = SPRITE_X + OFFSET_X;
      let jumpTestY = SPRITE_Y + OFFSET_Y - 1;
      if (jumpTestY >= 0) { // Check we aren't hitting our head
        if (LEVEL[jumpTestY][jumpTestX]) { // Check what is above us
          OFFSET_Y = OFFSET_Y - 1; // Move up
        } else { // Stop trying to move up
          JUMP = 1; 
          SHOW = "jump"; 
        }
      }
      JUMP = JUMP - 1;
    } else {
      // Are we falling?
      let fallTestX = floor(SPRITE_X + OFFSET_X);
      let fallTestY = floor(SPRITE_Y + OFFSET_Y + 4);
      if (fallTestY < LEVEL.length && fallTestX >= 0 && fallTestX < LEVEL[fallTestY].length) {
        if (LEVEL[fallTestY][fallTestX] !== "#") {
          if (LEVEL[fallTestY][fallTestX] !== "N") {
        // falling
        OFFSET_Y = OFFSET_Y + 1; //Decrease the falling speed
        SHOW = "jump";
      }
    }
  }

// Are we collecting a coin
  if (LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] === "o") {
      COINS = COINS + 1
      SOUND_COIN.play();
      LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] = '.';
}
  if (LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] === "o") {
       COINS = COINS + 1
       SOUND_COIN.play();
      LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] = '.';
}
  if (LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] === "o") {
      COINS = COINS + 1
      SOUND_COIN.play()
      LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] = '.';
}
// Are we in a spike pit?
if (LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] === "|") {
    HEALTH = HEALTH - 1;
    SOUND_OUCH.play();
}
if (LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] === "|") {
   HEALTH = HEALTH - 1;
   SOUND_OUCH.play();
}
if (LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] === "|") {
    HEALTH = HEALTH - 1;
    SOUND_OUCH.play();
}
// Have we reached the goal?
if (LEVEL[OFFSET_Y+SPRITE_Y][OFFSET_X+SPRITE_X] === "$") {
    GOAL = true;
}
if (LEVEL[OFFSET_Y+SPRITE_Y+1][OFFSET_X+SPRITE_X] === "$") {
  GOAL = true;
}
if (LEVEL[OFFSET_Y+SPRITE_Y+2][OFFSET_X+SPRITE_X] === "$") {
  GOAL = true;
}
  
    // DRAW THE PLAYER
    drawSprite();
  
    // DRAW COINS AND HEALTH INFO
    fill("black");
    noStroke();
    rect(0, 0, windowWidth, PIXELS_PER_BLOCK);
    fill('white');
    textSize(15);
    text('Coins: ' + COINS, 0, PIXELS_PER_BLOCK);
    textAlign(RIGHT);
    text('HEALTH ' + HEALTH, windowWidth, PIXELS_PER_BLOCK);
    textAlign(LEFT);

    // GAME OVER????
    if (HEALTH <= 0 ) {
        console.log("Game over");
     }
    }
  }
  function draw(){
    if (HEALTH <= 0){
      // Game over screen
      fill('red');
      rect(0, 0, windowWidth, windowHeight);
      fill('white');
      textSize(30);
      textAlign(CENTER);
      text("GAMEOVER :(", windowWidth/2, 100)
      text(" score: "+COINS,windowWidth/2, 200)
      text(" health: "+HEALTH,windowWidth/2, 250)
    } else if (GOAL){
      fill('green');
      rect(0, 0, windowWidth, windowHeight);
      fill('white');
      textSize(30);
      textAlign(CENTER);
      text("YOU WIN :)", windowWidth/2, 100)
      text(" score: "+COINS, windowWidth/2, 200)
      text(" health: "+HEALTH, windowWidth/2, 250)
    } else {
        play();
    }
  }