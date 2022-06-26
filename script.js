const start = document.getElementById('start')
const next = document.getElementById('next')
const finish = document.getElementById('finish')
const questionElement = document.getElementById('question-title')
const answersContainer = document.getElementById('answers-container')
let shuffledQuestions, currentIndex;
let count = 0

start.addEventListener('click', startGame)
next.addEventListener('click', ()=>{
    currentIndex++;
    setNextQuestion();
    clearBody()
})
finish.addEventListener('click', ()=>{
    questionElement.innerText = `Your score is ${count} out of ${questions.length}`
    finish.classList.add('hide')
    start.classList.remove('hide')
    start.innerText = 'restart'
    clearBody()
    resetState()
})


function startGame(){
    start.classList.add('hide')
    next.classList.remove('hide')
    shuffledQuestions = questions.sort(()=> Math.random() - .5)
    currentIndex = 0
    resetState()
    showQuestion(shuffledQuestions[currentIndex])
    count = 0
}


function showQuestion(question){
    questionElement.innerText = question.question
    answersContainer.classList.remove('hide')
    question.answers.sort(()=> Math.random() - .5);
    question.answers.forEach((answer)=>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer-btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answersContainer.appendChild(button)
    })
}

function setNextQuestion(){
    resetState()
    lastQuestion()
    showQuestion(shuffledQuestions[currentIndex])
}

function resetState(){
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    Array.from(answersContainer.children).forEach((button)=>{
        if(correct){
            document.body.classList.add('correct')
        }
        else{
            document.body.classList.add('wrong')
        }
        setStatusClass(button, button.dataset.correct)
        button.removeEventListener('click', selectAnswer)
    })
    if(correct){
        count++
        console.log(count);
    }
}

function setStatusClass(element, correct){
    if (correct) {
        element.classList.add('correct')
      } else {
        element.classList.add('wrong')
      }
}

function lastQuestion(){
    if(currentIndex === questions.length - 1){
        next.classList.add('hide')
        finish.classList.remove('hide')
    }
}

function clearBody(){
    document.body.classList.remove('wrong')
    document.body.classList.remove('correct')  
}

const questions = [
    {
        question: 'Who won the most races in f1 history?',
        answers:[
            {
                text: 'Schumacher', correct: false
            },
            {
                text: 'Hamilton', correct: true
            },
            {
                text: 'Vettel', correct: false
            },
            {
                text: 'Senna', correct: false
            }
        ]
    },
    {
        question: 'Who is the youngest f1 champion ever?',
        answers:[
            {
                text: 'Alonso', correct: false
            },
            {
                text: 'Hamilton', correct: false
            },
            {
                text: 'Vettel', correct: true
            },
            {
                text: 'Verstappen', correct: false
            }
        ]
    },
    {
        question: 'Who is the last ferrari champion?',
        answers:[
            {
                text: 'Alonso', correct: false
            },
            {
                text: 'Schumacher', correct: false
            },
            {
                text: 'Vettel', correct: false
            },
            {
                text: 'Raikkonen', correct: true
            }
        ]
    },
    {
        question: 'Who won monaco grand prix most times ever?',
        answers:[
            {
                text: 'Hamilton', correct: false
            },
            {
                text: 'Schumacher', correct: false
            },
            {
                text: 'Prost', correct: false
            },
            {
                text: 'Senna', correct: true
            }
        ]
    }
]

