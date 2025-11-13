let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

let rightPressed=false;
let leftPressed=false;

const ball={
    x:canvas.width/2,
    y:canvas.height-30,
    radius:10,
    dx:2,
    dy:-2,
};

const paddle={
    height:10,
    width:75,
    x:(canvas.width-75)/2
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddle.x,canvas.height-paddle.height,paddle.width,paddle.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    if (rightPressed && paddle.x<canvas.width-paddle.width){
        paddle.x+=7;
    } else if (leftPressed && paddle.x>0){
        paddle.x-=7;
    }
    if(ball.y+ball.dy<ball.radius){
        ball.dy=-ball.dy;
    } else if(ball.y+ball.radius>canvas.height){
        if(ball.x>paddle.x && ball.x < paddle.x+paddle.width){
            ball.dy=-ball.dy;
            }else{
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
            }
    }
    if(ball.x+ball.dx<ball.radius || ball.x+ball.dx+ball.radius>canvas.width){
        ball.dx=-ball.dx;
    }
    ball.x+=ball.dx;
    ball.y+=ball.dy;

}

function keyDownHandler(e){
    if (e.key=="Right" || e.key=="ArrowRight"){
        rightPressed=true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
  }
}

function keyUpHandler(e){
    if (e.key=="Right" || e.key=="ArrowRight"){
        rightPressed=false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
  }
}

document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUpHandler,false);
let interval = setInterval(draw, 10);
