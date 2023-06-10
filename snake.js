let canvas=document.getElementById('canvas');
let ctx=canvas.getContext('2d');

const box=20;
let count=0;
let snake=[];
snake[0]={
    x: 0,
    y: 0
}
let d='Right';
let fruit =new Fruit();
fruit.picklocation();

let l1=document.getElementById('audio1');
const a1=function(){
    l1.play();
}
let l2=document.getElementById('audio2');
const a2=function(){
    l2.play();
}

document.addEventListener('keydown',(e)=>{
    let j=e.key.replace('Arrow','');
    if(d===undefined)
        d=j;
    else{
        if(j==='Up' && d!=='Down')
            d=j;
        else if(j==='Down' && d!=='Up')
            d=j;
        else if(j==='Left' && d!=='Right')
            d=j;
        else if(j==="Right" && d!=='Left')
            d=j;
    }
});
$(document).ready(function(){
    $('#pause').click(function(){
        clearInterval(game);
        $(this).prop('disabled',true);
        $('#resume').prop('disabled',false);
    })
    $('#resume').click(function(){
        game=setInterval(function(){
            requestAnimationFrame(draw)
        }, 200);
        $(this).prop('disabled',true);
        $('#pause').prop('disabled',false);
    })
})
function draw(){
    ctx.fillStyle="green";
    ctx.strokeStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeRect(0,0,canvas.width,canvas.height);
    fruit.Draw();
    for(let i=0;i<snake.length;i++)
    {
        ctx.fillStyle=(i===0)?"orange":"skyblue";
        ctx.strokestyle="black"
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    let SnakeX=snake[0].x;
    let SnakeY=snake[0].y;
    switch(d)
    {
        case "Up":  SnakeY-=box;
        break;
        case "Down":  SnakeY+=box;
        break;
        case "Left":  SnakeX-=box;
        break;
        case "Righr":  SnakeX+=box;
        break;
        default:    SnakeX+=box;
    }
    if(SnakeX===fruit.X && SnakeY===fruit.Y)
    {
        count++;
        document.querySelector('.score span').innerHTML= count;
        a1();
        fruit.picklocation();
    }
    else{
        snake.pop();
    }
    let collision=function(){ 
        for(let i=0; i<snake.length;i++)
        {
            if(SnakeX===snake[i].x && SnakeY===snake[i].y)
                return true;
        }
        return false;
    }
    if(SnakeX<0 || SnakeY<0 || SnakeY>=canvas.height || SnakeX>= canvas.width || collision())
    {   
        document.getElementById('over').style.visibility="visible";
        $('#pause').prop('disabled',true);
        $('#resume').prop('disabled',true);
        a2();
        clearInterval(game);
    }
    let newHead={
        x:SnakeX,
        y:SnakeY
    }
    snake.unshift(newHead);
}

let game=setInterval(function(){
    requestAnimationFrame(draw)
}, 200);