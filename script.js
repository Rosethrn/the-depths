const question = document.getElementById("question");
const input = document.getElementById("answer");

const answers = {
    name: "",
    power: ""
};

let stage = 0;

showQuestion();

function showQuestion(){

    if(stage === 0){

        question.textContent = "What is your name?";

    }

    else if(stage === 1){

        question.textContent = "What power do you desire?";

        input.value = "";

    }

    else{

        question.textContent = "Your wish has been heard.";

        input.style.display = "none";

        console.log("Submission:");

        console.log(answers);

    }

}

input.addEventListener("keydown", function(event){

    if(event.key !== "Enter") return;

    const value = input.value.trim();

    if(value.length === 0) return;

    if(stage === 0){

        answers.name = value;

    }

    else if(stage === 1){

        answers.power = value;

    }

    stage++;

    showQuestion();

});
