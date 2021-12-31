var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var quiz_box = document.querySelector(".quiz_box");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var time_line = document.querySelector("header .time_line");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");
// if startQuiz button clicked
start_btn.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(75); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}
let timeValue =  75;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

var bottom_ques_counter = document.querySelector("footer .total_que");
// getting questions and options from array
function showQuetions(index){
    var que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    console.log(questions, index);
    console.log(questions[index]);
    if (que_numb > 10) {
        saveHighScore();
    }
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

   
   
    
    var option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
//if user clicked on option
function optionSelected(answer){
    
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    var allOptions = option_list.children.length; //getting all option items
    
    
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
        changeQuestion(true);
        
        
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");
        changeQuestion(false);
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
                
            }
        }
        
    }
    
}

function changeQuestion(isCorrect){
    let persistedTime = parseInt(timeCount.textContent);
    if (!isCorrect) {
        persistedTime -=10;
    }
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    startTimer(persistedTime); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            alert("You have run out of time!")
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            var allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            saveHighScore()
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            restart_quiz.classList.add("show"); //show the next button if user selected any option
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function saveHighScore () {
     var confirmScore = window.confirm("The quiz has ended! Would you like to save your high score?");
     if (confirmScore) {
         var playerName = window.prompt("Please enter your name.");
         localStorage.setItem("Score", userScore);
         localStorage.setItem("Name", playerName);
     } else {
         window.alert("Goodbye");
     }
     alert(playerName + " has a score of " + userScore)
     
     var confirmRestart = window.confirm("Would you like to restart the quiz?");
     if (confirmRestart) {
       location.reload();
     } else {
         window.alert("Goodbye");

     }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}