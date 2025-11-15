


document.querySelector("html").addEventListener("keydown", handlerKey);

const main=document.querySelector("main");
const game=document.querySelector(".game");

const dino = document.querySelector('.dino');


const obstacles=[];
let lastTimeObstacle=0;
let timeBetwennObstacle=30;
let vitesse=15;

let coordYDino = 250;
let countTimeJumpAnim = 0;
let dinoOnJump=false;

let score=0;
let coordScore=[0,280];
let scoreInMove=false;
let alreadyMoveScore=false;
const nbScore=document.querySelector("#nbScore")

const title1=document.querySelector('.title1')
const title2=document.querySelector('.title2')
let coordTitle1=[1700,400];
let coordTitle2=[1600,400];
let title1InMove=false;
let alreadyMoveTitle1=false;
let title2InMove=false;
let alreadyMoveTitle2=false;

let countTimeGame=0;
let gameOn=false;
let gameover=false;
const intervalGame=setInterval(drawGame ,30);


function handlerKey(event) {
    console.log(event);
    switch (event.key) {
        case 'ArrowUp':
            if (gameOn){
                dinoOnJump=true;
            }
            break;
        case "Enter":
            if(!gameover){
                main.removeChild(document.querySelector('p'));
                gameOn=true;
            } else{
                main.removeChild(document.querySelector('p'));
                reloadGame()
            }
            break;
        case " ":
            gameOn=false;
            break;
    }
}

function generateObstacle(){
    const element=document.createElement('div');
    element.classList.add('obstacle');
    element.style.transform=`translate(${1000}px,197px)`
    game.append(element)
    const obstacle={
        element:element,
        posx:1000,
    }
    obstacles.push(obstacle);
}

function drawGame(){
    if (gameOn){
        ++countTimeGame;
        moveObstacle()
        if (score>700 && !alreadyMoveScore ){
            timeBetwennObstacle=80;
            alreadyMoveScore=true
            scoreInMove=true
        } else if (score>500 && !alreadyMoveTitle1 ){
            timeBetwennObstacle=160;
            alreadyMoveTitle1=true
            title1InMove=true
        }else{
            if(lastTimeObstacle+timeBetwennObstacle<countTimeGame){
                generateObstacle();
                lastTimeObstacle=countTimeGame;
                timeBetwennObstacle=generateNumberAlea(18,80);
            }
        }
        if (dinoOnJump){
            moveDinoOnJump()
        }

        if (title1InMove){
            title1.style.transform=`translate( ${coordTitle1[0]}px , ${coordTitle1[1]}px)`
            coordTitle1[0]-=vitesse;
            const coorddino=dino.getBoundingClientRect();
            const coord=title1.getBoundingClientRect()
            if (coorddino.bottom>coord.top){
                if(coorddino.left+50<coord.right &&coorddino.left+50>coord.left){
                    terminateGame()
                }
            }
            if (coordTitle1[0]<600){
                title1InMove=false
                title2InMove=true
                title1.style.transform=`translate( 0px , 0px)`
            }
        }
        if (title2InMove){
            title2.style.transform=`translate( ${coordTitle2[0]}px , ${coordTitle2[1]}px)`
            coordTitle2[0]-=vitesse;
            const coorddino=dino.getBoundingClientRect();
            const coord=title2.getBoundingClientRect()
            if (coorddino.bottom>coord.top){
                if(coorddino.left+50<coord.right &&coorddino.left+50>coord.left){
                    terminateGame()
                }
            }
            if (coordTitle2[0]<500){
                title2InMove=false
                title2.style.transform=`translate( 0px , 0px)`
            }
        }

        if (scoreInMove){
            nbScore.style.transform=`translate( ${coordScore[0]}px , ${coordScore[1]}px)`
            coordScore[0]-=vitesse;
            const coorddino=dino.getBoundingClientRect();
            const coord=nbScore.getBoundingClientRect()
            if (coorddino.bottom>coord.top){
                if(coorddino.left+50<coord.right &&coorddino.left+50>coord.left){
                    terminateGame()
                }
            }
            if (coordScore[0]<-1000){
                scoreInMove=false
                nbScore.style.transform=`translate( 0px , 0px)`
            }
        }
        score+=1
        nbScore.textContent="0".repeat(5-(score).toString().length)+score
        if(score%500===0){
            vitesse+=5
        }
        checkGameOver()
            
    }

}

function moveDinoOnJump(){
    if (countTimeJumpAnim<10){
        coordYDino-=20-countTimeJumpAnim;
    } else {
        coordYDino+=5+countTimeJumpAnim-10;
    }
    if (coordYDino>250){
        dinoOnJump=false;
        coordYDino=250;
        countTimeJumpAnim=0;
    }
    dino.style.transform=`translate(100px,${coordYDino}px)`;
    ++countTimeJumpAnim;

}

function moveObstacle(){
    obstacles.forEach((item,index) => {
        item.posx-=vitesse;
        if (item.posx<0){
            obstacles.splice(index,1);
            game.removeChild(item.element)
        }
        item.element.style.transform=`translate(${item.posx}px,197px)`
    });
}   



function checkGameOver(){
    const coorddino=dino.getBoundingClientRect();
    obstacles.forEach(item => {
        const coord=item.element.getBoundingClientRect();
        if (coorddino.bottom>coord.top){
            if(coorddino.left+50<coord.right &&coorddino.left+50>coord.left){
                terminateGame()
            }
        }
    });
}

function terminateGame(){
    gameover=true;
    gameOn=false
    const p=document.createElement('p')
    p.id='pStart'
    p.textContent="Press enter for restart" 
    main.prepend(p); 
}

function reloadGame(){
    for (let i=obstacles.length-1;i>=0;--i){
        game.removeChild(obstacles[i].element);
        obstacles.splice(i,1);
    }
    lastTimeObstacle=0;
     timeBetwennObstacle=30;
     vitesse=15;

     coordYDino = 250;
     countTimeJumpAnim = 0;
     dinoOnJump=false;

     score=0;
     coordScore=[0,280];
     scoreInMove=false;
     alreadyMoveScore=false;

     coordTitle1=[1700,400];
     coordTitle2=[1600,400];
     title1InMove=false;
     alreadyMoveTitle1=false;
     title2InMove=false;
     alreadyMoveTitle2=false;

     nbScore.style.transform=`translate( 0px , 0px)`
     title1.style.transform=`translate( 0px , 0px)`
     title2.style.transform=`translate( 0px , 0px)`
     dino.style.transform=`translate(100px,${coordYDino}px)`;
     countTimeGame=0;
     gameOn=true;
     gameover=false;
    
}
function generateNumberAlea(min,max){
  return Math.floor(Math.random() * (max - min) )+ min;
}

