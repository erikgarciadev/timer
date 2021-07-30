let countdown 
const timerDisplay = document.getElementById("time")
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('.tab')
const btnStart = document.getElementById('btn-start')
const btnStop = document.getElementById('btn-stop')
const btnReset = document.getElementById('btn-reset')
const audio = document.getElementById("myAudio")
let time = 1500
let timeLeft = 0

function timer(seconds, clear=false){
    // clear any existing timers
    clearInterval(countdown)
    
    const now = Date.now()
    const then = now + seconds*1000
    displayTimeLeft(seconds)
    
    if(!clear){
        countdown = setInterval(() => {
           const secondsLeft = Math.round((then - Date.now())/1000)
           timeLeft = secondsLeft
           // check if we should stop it!
           if (secondsLeft < 0){
               playAudio()
               clearInterval(countdown)
               return 
           }
           // display it
           displayTimeLeft(secondsLeft)
       },1000)
    }
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainderSeconds = seconds % 60
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
    timerDisplay.textContent = display
}



function startTextTimer(){
    const seconds = parseInt(this.dataset.time)
    time = seconds
    timeLeft = seconds
    buttons.forEach(button => button.classList.remove("active"))
    this.classList.add("active")
    displayTimeLeft(seconds)
    btnStart.addEventListener('click', startTime )
    if(audio.currentTime > 0){
        audio.pause();
        audio.currentTime = 0;
    }
    timer(seconds, true)
}

function playAudio(){
    audio.play()
}

function startTime(){
    timeLeft <= 0 ? timer(time) : timer(timeLeft)
    btnStart.removeEventListener('click', startTime)
}

function resetTime(){
    const seconds = parseInt(time)
    displayTimeLeft(seconds)
    timer(time)
}

function stopTime(){
    timer(timeLeft,true)
    btnStart.removeEventListener('click', stopTime)
    btnStart.addEventListener('click', startTime )
}

displayTimeLeft(time)

buttons.forEach(button => button.addEventListener('click', startTextTimer ))

btnStart.addEventListener('click', startTime )
btnReset.addEventListener('click', resetTime)
btnStop.addEventListener('click', stopTime)