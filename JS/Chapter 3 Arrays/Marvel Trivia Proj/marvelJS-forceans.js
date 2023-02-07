//THIS JS FORCES THE USER TO ANSWER THE QUESTIONS, HOWEVER THIS SEEMED TO BE ANTI-USER FRIENDLY SO IT WAS SCRAPPED

// Image Citations:
// Black Panther: https://www.amazon.com/PosterOffice-Black-Panther-Movie-Poster/dp/B079Z2DNDR/ref=asc_df_B079Z2DNDR/?tag=hyprod-20&linkCode=df0&hvadid=309837868223&hvpos=&hvnetw=g&hvrand=9639389235403603581&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9021735&hvtargid=pla-568496468627&psc=1&tag=&ref=&adgrpid=64520921227&hvpone=&hvptwo=&hvadid=309837868223&hvpos=&hvnetw=g&hvrand=9639389235403603581&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9021735&hvtargid=pla-568496468627
// Black Widow: https://www.amazon.com/Black-Widow-Movie-Poster-Authenticity/dp/B08B4CFVTJ
// Captain America: https://www.amazon.com/POSTER-STOP-ONLINE-Captain-America/dp/B08Z82QX9Y
// Captain Marvel: https://www.amazon.com/CAPTAIN-MARVEL-POSTER-ORIGINAL-Version/dp/B07NNT8K3P
// Guardians: https://www.amazon.com/Guardians-Galaxy-Movie-24x36-Poster/dp/B00LM3PI1U
// Shang Chi: https://www.amazon.com/Trends-International-Shang-Chi-Rings-Teaser-Unframed/dp/B09BK3YVP9/ref=asc_df_B09BK3YVP9/?tag=hyprod-20&linkCode=df0&hvadid=540971280956&hvpos=&hvnetw=g&hvrand=2168267742501781273&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9021735&hvtargid=pla-1410488457331&psc=1
// Unofficial Spider-Man No Way Home: https://youtu.be/OIfS9lZeFpc?t=528
var imageArray = ["./posters/blackpanther.jpg", "./posters/blackwidow.jpg", "./posters/captainamerica.jpg", "./posters/captainmarvel.jpg", "./posters/guardians.jpg", "./posters/shangchi.jpg", "./posters/spiderman.jpg"]
var movieArray = ["Black Panther", "Black Widow", "Captain America", "Captain Marvel", "Guardians of The Galaxy", "Shang Chi", "Spiderman: No Way Home"]
var yearArray = [2018, 2021, 2011, 2019, 2014, 2021, 2021]
var questionNum;
var score = 0;
var rounds = -1;
const TOTAL_ROUNDS = 20;
var answered = true;
// var questionArray = []

window.onload = () => {
    displayRandomQuestion();
    //formatQuestion();
}

function checkAnswer() {

}

// function displayRandomQuestion() {
//     var i = getRandomInt(questionArray.length-1)
//     //Prevent Getting The Same Question Twice
//     while (i == questionNum) {
//         i = getRandomInt(questionArray.length-1)
//     }
//     displayedNum = i
//     idDivPic.innerHTML = formatImage(imageArray, i)
//     idDivQuestion.innerHTML = questionArray[i]
// }

// function formatQuestions() {
//     for (let i = 0; i < movieArray.length; i++) {
//         questionArray.push(`<h2>What year was ${movieArray[i]} released?</h2>`)
//     }
// }
        
function displayRandomQuestion() {
    if(!answered) return alert("Please provide a response and check it.")
    rounds++
    if(rounds > TOTAL_ROUNDS) return idDivAnswerBreak.innerHTML = `<h2>Trivia Complete! Your score was ${score}/20. <br> Please press start over.</h2>`
    answered = false;
    //Get a random question number
    var i = getRandomInt(0, movieArray.length-1)
    //Prevent Getting The Same Question Twice
    while (i == questionNum) {
        i = getRandomInt(0, movieArray.length-1)
    }
    questionNum = i;
    //Grab the question for that index
    var question = formatQuestion(movieArray, questionNum);
    //Grab the corresponding image
    var pic = formatImage(imageArray, questionNum);
    //Display the question and image
    idDivQuestion.innerHTML = question;
    idDivPic.innerHTML = pic;
    idDivAnswerBreak.innerHTML = '';
}
// Pass an array and an index
function formatQuestion(a, i) {
    //Grab movie
    var item = a[i]
    //Insert it into a sentence
    output = `<h2>What year was ${item} released?</h2>`
    //Send to function
    return output;
}

function checkAnswer(ans) {
    answered = true;
    //Remove the spaces
    ans = Number(removeSpaces(ans))
    //Ensure that the answer is valid
    if (ans.length == 0 || isNaN(ans)) {
        return alert("Please submit a valid year");
    }
    //Compare the answer and return if its incorrect
    if(ans != yearArray[questionNum]) return idDivAnswerBreak.innerHTML = `<h2> Incorrect! ${movieArray[questionNum]} was released in ${yearArray[questionNum]}.</h2>`
    //Since its correct return the correct message
    idDivAnswerBreak.innerHTML = `<h2> Correct! ${movieArray[questionNum]} was released in ${yearArray[questionNum]}.</h2>`
    score++;
    idScore.innerHTML = `Score: ${score}`
}

function formatImage(a, i) {
    return `<img src=${a[i]} width=200 height=300>`
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
// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }  
  

  // /\s+/g From: https://stackoverflow.com/questions/5964373/is-there-a-difference-between-s-g-and-s-g
  // Beautiful Explanation By User: BoltClock
  //Use: string = removeSpaces(string) "there was no dog" --> "therewasnodog"
function removeSpaces(str) {
    str = str.replace(/\s+/g, '');
    return str;
}

function startOver() {
    score = 0;
    rounds = 0;
    idScore.innerHTML = `Score: ${score}`
    displayRandomQuestion();
    alert("Resetting the trivia...")
}