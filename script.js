const question = document.getElementById("question");
const input = document.getElementById("answer");

const answers = {
    name: "",
    power: ""
};

let stage = 0;

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyb4jdYj4erfDV_s45nOongeu6XndwK-lUqZisHp93_xHxJfHJejzegMmxIyn2nJUy3/exec";

showQuestion();

function showQuestion() {

    if (stage === 0) {

        question.textContent = "What is your name?";

    } else if (stage === 1) {

        question.textContent = "What power do you desire?";
        input.value = "";

    } else {

        submitAnswers();

    }

}

async function submitAnswers() {

    input.style.display = "none";

    question.textContent = "...";

    try {

        const response = await fetch(WEB_APP_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answers)
        });

        if (!response.ok) {
            throw new Error("Failed to submit.");
        }

        question.textContent = "Very... Very... Interesting....";

    } catch (error) {

        console.error(error);
        question.textContent = "Something went wrong.";

    }

}

input.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") return;

    const value = input.value.trim();

    if (value.length === 0) return;

    if (stage === 0) {

        answers.name = value;

    } else if (stage === 1) {

        answers.power = value;

    }

    stage++;

    showQuestion();

});
