const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var fruitPic;
var rabbitPic;
var backgroundPic;
var rabbit;
var eat;
var blinking;
var sad;
var blower;
var cutting;
var sadSound;
var eating;
var backgroundSound;
var airwav;
var Mute;
var button1;
var button2;


function preload(){

fruitPic = loadImage("gantaloope.png");
backgroundPic = loadImage("background.png");
rabbitPic = loadImage("Rabbit-01.png");
eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
cutting = loadSound("cutting.mp3");
sadSound = loadSound("sad.wav");
eating = loadSound("eating_sound.mp3");
backgroundSound = loadSound("sound1.mp3");
airwav = loadSound("air.wav");


blink.playing=true;
eating.playing=true;
sadSound.playing=true;
sad.looping=false;
eat.looping=false;
}





function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

 if(isMobile){
 canW=displayWidth;
 canH=displayHeight;
 createCanvas(displayWidth,displayHeight);
 }

 else{
   canW=windowWidth
   canH=windowHeight
   createCanvas(windowWidth,windowHeight)
 }


  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(200,canH,600,20);

    backgroundSound.play();
    backgroundSound.setVolume(0.5);
    
  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(10,{x:28,y:40});
  rope3 = new Rope(6,{x:400,y:210});

  fruit=Bodies.circle(300,300,20);

  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);
  

  rabbit=createSprite(170,canH-80,40,60);
  rabbit.addImage(rabbitPic);
  rabbit.scale=0.19;
  rabbit.addAnimation("eat",eat);
  rabbit.addAnimation("sad",sad);
  rabbit.addAnimation("blink",blink);
  rabbit.changeAnimation("blink");

  blink.frameDelay=17;
  eat.frameDelay=17;
  sad.frameDelay=17;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
  
  button=createImg("cut_btn.png");
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  blower=createImg("balloon.png")
  blower.position(38,222);
  blower.size(120,120);
  blower.mouseClicked(blow);                          
  

  Mute=createImg("mute.png");
  Mute.position(450,19);
  Mute.size(43,43);
  Mute.mouseClicked(mute);

  button1=createImg("cut_btn.png");
  button1.position(28,30);
  button1.size(50,50);
  button1.mouseClicked(drop2);

  button2=createImg("cut_btn.png");
  button2.position(400,200);
  button2.size(50,50);
  button2.mouseClicked(drop3);



}

function draw() 
{
  background(51);
  image(backgroundPic,0,0,displayWidth,displayHeight);
  ground.show();
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  drawSprites();
  
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(fruitPic,fruit.position.x,fruit.position.y,60,60);
  }
   
  if(collide(fruit,rabbit)==true){
    rabbit.changeAnimation("eat")
    eating.play()
  };

  if(fruit!=null && fruit.position.y>=650){
    rabbit.changeAnimation("sad")
    sadSound.play()
    backgroundSound.stop()
    fruit=null
  };
  pop();
};


function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con=null
  cutting.play()
};

function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2=null
  cutting.play()
};

function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3=null
  cutting.play()
};




function blow(){
Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0})

airwav.play()

};

function mute(){
  if(backgroundSound.isPlaying()){
    backgroundSound.stop()
  }
  else{
    backgroundSound.play()
  }
};

function collide(body,sprite){
if(body!=null){
  var distance=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
 if(distance<=80){
   World.remove(engine.world,fruit);
   fruit=null;
   return true;
 }
 else{
   return false;
 }
}
}


function keyPressed(){
  if(keyCode==LEFT_ARROW){
    blow()
  };
}

































