let rng = 0
const answer = document.querySelector('#answer')
const answerList = document.querySelector('.answerList')
const h1El = document.getElementById('randomQuote')

function getBreakingBadQuote() {
    const url = "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
    fetch(url)
        .then(response => response.json())
        .then(quote => appendQuoteBreaking(quote))
        .then(console.log('bad'))
}

function getRonSwansonQuote() {
    const url = "http://ron-swanson-quotes.herokuapp.com/v2/quotes"
    fetch(url)
        .then(response => response.json())
        .then(quote => appendQuoteRon(quote))
        .then(console.log('Ron'))
}

function randomNumberGenerator() {
    return Math.floor((Math.random() * 10) + 1)
}

function selectAPI() {
    rng = randomNumberGenerator()
    return rng % 2 == 0 ? getBreakingBadQuote() : getRonSwansonQuote()
}

selectAPI()

function appendQuoteRon(quote) {
    h1El.innerText = quote
}
function appendQuoteBreaking(quote) {
    h1El.innerText = quote[0].quote
}

function changeQuoteButton() {
    const button = document.querySelector('button')
    button.addEventListener('click', event => {
        selectAPI()
    })
}

changeQuoteButton()

function breakingBadGuessListener() {
    const guessButton = document.querySelector('#breakingGuess')
    guessButton.addEventListener('click', event => {
        rng % 2 == 0 ? correctAnswer(): answer.innerHTML = "wrong"
    })
}

breakingBadGuessListener()

function ronGuessListener() {
    const guessButton = document.querySelector('#ronGuess')
    guessButton.addEventListener('click', event => {
        rng % 2 == 1 ? correctAnswer() : answer.innerHTML = "wrong"
    })
}

function correctAnswer() {
    answer.innerText = "correct"
    createAnswerListEl(`${h1El.innerText} Correct`)
}

function createAnswerListEl(quote) {
    let listEl = document.createElement('li')
    listEl.innerText = quote 
    answerList.appendChild(listEl)
}

ronGuessListener()


