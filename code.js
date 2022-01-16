var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["6a94855d-3343-40d1-afb9-7433e9ebe9b7","8ef2763e-5f7a-4f3a-95c9-6dd012be4e31","f73391f0-95d5-4ddf-9c6f-67b620107c36","ceaacfe9-144e-4012-b1d4-0499fcd4a0a0"],"propsByKey":{"6a94855d-3343-40d1-afb9-7433e9ebe9b7":{"name":"paddel","sourceUrl":null,"frameSize":{"x":58,"y":38},"frameCount":5,"looping":true,"frameDelay":12,"version":"eJSFH5M32YfYZEWOAm3oMowGVMBgMrFC","categories":["retro"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":116,"y":114},"rootRelativePath":"assets/6a94855d-3343-40d1-afb9-7433e9ebe9b7.png"},"8ef2763e-5f7a-4f3a-95c9-6dd012be4e31":{"name":"ball","sourceUrl":null,"frameSize":{"x":33,"y":33},"frameCount":4,"looping":true,"frameDelay":12,"version":"lTQOSR57v7aOzHAfcaNGq3NK8s5XaGXb","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":66,"y":66},"rootRelativePath":"assets/8ef2763e-5f7a-4f3a-95c9-6dd012be4e31.png"},"f73391f0-95d5-4ddf-9c6f-67b620107c36":{"name":"red","sourceUrl":null,"frameSize":{"x":35,"y":50},"frameCount":1,"looping":true,"frameDelay":12,"version":"Shyh3Tcl3v6gj0q1Ls023kLsUe3h8AxL","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":35,"y":50},"rootRelativePath":"assets/f73391f0-95d5-4ddf-9c6f-67b620107c36.png"},"ceaacfe9-144e-4012-b1d4-0499fcd4a0a0":{"name":"blue","sourceUrl":null,"frameSize":{"x":35,"y":50},"frameCount":1,"looping":true,"frameDelay":12,"version":"kfmtNbK7XmDDUmbES5Y83sPjxYBxmq0K","categories":["fantasy"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":35,"y":50},"rootRelativePath":"assets/ceaacfe9-144e-4012-b1d4-0499fcd4a0a0.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//creating plddle and the ball
var paddle = createSprite(200, 375, 50, 15);
paddle.setAnimation("paddel")
var ball = createSprite(200, 250, 20, 20);
ball.setAnimation("ball")
var score=0;
var gameState ="serve";

//first row of boxes
var box1 = createSprite(25, 75, 50, 50);
box1.setAnimation("red")
var box2 = createSprite(75, 75, 50, 50);
box2.setAnimation("blue");
var box3 = createSprite(125, 75, 50, 50);
box3.setAnimation("red");
var box4 = createSprite(175, 75, 50, 50);
box4.setAnimation("blue");
var box5 = createSprite(225, 75, 50, 50);
box5.setAnimation("red");
var box6 = createSprite(275, 75, 50, 50);
box6.setAnimation("blue")
;
var box7 = createSprite(325, 75, 50, 50);
box7.setAnimation("red");
var box8 = createSprite(375, 75, 50, 50);
box8.setAnimation("blue")

//second row of boxes-
var box9 = createSprite(25, 125, 50, 50);
box9.setAnimation("blue")
var box10 = createSprite(75, 125, 50, 50);
box10.setAnimation("red");
var box11 = createSprite(125, 125, 50, 50);
box11.setAnimation("blue")
var box12 = createSprite(175, 125, 50, 50);
box12.setAnimation("red");
var box13 = createSprite(225, 125, 50, 50);
box13.setAnimation("blue")
var box14 = createSprite(275, 125, 50, 50);
box14.setAnimation("red");
var box15 = createSprite(325, 125, 50, 50);
box15.setAnimation("blue")
var box16 = createSprite(375, 125, 50, 50);
box16.setAnimation("red");


function draw() {
  background("white");
  
  //display score
  textSize(15);
  stroke("red");
  text("Score :"+score,330,20);
  
  if(gameState == "serve")
  {
    textSize(25);
    text("Welcome! Press Enter to start.",30,200);
  if(  keyDown("enter")){
      ball.velocityX=3
      ball.velocityY=4
      gameState="play"
    }
    
  }
   //Making the ball bounceOff the paddle and three sides of canvas
  createEdgeSprites();
  ball.bounceOff(rightEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(topEdge);
  ball.bounceOff(paddle);
  if(gameState == "play")
  {
    paddle.x=World.mouseX
    
  }
  
  if (ball.isTouching(bottomEdge)||score==16) {
    gameState="end"
  }
  
  if(gameState == "end")
  {
    ball.velocityY=0
    ball.velocityX=0
   
      textSize(30)
      text("gameover!",150,220)
    }
    
  
    
    
  
  //Moving the ball on pressing enter key
  if(keyDown("enter")){
    ball.velocityX = 3;
    ball.velocityY = 4;
  }
  
 
  
  //Moving the paddle with mouse along the x-axis
  paddle.x=World.mouseX;
  
  //destroy the boxes when ball touches them
  if(ball.isTouching(box1))
  {
    score=score+1;
    box1.destroy();
  }
  
  if(ball.isTouching(box2))
  {
    score=score+1;
    box2.destroy();
  }
  
  if(ball.isTouching(box3))
  {
    score=score+1;
    box3.destroy();
  }
  
  if(ball.isTouching(box4))
  {
    score=score+1;
    box4.destroy();
  }
  
  if(ball.isTouching(box5))
  {
    score=score+1;
    box5.destroy();
  }
  
  if(ball.isTouching(box6))
  {
    score=score+1;
    box6.destroy();
  }
  
  if(ball.isTouching(box7))
  {
    score=score+1;
    box7.destroy();
  }
  
  if(ball.isTouching(box8))
  {
    score=score+1;
    box8.destroy();
  }
  
  if(ball.isTouching(box9))
  {
    score=score+1;
    box9.destroy();
  }
  
  if(ball.isTouching(box10))
  {
    score=score+1;
    box10.destroy();
  }
  if(ball.isTouching(box11))
  {
    score=score+1;
    box11.destroy();
  }
  if(ball.isTouching(box12))
  {
    score=score+1;
    box12.destroy();
  }
  if(ball.isTouching(box13))
  {
    score=score+1;
    box13.destroy();
  }
  if(ball.isTouching(box14))
  {
    score=score+1;
    box14.destroy();
  }
  if(ball.isTouching(box15))
  {
    score=score+1;
    box15.destroy();
  }
  if(ball.isTouching(box16))
  {
    score=score+1;
    box16.destroy();
  }
  
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
