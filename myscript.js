let apiURL = "https://opentdb.com/api.php?amount=10&type=multiple";
let pexelsURL = "https://api.pexels.com/v1/search?query="
// YhyHjZXcFjK6Pvq0Pky02jAbtJtGZfVJwRWa6jDw9XVktntaF8K1QSXB
let question = 0;
let data;
let rand;
let difficulty = "";
let genre = "";
let query = "";
let score = 0;
let parity = 0;
let correctAnswers = 0;

let startButton;
let trivia;
let askBox;
let imageDiv;
let image;
let option0;
let option1;
let option2;
let option3;
let scoreDiv;
let settingDiv;
let difDiv;
let genDiv;
let resultDiv;
let resultScore;
let resultRecap;
let failDiv;

let BANNED_WORDS = ["Which", "which", "What", "what", "Why", "why", "When", "when","Who", "who", "is", "known", "for", "The", "the", "In", "in", "and", "are", "On", "on", "an", "An", "used", "Of", "of", "a", "A", "that", "uses", "it", "was", "as", "How", "how", "many", "would", "Would", "you", "by", "last", "have", "to"]

window.onload = function(){
    startButton = document.getElementById("startButton");
    optionButton = document.getElementById("settingsButton");
    settingDiv = document.getElementById("settingMenu");
    difDiv = document.getElementById("difDiv");
    genDiv = document.getElementById("genDiv");
    trivia = document.getElementById("trivia");
    imageDiv = document.getElementById("imageDiv");
    askBox = document.getElementById("askBox");
    option0 = document.getElementById("option0");
    option1 = document.getElementById("option1");
    option2 = document.getElementById("option2");
    option3 = document.getElementById("option3");
    image = document.getElementById("img");
    scoreDiv = document.getElementById("score");
    resultDiv = document.getElementById("results");
    resultScore = document.getElementById("resultScore");
    resultRecap = document.getElementById("resultsRecap");
    failDiv = document.getElementById("fail");

    settingDiv.style.display = "none";
    trivia.style.display = "none";
    resultDiv.style.display = "none";
    failDiv.style.display = "none";
}

function returnHome(){

    if (confirm("Are you sure?\nYou will lose all progress.") == true){
        difficulty = "";
        genre = "";
        query = "";
        score = 0;
        parity = 0;
        correctAnswers = 0;
        question = 0;

        trivia.style.display = "none";
        startButton.style.display = "inline-block";
        optionButton.style.display = "inline-block";
        askBox.style.backgroundColor = "gainsboro";
        console.clear();
    }
}

function restart(){
    difficulty = "";
    genre = "";
    query = "";
    score = 0;
    parity = 0;
    correctAnswers = 0;
    question = 0;
    resultDiv.style.display = "none";
    startButton.style.display = "inline-block";
    optionButton.style.display = "inline-block";
    failDiv.style.display = "none";
    askBox.style.backgroundColor = "gainsboro";
    console.clear();
}

function showOptions(number){
    parity += number;
    if (parity % 2 == 1){
        settingDiv.style.display = "block";
    } else{
        settingDiv.style.display = "none";
    }
}

function setDifficulty(measure){
    
    let word;

    switch(measure){
        case "easy":
            word = "Easy";
            break;
        case "medium":
            word = "Medium";
            break;
        case "hard":
            word = "Hard";
            break;
        default:
            word = "Not Found";
            break;
    }
    difDiv.innerHTML = "Your Difficulty: " + word;
    difficulty = "&difficulty=" + measure;
    console.log(difficulty);
}

function setGenre(category){
    genre = "&category=" + category;
    console.log(genre);
    let word;

    switch(category){
        case 21:
            word = "Sports";
            break;
        case 22:
            word = "Geography";
            break;
        case 23:
            word = "History";
            break;
        case 24:
            word = "Politics";
            break;
        case 25:
            word = "Art";
            break;
        case 26:
            word = "Celebrities";
            break;
        case 27:
            word = "Animals";
            break;
        case 9:
            word = "General Knowledge";
            break;
        case 11:
            word = "Film";
            break;
        case 28:
            word = "Vehicles";
            break;
        case 14:
            word = "Television";
            break;
        case 11:
            word = "Books";
            break;
        case 12:
            word = "Music";
            break;
        case 15:
            word = "Video Games";
            break;
        case 17:
            word = "Science & Nature";
            break;
        default:
            word = "Not Found";
    }
    genDiv.innerHTML = "Your Category: " + word;
}

function showResults(){
    resultDiv.style.display = "block";
    resultScore.innerHTML = "Your Score: " + score;
    resultRecap.innerHTML = "You got " + correctAnswers + " out of 10 questions correct!";
    if (correctAnswers == 10 || correctAnswers == 9){
        resultRecap.innerHTML += "<br> Incredible Job!";
    } else if(correctAnswers < 9 && correctAnswers > 5){
        resultRecap.innerHTML += "<br> Good Job!";
    } else{
        resultRecap.innerHTML += "<br>Do better next time.";
    }

}
async function fetchQuestions(){
    startButton.style.display = "none";
    optionButton.style.display = "none";
    settingDiv.style.display = "none";
    trivia.style.display = "block";

    apiURL += genre;
    apiURL += difficulty;
    console.log(apiURL)

    try{
        const response = await fetch(apiURL);
        data = await response.json();
        console.log(data);
    } catch(error){
        console.error("Error fetching questions", error);
        alert("Unable to fetch trivia questions.");
    }
    newLevel()

}

function submit(answer){

    let level = data.results[question].difficulty;
    if (answer.innerHTML == data.results[question].correct_answer){
        console.log("CORRECT");
        askBox.style.backgroundColor = "#a0fcb7";
        correctAnswers ++;
        if (level == "easy"){
            score += 10;
        } else if(level == "medium"){
            score += 30;
        } else if(level == "hard"){
            score += 50;
        }

    } else{
        console.log("WRONG");
        askBox.style.backgroundColor = "#fca0a0";
    }
    console.log(score)
    question++;
    if (question < 10){
        setTimeout(newLevel(score), 2000)
    } else{
        trivia.style.display = "none";
        showResults()
    }
    
}

function newLevel(score) {

    rand = Math.floor(Math.random() * 4)
    console.log(rand);
    trivia.style.display = "none";
    if (score == undefined){
        score = 0;
    }
    scoreDiv.innerHTML = score + " Points";
    try{
        askBox.innerHTML = data.results[question].question;

        if (rand == 0){
            option0.innerHTML = data.results[question].correct_answer;
            option1.innerHTML = data.results[question].incorrect_answers[0];
            option2.innerHTML = data.results[question].incorrect_answers[1];
            option3.innerHTML = data.results[question].incorrect_answers[2];
        } else if(rand == 1){
            option0.innerHTML = data.results[question].incorrect_answers[0];
            option1.innerHTML = data.results[question].correct_answer;
            option2.innerHTML = data.results[question].incorrect_answers[1];
            option3.innerHTML = data.results[question].incorrect_answers[2];
        } else if(rand == 2){
            option0.innerHTML = data.results[question].incorrect_answers[0];
            option1.innerHTML = data.results[question].incorrect_answers[1];
            option2.innerHTML = data.results[question].correct_answer;
            option3.innerHTML = data.results[question].incorrect_answers[2];
        } else{
            option0.innerHTML = data.results[question].incorrect_answers[0];
            option1.innerHTML = data.results[question].incorrect_answers[1];
            option2.innerHTML = data.results[question].incorrect_answers[2];
            option3.innerHTML = data.results[question].correct_answer;
        }
        trivia.style.display = "block";
    } catch(error){
        trivia.style.display = "none";
        console.error("trivia was not found");
        alert("Unable to get trivia questions.");
        failDiv.style.display = "block";
    }
    
    getImgQuery();
}

function getImgQuery(){
    let queryString;
    let wordQuery;
    questionArray = data.results[question].question.split(' ');
    
    lgth = 0;

    for(let i = 0; i < questionArray.length; i ++){
        questionArray[i] = questionArray[i].replaceAll("&quot;","").replaceAll("&#039;", "").replaceAll("&rsquo;", "");
    }
    
    console.log(questionArray);

    queryString = questionArray.toString()

    for(let i = 0; i < BANNED_WORDS.length; i ++){
        queryString = queryString.replaceAll("," + BANNED_WORDS[i] + ",", ",")
    }

    queryString = queryString.replaceAll(",", " ");

    for(let i = 0; i < BANNED_WORDS.length; i ++){
        queryString = queryString.replaceAll(" " + BANNED_WORDS[i] + " ", "");
    }
    
    queryString = queryString.replaceAll("?", "");

    wordQuery = queryString.replaceAll("&quot;","").replaceAll("&#039;", "").replaceAll("&rsquo;", "").replaceAll("&eacute;","e").replaceAll("?","");
    console.log(wordQuery);

    fetchImg(wordQuery);
}

async function fetchImg(query){
    try{

        const imageResponse = await fetch("https://api.pexels.com/v1/search?query=" + query, {headers: {Authorization: "YhyHjZXcFjK6Pvq0Pky02jAbtJtGZfVJwRWa6jDw9XVktntaF8K1QSXB"}});

        const imageData = await imageResponse.json();
        console.log(imageData);

        imageDiv.innerHTML = `<img src=${imageData.photos[0].src.medium} alt="${imageData.photos[0].alt}" class="imgR">`
    } catch(error){
        console.error("Error fetching image", error);
    }
}

// load the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}  

// handle install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});      
