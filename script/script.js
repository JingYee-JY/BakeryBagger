const play = document.getElementById("play");
const start = document.getElementById("start");
const again = document.getElementById("again");
const home = document.getElementById("home");

const startPage = document.getElementById("startPage");
const instructionPage = document.getElementById("instructionPage");
const gamePage = document.getElementById("gamePage");
const popUp = document.getElementById("popUp");
const finalPage = document.getElementById("finalPage");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const lose = document.getElementById("lose")

const scoreCount = document.getElementById("score-count")
const questionCount = document.getElementById("question-count")
const game = document.getElementById("game")
const mark = document.getElementById("mark")
const checkAnswer = document.getElementById("checkAnswer")
const showAnswer = document.getElementById("showAnswer")
const correctAnswer = document.getElementById("correctAnswer")
const medal = document.getElementById("medal")
const words1 = document.getElementById("words1")
const words2 = document.getElementById("words2")
const scoreText = document.getElementById("scoreText")

//use this for selection page
const levelButtons = document.querySelectorAll(".levelButton");
const selectionPage = document.getElementById("selectionPage");

//here for selection page
let levelIndex;

let movingSpeed = 8;
//here for level buttons condition
const levels = [
    //example of catch the flower game
    {numberOfBakery:5, typeOfFood:2},
    {numberOfBakery:10, typeOfFood:2},
    {numberOfBakery:20, typeOfFood:2}
]

const foods = ["bread", "cookies1", "cookies2",
                "cookies3", "cupcake1", "cupcake2",
                "cupcake3", "donuts1", "donuts2",
                "pie1", "pie2"]

let startGame;
let swipe;

let current;
let total = 5;
let score;

let tempoArray = [];

//for food size
let size;

let gameBorder

let right, left;

let answer = ["", ""]

//here is answerBtn user can select
const answerBtn = document.querySelectorAll(".answerBtn");

//here is finalV2
const group1 = document.querySelector(".group1");

function touchstart(evt) {
    startingX = evt.touches[0].clientX
    startingY = evt.touches[0].clientY
}
function touchmove(evt) {
    movingX = evt.touches[0].clientX
    movingY = evt.touches[0].clientY
} 

Input()

function Input() {
    window.addEventListener("keydown", handleInput, {once: true})
}

async function handleInput(e){
    if(startGame == true & swipe == false){
        switch(e.key){
        case "ArrowLeft":
            left = true
            swipe = true;    
        break
        case "ArrowRight":
            right = true
            swipe = true;
        break
        default:
            Input()
        return
        }
        Input()
    }
    else{
        console.log("d")
        Input()
    }
}

function control(){
    if(startGame == true & swipe == false){
        console.log(startingX)
        console.log(movingX)
        if(startingX + 100 < movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
          console.log("right")
          right = true
          moving()
        }
        else if(startingX-100 > movingX && movingX !== null && startingY + 100 > movingY && startingY-100 < movingY){
          console.log("left")
          left = true
          moving()
        }
      else if(swipe != true){
        console.log("f")
          return
      }
      swipe = true;
}
}

play.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        startPage.classList.add("hide")
        
        //use this for selection page
        selectionPage.classList.remove("hide")
        
        //else
        /*instructionPage.classList.remove("hide")*/
    }, 200);
})

start.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        instructionPage.classList.add("hide")
        gamePage.classList.remove("hide")
        startGame = true
        swipe = false
        ready()
        Question()
    }, 200);
})

levelButtons.forEach(function(level){
    level.addEventListener('click', () => {
        playClickSound()
        setTimeout(() => {
            levelIndex = level.getAttribute("data-level") - 1
            selectionPage.classList.add("hide")
            instructionPage.classList.remove("hide")
        }, 200);
    })    
})

answerBtn.forEach(function(button){
    button.addEventListener('click', () => {
        playClickSound()
        console.log(answer.image, answer.answer)

        let data  = button.getAttribute("data")

        popUp.classList.remove("hide")
        
        correctAnswer.src = answer.image

        if(data == answer.answer){
            mark.src = "./img/correct.png"
            checkAnswer.textContent = "Correct!"
            showAnswer.classList.add("hide")
            score +=1
            scoreCount.textContent = score;
        }
        else{
            mark.src = "./img/wrong.png"
            checkAnswer.textContent = "Good try!"
            showAnswer.classList.remove("hide")
        }
        
        setTimeout(function(){
            popUp.classList.add("hide");
            if(current == total){
                gamePage.classList.add("hide")
                endGame()
            }
            else{
                Question()
            }
        }, 2000)
    })    
})

again.addEventListener("click", () => {
  playClickSound()
  //controls amd buttons visibility
  let delay = setTimeout(() => {
    startPage.classList.remove("hide");
    finalPage.classList.add("hide")
  }, 200);
});

home.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    location.assign('https://gimme.sg/activations/minigames/main.html');
  }, 200);
})


function ready(){
    //code here to get UI ready 
    //like number of point to zero and others

    total = levels[levelIndex].numberOfBakery
    current = 0;
    questionCount.textContent = current + "/" + total

    score = 0;
    scoreCount.textContent = score

    resetArray()
}

function resetArray(){
    tempoArray = []

    for(let i = 0; i < foods.length; i++){
        tempoArray.push(foods[i])
    }
}

function Question(){
    //game that starts the game like showing question and stuff
    current +=1;
    questionCount.textContent = current + "/" + total;

    let shownFood = [];

    //get size of game container and reset images
    gameBorder = game.getBoundingClientRect();
    game.innerHTML = ""
     
    //change spacing depend on screen size
    if(gameBorder.width < 500){
        size = 100
    }
    else{
        size = 200
    }

    //select 2 random food
    for(let j = 0; j < levels[levelIndex].typeOfFood; j++){
        let twoRandomFood = Math.floor(Math.random() * tempoArray.length)

        shownFood.push(tempoArray[twoRandomFood]);
        answer[j] = tempoArray[twoRandomFood]
        tempoArray.splice(twoRandomFood,1);
        
        let answerFood = document.createElement('div')
        answerFood.innerHTML = `<img src="./img/${answer[j]}.png">` 
        answerFood.classList.add("answer")

        answerFood.y = Math.floor(gameBorder.height /4)
        answerFood.x= Math.floor(gameBorder.width /12)
        answerFood.style.bottom = answerFood.y + "px"
        if(j == 0){
            answerFood.style.left = (gameBorder.width - size - answerFood.x) + "px"
        }
        else{
            answerFood.style.left = answerFood.x + "px"
        }

        game.appendChild(answerFood)

    }

    for(let i = 0; i < levels[levelIndex].numberOfBakery; i++){
        let randomFood = Math.floor(Math.random() * shownFood.length)
        
        let food = document.createElement('div')
        food.innerHTML = `<img src="./img/${shownFood[randomFood]}.png">` 
        food.classList.add("foods")
        food.classList.add(shownFood[randomFood])

        //set position
        food.y = Math.floor(gameBorder.height /4) + (size + 50) * i
        food.x = Math.floor(gameBorder.width /2) - (size / 2)
        food.style.bottom = food.y + "px"
        food.style.left = food.x + "px"
        game.appendChild(food)
    }
}

function moveOthers(){
    if(startGame){
        let allFoods = document.querySelectorAll(".foods")
        let answerFood = document.querySelector(".answer")

        let done  = false

        allFoods.forEach(function(food){
            food.y -= movingSpeed
            food.style.bottom = food.y + "px"

            if(food.y <= answerFood.y){
                food.y = answerFood.y
                food.style.bottom = food.y + "px"
                done = true
            }
        })

        if(done){
            cancelAnimationFrame(otherAnimation)
        }
        else{
            otherAnimation = window.requestAnimationFrame(moveOthers);
        }
    }
}

function moving(){
    if(startGame){
        let firstFood = document.querySelector(".foods")

        function reach(answer){
            firstFood.classList.add("fadedIn")
            setTimeout(function(){
                if(firstFood.classList.contains(answer)){
                    score +=1
                    scoreCount.textContent = score;
                }
                firstFood.remove();
                if(current != total){
                    current += 1
                    questionCount.textContent = current + "/" + total
                    moveOthers()
                }
                else{
                    endGame()
                }
            }, 1000)
        }
        if(right){
            firstFood.x += movingSpeed;
            firstFood.style.left = firstFood.x + "px" 
            if(firstFood.x > (gameBorder.width - size)){
                right = false
                swipe = false
                reach(answer[0])
            }
        }
        if(left){
            firstFood.x -= movingSpeed;
            firstFood.style.left = firstFood.x + "px" 
            if(firstFood.x < 0){
                left = false
                swipe = false
                reach(answer[1])
            }
        }

        if(!right & !left){
            cancelAnimationFrame(animation)
        }
        else{
            animation = window.requestAnimationFrame(moving);
        }
    }
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function endGame(){
    finalPage.classList.remove("hide")

    let pass = total / 2

    //this is for second version
    let starScore = total / 5;
    //change the star image according the score;
    if(score < pass){
        lose.currentTime = 0
        lose.play()
        if(score == starScore + starScore)
                medal.src = "./img/youTried.png"
            else if(score < starScore + starScore && score >= starScore) // score < 2 && score >= 1
                medal.src = "./img/youTried1.png"
            else
                medal.src = "./img/youTried2.png"
        
        group1.classList.add("group1V2")
        scoreText.textContent = "Good try!"
        scoreText.classList.add("scoreTextV2")
        words1.classList.add("words1V2")
        words2.classList.add("words2V2")
        words1.innerHTML = "Your score"
    }
    else{
        clap.currentTime = 0
        clap.play()
        if(score == total) // score = 5
            medal.src = "./img/excellent.png"
        else if(score < total && score >= total - starScore) // score < 5 && score >= 4
            medal.src = "./img/wellDone.png"
        else if(score < total - starScore && score >= (total - starScore - starScore)) // score < 4 && score >= 3
            medal.src = "./img/wellDone1.png"

        group1.classList.add("group1V2")
        words1.classList.add("words1V2")
        words2.classList.add("words2V2")

        scoreText.classList.add("scoreTextV2")
        
        if(score == total){
            scoreText.textContent = "Superstar!"
        }
        else{
            scoreText.textContent = "Good try!"
        }
        setTimeout(function(){
            confetti.start()
            setTimeout(function(){
                confetti.stop()
            }, 2000)
        }, 500)
    }
    words1.innerHTML = "Your score"
    words2.textContent = score + "/" + total
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });