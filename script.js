const questions = [
    {
        question : "There are ___ levels of heading in HTML",
        answers: [
            { text : "Three",correct : false },
            { text : "Four",correct : false },
            { text : "Five",correct : false },
            { text : "Six",correct : true }
        ]
    },
    {
        question : "The different ways of Creating Graphics for the Web are.",
        answers: [
            { text : "Graphics packages",correct : false },
            { text : "Graphics packages, Digital cameras, Scanned photographs",correct : true },
            { text : "Digital cameras",correct : false },
            { text : "None of the above",correct : false }
        ]
    },
    {
        question : "Various INPUT types are",
        answers: [
            { text : "CHECKBOX, RADIO",correct : false },
            { text : "CHECKBOX, HIDDEN",correct : false },
            { text : "CHECKBOX, RADIO, HIDDEN",correct : true },
            { text : "None of the above",correct : false }
        ]
    },
    {
        question : " CGI stands for",
        answers: [
            { text : "Command Gate Interface",correct : false },
            { text : " Common Gateway Interface",correct : true },
            { text : " Common Gate input",correct : false },
            { text : "None of the above",correct : false }
        ]
    },
    {
        question : "Which of the following programming languages is commonly used for server-side scripting in web development?",
        answers: [
            { text : "PHP",correct : true },
            { text : "JavaScript",correct : false },
            { text : "HTML",correct : false },
            { text : "CSS",correct : false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currectQuestionIndex = 0;
let Score = 0;

function startQuiz(){
    currectQuestionIndex = 0;
    Score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    restState();
    let currectQuestion = questions[currectQuestionIndex];
    let questionNo = currectQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currectQuestion.question;

    currectQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click" , SelectAnswer);
    });
}
function restState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function SelectAnswer(e){
    const selectBtn = e.target;
    const iscorrect = selectBtn.dataset.correct === "true";
    if(iscorrect)
    {
        selectBtn.classList.add("correct");
        Score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    restState();
    questionElement.innerHTML = `You Scored ${Score} Out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currectQuestionIndex++;
    if(currectQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click" , () =>{
    if(currectQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();