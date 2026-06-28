const text = document.getElementById("text");
const input = document.getElementById("answer");

let stage = 0;

let playerName = "";
let desiredPower = "";

const questions = [

    "What is your name?",

    "What power do you desire?"

];

function wait(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

async function ask(question){

    input.value="";

    text.classList.remove("show");
    input.classList.remove("show");

    await wait(700);

    text.textContent=question;

    text.classList.add("show");

    await wait(1200);

    input.classList.add("show");

    input.focus();

}

ask(questions[0]);

input.addEventListener("keydown",async function(e){

    if(e.key!=="Enter") return;

    if(stage===0){

        playerName=input.value.trim();

        stage++;

        await ask(questions[1]);

        return;

    }

    if(stage===1){

        desiredPower=input.value.trim();

        input.classList.remove("show");
        text.classList.remove("show");

        await wait(1000);

        text.textContent="...";

        text.classList.add("show");

        await wait(2200);

        text.classList.remove("show");

        await wait(1200);

        text.textContent="Very Very Interesting...";

        text.classList.add("show");

        console.log({
            name:playerName,
            power:desiredPower
        });

        // We'll send it to Google Sheets here later.
    }

});
