

/* global input */

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images
var end = new Image();
end.src = "img/toastend.png";

var snakebody = new Image();
snakebody.src = "img/toast.png";

var ground = new Image();
ground.src = "img/ground.png";

var foodImg = new Image();
foodImg.src = "img/Hajzer.png";

// load audio files

let play =new Audio();
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

play.src="audio/Megalovania.mp3";
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

// create the score var

let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}
    
    
// draw everything to the canvas

function draw(){
    
    play.play();
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.drawImage(snakebody,snake[i].x,snake[i].y);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }
    else
    {
        // remove the tail
        snake.pop();
   }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    };
    
    // game over
     
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
      var players = [];
      var players = JSON.parse(localStorage.getItem("players"));
      function igrac(imie,wynik){
      this.imie=imie;
      this.wynik=wynik;
    }
        clearInterval(game);
        dead.play();
        for( let i = 0; i < snake.length ; i++)
        { 
           ctx.clearRect(snake[i].x, snake[i].y,snake.width, snake.height);
           ctx.drawImage(end,snake[i].x,snake[i].y);
           
        }
        setTimeout(function(){
          var da = new igrac(prompt("Dobra robota! Podaj swoje imie:","Wpisz imie"),score);
          for(var i in players){
             da=players[i]; 
             
          }
            localStorage.setItem(da.imie,JSON.stringify(da));     
           
          console.log(localStorage);
          },400);
        

        if(score>=0 && score<=5)
        { 
          setTimeout(function(){
          alert("Przegrales");
          if(confirm("Czy chcesz zagrac ponownie?")){
                 window.location.reload(true); 
              }
              else
                {
                   alert("Gra skonczona!"); 
                   window.close();
                }
          },500);
          
        }
    
          else if(score>=6 && score<=10)
            {    
            setTimeout(function(){
            alert("Przegrales");
            if(confirm("Czy chcesz zagrac ponownie?")){
                 window.location.reload(true); 
              }
              else
                {
                   alert("Gra skonczona!"); 
                   window.close();
                }
          },500);
            }
        
          else if(score>=11 && score<=20 )
            {
            setTimeout(function(){
            alert("Przegrales");
            if(confirm("Czy chcesz zagrac ponownie?")){
                 window.location.reload(true); 
              }
              else
                {
                   alert("Gra skonczona!"); 
                   window.close();
                }
          },500);
            }
        
          else if(score>=21 && score<=50 )
          {
            setTimeout(function(){
            alert("Przegrales");
            if(confirm("Czy chcesz zagrac ponownie?")){
                 window.location.reload(true); 
              }
              else
                {
                   alert("Gra skonczona!"); 
                   window.close();
                }
          },500);
          }
          else{}
          
         
         var nesto = JSON.parse(localStorage.getItem("players"));
         var players2=JSON.parse(nesto);
         
         players2.sort(function(a,b){
         return b.wynik-a.wynik;
         });
         
         for( var i in players2){
         document.write(players2[i].imie + "--------------" + players2[i].wynik);
         }  
    
}  
        
    snake.unshift(newHead);
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
    }

// call draw function every 100 ms

let game = setInterval(draw,100);


















