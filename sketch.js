var dog, happyDog, database, food, foodStock
var dogImg, dogHappyImg;
var milk, milkImg;
// Alden Ryam

function preload()
//load Images
{
  dogImg = loadImage("Dog.png");
  dogHappyImg = loadImage("happydog.png");
  milkImg = loadImage("milk.png");
  

}
//setup
function setup() {
  database = firebase.database();
  createCanvas(500, 500);
//dog
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  emo = createSprite(200,200,1,1);
  //food
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  //milk
  milk = createSprite(140,435,10,10);
  milk.addImage(milkImg);
  milk.scale = 0.025;

  milk1 = createSprite(210,280,10,10);
  milk1.addImage(milkImg);
  milk1.scale = 0.025;
  milk1.visible = false;


  
}


function draw() {  
  background("pink")
//conditions
  if(food !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(dogHappyImg);
    //visiblity
    milk1.visible = true;

   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(food);
    dog.addImage(dogImg);
    milk1.visible = false;
  }
}

if(food == 0){
  //emptyfood
  dog.addImage(dogImg);
  food = 50;

}



  drawSprites();
  textSize(17);
  fill("red");
  text("Bow,Bow I am your pet doogy ",100,150);
  fill("red");
  text(" Press up arrow key to feed your pet Dog",50,50);
  fill("red");
  text("No of milk bottles  "+food,170,440);
}
//stock data
function readStock(data)
{
  food = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

