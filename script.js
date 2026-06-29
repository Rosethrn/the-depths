const question = document.getElementById("question");
const input = document.getElementById("answer");

const answers = {
    name: "",
    power: ""
};

let stage = 0;

// Sends to your Vercel API
const API_URL = "/api/submit";

showQuestion();

function showQuestion() {

    if (stage === 0) {

        question.textContent = "What is your name?";

    } else if (stage === 1) {

        question.textContent = "What Power Do You Desire?";
        input.value = "";

    } else {

        submitAnswers();

    }

}

async function submitAnswers() {

    input.style.display = "none";
    question.textContent = "...";

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: answers.name,
                power: answers.power
            })
        });

        if (!response.ok) {
            throw new Error("Submission failed.");
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

    } else {

        answers.power = value;

    }

    stage++;

    showQuestion();

});
