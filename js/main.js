let direction = {x:0, y:0}
const eatSound = new Audio("sounds/food.mp3")
const moveSound = new Audio("sounds/Snake.mp3")
let speed = 5
let lastPaintTime = 0
let snakeArr = [{x: 15, y: 17}]
inputDir = {x: -1, y: 0}
food ={x: 3, y: 5}
let score = 0

function isCollide(snake){
    if(snakeArr[0].x > 24 || snakeArr[0].x < 0 ||snakeArr[0].y > 24 || snakeArr[0].y < 0){
        return true
    }
    for (let index = 1; index < snakeArr.length; index++) {
    if(snakeArr[0].x === snakeArr[index].x && snakeArr[0].y === snakeArr[index].y){
        return true 
        }
    }
    return false
}

function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return
    }
    lastPaintTime = ctime
    window.requestAnimationFrame(main)
    gameEngine();
}

// const songs = [
//     new Audio("sounds/Nagin_Instru.mp3"),
//     new Audio("sounds/Snake_remix.mp3"),
//     new Audio("sounds/Nagin_BGM.mp3"),
//     new Audio("sounds/background-music-video-mobile-game.mp3")
//   ]

function gameEngine(){ 
    if(snakeArr.length > 5){
        speed = 8
    }
    if(snakeArr.length > 10){
        speed = 12
    }
    if(isCollide(snakeArr)){
        score = 0
        speed = 5
        eatSound.play()
        inputDir = {x: 0, y: 0}
        alert("Game Over! Press any key to continue...")
        scoretext.innerHTML = "Score: " + score
        snakeArr = [{x:13, y:15 }]
    }
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        moveSound.play()
        score += 1
        scoretext.innerHTML = "Score: " + score
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        food = {x: Math.round(Math.random() * 24), y: Math.round(Math.random() * 24)}
    }
    for(let i = snakeArr.length - 2; i >= 0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    box.innerHTML = ""
    snakeArr.forEach((e, index)=>{
        snakeBody = document.createElement('div')
        snakeBody.style.gridRowStart = e.x
        snakeBody.style.gridColumnStart = e.y
        if(index === 0){
            snakeBody.classList.add('head')
        }
        else{
            snakeBody.classList.add('snake')
        }
        box.appendChild(snakeBody)
    })
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.x
    foodElement.style.gridColumnStart = food.y
    foodElement.classList.add('food')
    box.appendChild(foodElement)
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: -1, y: 0}
    switch (e.key) {
        case 'ArrowUp':
            console.log("arrowup")
            inputDir = {x: -1, y: 0}
            break;
        case 'ArrowDown':
            inputDir = {x: 1, y: 0}
            console.log("arrowdown")
            break;
        case 'ArrowLeft':            
            inputDir = {x: 0, y: -1}
            console.log("arrowleft")
            break;
        case 'ArrowRight':
            console.log("arrowright")
            inputDir = {x: 0, y: 1}
            break;
        default:
            break;
    }
})