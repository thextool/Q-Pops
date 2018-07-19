const answer = document.querySelector('#answer')
const answerList = document.querySelector('.answerList')
const h1El = document.getElementById('randomQuote')
const button = document.querySelector('button')
const scoreText = document.querySelector('#scoreText')
let rng = 0
let numberOfQuotesGuessed = 0 
let wrongGuesses = 0
let correctGuesses = 0 
let shouldResetGame = false

//getting quotes from the Breaking Bad and Ron Swanson API

function getBreakingBadQuote() {
    const url = "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
    fetch(url)
        .then(response => response.json())
        .then(quote => appendQuoteBreaking(quote))
}

function getRonSwansonQuote() {
    const url = "https://galvanize-cors.herokuapp.com/http://ron-swanson-quotes.herokuapp.com/v2/quotes"
    fetch(url)
        .then(response => response.json())
        .then(quote => appendQuoteRon(quote))
}

//randomly choosing which API to pull from and adding it to the page

function randomNumberGenerator() {
    return Math.floor((Math.random() * 10) + 1)
}

function selectAPI() {
    rng = randomNumberGenerator()
    return rng % 2 == 0 ? getBreakingBadQuote() : getRonSwansonQuote()
}

selectAPI()

function appendQuoteRon(quote) {
    h1El.innerText = `"${quote}"`
}

function appendQuoteBreaking(quote) {
    h1El.innerText = `"${quote[0].quote}"`
}

//getting a new quote from either API when clicking the new quote button

function changeQuoteButton() {
    button.addEventListener('click', event => {
        numberOfQuotesGuessed = 0
        selectAPI()
        shouldResetGame === true ? resetGame() : null 
    })
}

changeQuoteButton()

//correct or wrong click listeners on the images and adding answers to list below

function breakingBadGuessListener() {
    const guessButton = document.querySelector('#breakingGuess')
    guessButton.addEventListener('click', event => {
        rng % 2 == 0 ? correctAnswer('from Breaking Bad'): wrongAnswer('Ron Swanson')
    })
}

breakingBadGuessListener()

function ronGuessListener() {
    const guessButton = document.querySelector('#ronGuess')
    guessButton.addEventListener('click', event => {
        rng % 2 == 1 ? correctAnswer('Ron Swanson') : wrongAnswer('from Breaking Bad')
    })
}

ronGuessListener()

function correctAnswer(source) {
    answer.innerText = "Correct!"
    if(numberOfQuotesGuessed === 0) {
        correctGuesses += 1
        createAnswerListEl(`Correct it was ${source} - ${h1El.innerText}`)
    }
}

function wrongAnswer(source) {
    answer.innerText = "Incorrect!"
    if(numberOfQuotesGuessed === 0) {
        wrongGuesses += 1 
        createAnswerListEl(`Incorrect it was ${source} - ${h1El.innerText}`)
    }
}

function createAnswerListEl(quote) {
    let listEl = document.createElement('li')
    listEl.setAttribute('class', 'answers')
    listEl.innerText = quote 
    answerList.appendChild(listEl)
    numberOfQuotesGuessed += 1
    endgame()
}

//resets the game after 5 guesses

function endgame() {
    answerList.childElementCount === 5 ? score() : null
}

function score() {
    shouldResetGame = !shouldResetGame
    scoreText.innerText = `You got ${correctGuesses} right and ${wrongGuesses} wrong!`
    button.innerText = 'Play Again'
}

function resetGame() {
    shouldResetGame = !shouldResetGame
    while (answerList.firstChild) {
        answerList.removeChild(answerList.firstChild)
    }
    scoreText.innerText = 'Answer 5 questions go get a score!'
    button.innerText = 'New Quote'
    answer.innerText = ''
    correctGuesses = 0
    wrongGuesses = 0 
}


