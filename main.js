//テトリスメイン

const BLOCK_SIZE_X = 30;
const BLOCK_SIZE_Y = 30;
const TETORO_SIZE_X = 4;
const TETORO_SIZE_Y = 4;

//ゲームサイズ
const GAME_SIZE_X = 10;
const GAME_SIZE_Y = 20;

const GAME_START_X = GAME_SIZE_X/2 - TETORO_SIZE_X/2;
const GAME_START_Y =0;

//キャンバスサイズ
const CANVAS_X = BLOCK_SIZE_X * GAME_SIZE_X+200;
const CANVAS_Y = BLOCK_SIZE_Y * GAME_SIZE_Y;


const LINE_W = BLOCK_SIZE_X * GAME_SIZE_X;
const LINE_H = BLOCK_SIZE_Y * GAME_SIZE_Y;



const TETRO_TYPES = [

    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],

    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
    ],


]

const TETORO_COLORS = [
    "#000",
    "#6CF",
    "#F92",
    "#66F",
    "#C5C",
    "#FD2",
    "#F44",
    "#6B6",

]




let tetroData;
let nextTetroData;
let tetro_x = GAME_START_X;
let tetro_y = GAME_START_Y;
let gameField = new Array();
let tetroType = 0;
let nextTetroType = 0;
let gameOver = false;

const GAME_SPEED = 500;



function init()
{


    for(let y=0; y<GAME_SIZE_Y;y++)
    {
        gameField[y] = new Array();
    
        for(let x = 0; x < GAME_SIZE_X; x++ )
        {
    
            gameField[y][x] = 0;
        }
    }

    nextTetroType = Math.floor( Math.random()*(TETRO_TYPES.length-1) )+1;
    nextTetroData = TETRO_TYPES[nextTetroType];

    setTetro();

}

function setTetro()
{
  

    tetroType = Math.floor( Math.random()*(TETRO_TYPES.length-1) )+1;

    tetroData = TETRO_TYPES[tetroType];


}



var gameCanvs = document.getElementById("canvas");
var context = gameCanvs.getContext("2d");

gameCanvs.width = CANVAS_X;
gameCanvs.height = CANVAS_Y;

//gameCanvs.style.border = "10px solid #00FFFF";


function drawBlock(x,y,color)
{
    let px = x * BLOCK_SIZE_X
    let py = y * BLOCK_SIZE_Y
    context.fillStyle = TETORO_COLORS[color];
    context.fillRect(px, py, BLOCK_SIZE_X, BLOCK_SIZE_Y);
    context.strokeStyle = "#000000";
    context.strokeRect(px, py, BLOCK_SIZE_X, BLOCK_SIZE_Y);
}


function gameDraw()
{
    drawField();
    drawTetro();
    nextDrawTetro(320,0);


    if(gameOver)
    {
        
        let s = "GAME OVER";
        context.font = "40px 'MS ゴシック' ";

        let w = context.measureText(s).width;


        let x = CANVAS_X/2 -w/2;
        let y = CANVAS_Y/2 -20;

        context.lineWidth = 4;
        context.strokeText(s,x,y);
        context.fillStyle ="white";
        context.fillText(s,x,y);

    }

}

function drawField()
{
    context.clearRect(0,0,CANVAS_X,CANVAS_Y)

    for (let y = 0; y < GAME_SIZE_Y; y++) {
        for (let x = 0; x < GAME_SIZE_X; x++) {

            if (gameField[y][x]) {
 
                drawBlock(x,y,gameField[y][x]);
            }
    
        }
    }

    context.strokeStyle = "#000000";
    context.strokeRect(0,0,LINE_W,LINE_H);


    context.strokeStyle = "#000000";
    context.strokeRect(LINE_W+10,0,120,120);


}



function drawTetro()
{
    for (let y = 0; y < TETORO_SIZE_Y; y++) {
        for (let x = 0; x < TETORO_SIZE_X; x++) {
            if (tetroData[y][x]) {

                drawBlock(tetro_x+ x,tetro_y + y,tetroType);
            }
    
        }
    }
}

function nextDrawTetro(nx,ny)
{
    

    for (let y = 0; y < TETORO_SIZE_Y; y++) {
        for (let x = 0; x < TETORO_SIZE_X; x++) {
            
            if (nextTetroData[y][x]) {


                let px = nx + x *BLOCK_SIZE_X;
                let py = ny + y * BLOCK_SIZE_Y;
                context.fillStyle = TETORO_COLORS[nextTetroType];
                context.fillRect(px, py, BLOCK_SIZE_X, BLOCK_SIZE_Y);
                context.strokeStyle = "#000000";
                context.strokeRect(px, py, BLOCK_SIZE_X, BLOCK_SIZE_Y);






                
            }
        }
    }
}



init();
gameDraw();

setInterval(dropTetro,GAME_SPEED);

document.onkeydown = function (e) {
    const keyCode = e.code;


    if(gameOver) return;
    console.log(keyCode);
    switch (keyCode) {
        case 'ArrowLeft':
            //console.log("左");
            if( checkMove(-1,0) ) tetro_x--;
            break;
        case 'ArrowUp':
            //console.log("上");
            if( checkMove(0,-1) ) tetro_y--;

            break;
        case 'ArrowRight':
            //console.log("右");
            if( checkMove(1,0) ) tetro_x++;
            break;
        case 'ArrowDown':
            //console.log("下");
            if( checkMove(0,1) ) tetro_y++;
            break;
        case 'Space':
            console.log("スペース");

            let newTetroData = rotate();

            if( checkMove(0,0,newTetroData) ) tetroData = newTetroData;

            break;

    }

 gameDraw();

}

function rotate()
{
    let newTetroData = new Array();

    for (let y = 0; y < TETORO_SIZE_Y; y++) {

        newTetroData[y] = new Array();

        for (let x = 0; x < TETORO_SIZE_X; x++) {

            newTetroData[y][x] = tetroData[TETORO_SIZE_Y - x -1][y];
    
        }
    }

    return newTetroData;


}

function checkMove(mx,my,newTetroData)
{

    if(newTetroData == undefined ) newTetroData = tetroData;


    for (let y = 0; y < TETORO_SIZE_Y; y++) {
        for (let x = 0; x < TETORO_SIZE_X; x++) {

            if (newTetroData[y][x]) {

                let checkX = tetro_x + mx + x;
                let checkY = tetro_y + my + y;


                if( checkY < 0  || checkY >= GAME_SIZE_Y ||  checkX < 0 || checkX >= GAME_SIZE_X )
                {
                    return false;

                }
                else if( gameField[checkY][checkX] )
                {
                    return false
                }

            }
            
    
        }
    }
    return true;
}


function fixTetro()
{
    for (let y = 0; y < TETORO_SIZE_Y; y++) {
        for (let x = 0; x < TETORO_SIZE_X; x++) {
            if (tetroData[y][x]) {

                gameField[tetro_y+y][tetro_x+x] = tetroType;
            }
    
        }
    }

}


function checkLine()
{
    let lineCnt=0;
 
    for (let y = 0; y < GAME_SIZE_Y; y++) {
 
        let flg = true;
 
        for (let x = 0; x < GAME_SIZE_X; x++) {

            if( !gameField[y][x] ) 
            {
                flg = false;
                break;
            }
    
        }

        if(flg)
        {
            lineCnt++;

            for(let ny =y; ny >0 ; ny--)
            {
                for(let nx =0; nx<GAME_SIZE_X;nx++)
                {

                    gameField[ny][nx] = gameField[ny-1][nx];
                }
            }

        }
    }

}


function dropTetro()
{

    if(gameOver) return;

    if( checkMove(0,1) ) tetro_y++;
    else
    {
        fixTetro();
        checkLine();


        tetroType = nextTetroType;
        tetroData = TETRO_TYPES[tetroType];
        tetro_y = GAME_START_Y;
        tetro_x = GAME_START_X;

        nextTetroType = Math.floor( Math.random()*(TETRO_TYPES.length-1) )+1;
        nextTetroData = TETRO_TYPES[nextTetroType];


        //tetroType = Math.floor( Math.random()*(TETRO_TYPES.length-1) )+1;    

        if( !checkMove(0,0) )
        {
            gameOver = true;
        }
    }

    gameDraw();

}