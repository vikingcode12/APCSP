var imageArray = ["./posters/blackpanther.jpg", "./posters/blackwidow.jpg", "./posters/captainamerica.jpg", "./posters/captainmarvel.jpg", "./posters/guardians.jpg", "./posters/shangchi.jpg"]
var movieArray = ["Black Panther", "Black Widow", "Captain America", "Captain Marvel", "Guardians of The Galaxy", "Shang Chi"]
var yearArray = [2018, 2021, 2011, 2019, 2014, 2021]
var questionArray = []
var displayedQuestion;

window.onload = () => {
    formatQuestions();
    displayRandomQuestion()
}

function displayRandomQuestion() {
    var i = getRandomInt(questionArray.length-1)
    while (i == displayedQuestion) {
        i = getRandomInt(questionArray.length-1)
    }
    displayedQuestion = i
    idDivPic.innerHTML = formatImage(imageArray, i)
    idDivQuestion.innerHTML = questionArray[i]
}

function formatQuestions() {
    for (let i = 0; i < movieArray.length; i++) {
        questionArray.push(`<h2>What year was ${movieArray[i]} released?</h2>`)
    }
}

function checkAnswer() {
    
}

function formatImage(array, index) {
    return `<img src=${array[index]} width=200 height=300>`
}

function viewAnswerKey() {
    var display = 'This is the answer key. Refresh when finished: <br>'
    for (let i = 0; i < imageArray.length; i++) {
        const array = imageArray;
        display += formatImage(array, i)
        display += `<br> ${yearArray[i]} <br><br>`
    }
    idDivFullAnswerKey.innerHTML = display
}

// returns a random int 0 - input
// Source: memory of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }