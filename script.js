const text = document.getElementById("text");
const typed = document.getElementById("typed");
const hiddenInput = document.getElementById("hiddenInput");

const API_URL = "/api/submit";

let stage = 0;

const answers = {
    name: "",
    power: ""
};

// Start immediately
init();

function init() {
    showQuestion();
    hiddenInput.focus();
}

// Keep focus locked so user always types
document.addEventListener("click", () => hiddenInput.focus());

hiddenInput.addEventListener("input", (e) => {
    typed.textContent = e.target.value;
});

hiddenInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const value = hiddenInput.value.trim();
    if (!value) return;

    handleInput(value);
    hiddenInput.value = "";
    typed.textContent = "";
});

function showQuestion() {

    if (stage === 0) {
        setText("What is your name?");
    }

    else if (stage === 1) {
        setText("What Power Do You Desire?");
    }

    else {
        submit();
    }
}

function setText(newText) {
    text.classList.add("fade-out");

    setTimeout(() => {
        text.textContent = newText;
        text.classList.remove("fade-out");
    }, 500);
}

function handleInput(value) {

    if (stage === 0) {
        answers.name = value;
    }

    else if (stage === 1) {
        answers.power = value;
    }

    stage++;
    showQuestion();
}

async function submit() {

    setText("...");

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answers)
        });

        // Ending sequence
        setTimeout(() => setText("Very..."), 1000);
        setTimeout(() => setText("Very..."), 2500);
        setTimeout(() => setText("Interesting...."), 4000);

    } catch (err) {
        console.error(err);
        setText("Something went wrong.");
    }
}
