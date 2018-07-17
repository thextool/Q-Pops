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
    return randomNumber = Math.floor((Math.random() * 10) + 1)
}

function selectAPI() {
    return randomNumberGenerator() % 2 == 0 ? getBreakingBadQuote() : getRonSwansonQuote()
}

selectAPI()

function appendQuoteRon(quote) {
    const h1El = document.getElementById('randomQuote')
    h1El.innerText = quote
}
function appendQuoteBreaking(quote) {
    const h1El = document.getElementById('randomQuote')
    h1El.innerText = quote[0].quote
}

function changeQuoteButton() {
    const button = document.querySelector('button')
    button.addEventListener('click', event => {
        selectAPI()
    })
}

changeQuoteButton()

