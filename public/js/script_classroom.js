document.querySelector("#studiamo_insieme").classList.add("active");

function reset_images() {
    const guy1 = document.querySelector("#guy1");
    const speaking_guy1 = document.querySelector("#speaking_guy1");
    guy1.classList.remove("hidden");
    speaking_guy1.classList.add("hidden");
    const guy2 = document.querySelector("#guy2");
    const speaking_guy2 = document.querySelector("#speaking_guy2");
    guy2.classList.remove("hidden");
    speaking_guy2.classList.add("hidden");
    const guy3 = document.querySelector("#guy3");
    const speaking_guy3 = document.querySelector("#speaking_guy3");
    guy3.classList.remove("hidden");
    speaking_guy3.classList.add("hidden");
}

function answer(first_word) {
    reset_images();
    if (first_word == "Luca") {
        const guy1 = document.querySelector("#guy1");
        const speaking_guy1 = document.querySelector("#speaking_guy1");
        guy1.classList.add("hidden");
        speaking_guy1.classList.remove("hidden");
    } else if (first_word == "Francesco") {
        const guy2 = document.querySelector("#guy2");
        const speaking_guy2 = document.querySelector("#speaking_guy2");
        guy2.classList.add("hidden");
        speaking_guy2.classList.remove("hidden");
    } else if (first_word == "Chiara") {
        const guy3 = document.querySelector("#guy3");
        const speaking_guy3 = document.querySelector("#speaking_guy3");
        guy3.classList.add("hidden");
        speaking_guy3.classList.remove("hidden");
    }
}

function sendMessage(first_word, edited_bot_message) {
    const container = document.querySelector("#container");
    const newDiv = document.createElement("div");
    const username = document.createElement("div");
    const speech_bubble = document.querySelector(".speech_bubble");
    const history_box = document.querySelector("#history_box");
    if (
        first_word == "Luca" ||
        first_word == "Francesco" ||
        first_word == "Chiara"
    ) {
        username.textContent = first_word;
        speech_bubble.classList.remove("no_after");
    }
    answer(first_word);
    speech_bubble.classList.remove("hidden");
    speech_bubble.classList.remove("speech_bubble_left_bottom");
    speech_bubble.classList.remove("speech_bubble_center_bottom");
    speech_bubble.classList.remove("speech_bubble_right_bottom");
    if (first_word == "Luca") speech_bubble.classList.add("speech_bubble_left_bottom");
    else if (first_word == "Francesco") speech_bubble.classList.add("speech_bubble_center_bottom");
    else if (first_word == "Chiara") speech_bubble.classList.add("speech_bubble_right_bottom");
    else speech_bubble.classList.add("no_after");
    newDiv.classList.add("right");
    username.classList.add("username");
    container.appendChild(newDiv);
    newDiv.textContent = edited_bot_message;
    speech_bubble.textContent = edited_bot_message;
    newDiv.appendChild(username);
    history_box.scrollTop = history_box.scrollHeight;
}

const submit_message = document.querySelector("#submit_message");
const input_message = document.querySelector("#input_message");
const next_button = document.querySelector("#next_button");
next_button.addEventListener("click", next_button_handler);
submit_message.addEventListener("click", submit_message_handler);
input_message.addEventListener("keypress", enter_message_handler);

function enter_message_handler(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        submit_message_handler();
    }
}

function submit_message_handler() {
    const input_message = document.querySelector("#input_message");
    if (input_message.value === "") {
        return;
    }
    const divDestinazione = document.querySelector("#container");
    const userInput = input_message.value;

    input_message.value = "";

    
    const nuovoDiv = document.createElement("div");
    
    nuovoDiv.textContent = userInput;
    
    nuovoDiv.classList.add("left");
    divDestinazione.appendChild(nuovoDiv);
    
    chat_bot(userInput).then((bot_message) => {
        const first_word = bot_message.match(/\b\w+\b/)[0];
        
        let edited_bot_message = bot_message;
        if (
            first_word === "Luca" ||
            first_word === "Francesco" ||
            first_word === "Chiara"
        ) {
            edited_bot_message = bot_message
                .replace(first_word + ": ", "")
                .trim();
        }
        sendMessage(first_word, edited_bot_message);
    });
}

function next_button_handler() {
    chat_bot("avanti").then((bot_message) => {
        const first_word = bot_message.match(/\b\w+\b/)[0];
        
        let edited_bot_message = bot_message;
        if (
            first_word === "Luca" ||
            first_word === "Francesco" ||
            first_word === "Chiara"
        ) {
            edited_bot_message = bot_message
                .replace(first_word + ":", "")
                .trim();
        }
        sendMessage(first_word, edited_bot_message);
    });
}

function chat_bot(userInput) {
    return getOpenAIResponse(userInput);
}

let chatHistory = [];
chatHistory.push({
role: "user",
content:
"Dovresti interaggire come se fossi tre studenti di scuola superiore intenti a fare un studio di gruppo, nel quale aiuteranno lo studente me ad imprare le materie: matematic, fisica, chimica, informatica, scienze della terra e biologia. In più l'IA dovrà rispondere scrivendo uno dei tre nomi ogni volta in base alla persona con cui sto parlando, in nomi sono Chiara, Francesco e Luca. Nel momento in cui manderò la stringa 'avanti' vorrei che continuassi l'interazione tra gli studenti a modo tuo. esempio di interazioni: Ciao a tutti, ho bisogno di aiuto per studiare matematica. Non capisco come risolvere le equazioni di secondo grado.",
});

chatHistory.push({
role: "system",
content:
"Chiara: Ciao! Le equazioni di secondo grado hanno la forma ax^2 + bx + c = 0. Conosci la formula risolutiva?",
});
chatHistory.push({
role: "user",
content: "Sì, la conosco, ma non so quando devo usarla.",
});
chatHistory.push({
role: "system",
content:
"Francesco: La formula risolutiva, x = (-b ± √(b^2 - 4ac)) / 2a, si usa per trovare le radici dell'equazione. Vuoi fare un esempio insieme?",
});
chatHistory.push({
role: "user",
content: "Sì, per favore. Ecco un'equazione: 2x^2 + 3x - 2 = 0.",
});
chatHistory.push({
role: "system",
content:
"Luca: Ok, iniziamo a identificare i coefficienti: a = 2, b = 3 e c = -2. Ora possiamo inserirli nella formula risolutiva.",
});
chatHistory.push({
role: "user",
content:
"Perfetto. E per quanto riguarda le scienze della terra? Devo studiare la struttura interna della Terra.",
});
chatHistory.push({
role: "system",
content:
"Chiara: La Terra è composta da tre strati principali: crosta, mantello e nucleo. La crosta è lo strato più esterno e sottile, mentre il mantello si trova sotto la crosta e il nucleo è al centro. Vuoi sapere di più su uno di questi strati?",
});
chatHistory.push({
role: "user",
content: "Sì, vorrei sapere di più sul nucleo.",
});
chatHistory.push({
role: "system",
content:
"Francesco: Il nucleo della Terra è diviso in due parti: il nucleo esterno, che è liquido, e il nucleo interno, che è solido. È composto principalmente da ferro e nichel. La temperatura può raggiungere i 5.000-7.000°C.",
});
chatHistory.push({
role: "user",
content:
"Wow, non lo sapevo! E in biologia, mi serve capire la fotosintesi.",
});
chatHistory.push({
role: "system",
content:
"Luca: La fotosintesi è il processo attraverso il quale le piante producono energia. Usano la luce solare per convertire anidride carbonica e acqua in glucosio e ossigeno. Questo avviene nei cloroplasti delle cellule vegetali. Vuoi un approfondimento su una parte specifica del processo?",
});
chatHistory.push({
role: "user",
content: "Sì, come avviene la conversione dell'energia luminosa?",
});
chatHistory.push({
role: "system",
content:
"Chiara: La conversione avviene in due fasi principali: la fase luminosa e la fase oscura (ciclo di Calvin). Nella fase luminosa, l'energia solare viene catturata dai pigmenti nei cloroplasti e utilizzata per produrre ATP e NADPH. Questi composti energetici alimentano la fase oscura, dove il carbonio viene fissato e convertito in glucosio.",
});
chatHistory.push({
role: "user",
content:
"Grazie, questo è molto utile. Potete aiutarmi anche con l'informatica? Non capisco il concetto di algoritmi.",
});
chatHistory.push({
role: "system",
content:
"Francesco: Certo! Un algoritmo è un insieme di istruzioni passo-passo per risolvere un problema o eseguire un compito. Può essere rappresentato in vari modi, come con un diagramma di flusso o in linguaggio di programmazione. Hai un esempio specifico di algoritmo che ti confonde?",
});
chatHistory.push({
role: "user",
content:
"Dovresti continuare ad aggiungere messaggi seguendo lo stesso schema, utilizzando il comando 'avanti' per passare la parola al prossimo studente. Ogni volta che scrivo Luca Chiara o Francesco voglio che tu risponde scrivendo prima il nome dello studente e poi la risposta alla mia domanda. dovresti aiutarmi con le materie: matematica, scienze della terra, biologia, informatica, fisica e chimica.",
});
chatHistory.push({
    role: "system",
    content:
    "Perfetto! Continuiamo con lo studio. Luca: Certo! Cominciamo con la matematica. Hai domande su argomenti specifici come le equazioni di secondo grado o altro?"   
});
function getOpenAIResponse(userInput) {

    
    chatHistory.push({ role: "user", content: userInput });
    const allMessages = [...chatHistory]; 
    const dato = JSON.stringify({
        messages: allMessages,
    });

    return fetch(BASE_URL + "classroom/OpenAi_response",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
        body: dato,
    })
        .then(onResponse)
        .then((data) => {
            console.log("Dati ricevuti dall'API di OpenAI:", data);
            const messageContent = data.messageContent;
            
            chatHistory.push({ role: "system", content: messageContent });
            return messageContent;
        })
        .catch(onError);
}

function onResponse(response) {
    return response.json();
}

function onError(error) {
    console.error("Errore durante la richiesta all'API di OpenAI:", error);
    return "Oops! Qualcosa è andato storto.";
}

document.addEventListener("DOMContentLoaded", () => {
    fetch(BASE_URL + "classroom/start_chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
    })
        .then((response) =>
            response.json().catch(() => {
                throw new Error("Invalid JSON");
            })
        )
        .then((data) => {
            console.log(data); 
            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data.message);
                
            }
        })
        .catch((error) => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", () => {
fetch(BASE_URL + "classroom/check_previous_chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csrf_token,
    },
})
    .then((response) =>
        response.json().catch(() => {
            throw new Error("Invalid JSON");
        })
    )
    .then((data) => {
        if (data.number_of_days) {
            long_time_no_see()
        }
    })
    .catch((error) => console.error("Error:", error));
});

function getRandomStudent(){
    const students = ["Luca", "Francesco", "Chiara"];
    const randomNumber = Math.floor(Math.random() * students.length);
    return students[randomNumber];

}
function getMotivationalPhrase() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    let phrase;

    switch(randomNumber) {
        case 1:
            phrase = "Il successo non è raggiunto da chi inizia, ma da chi continua. La costanza nello studio ti porterà dove vuoi arrivare.";
            break;
        case 2:
            phrase = "Ogni giorno dedicato allo studio è un passo avanti. Non fermarti: la tua costanza sarà la chiave per sbloccare un futuro brillante.";
            break;
        case 3:
            phrase = "Studiare un po' ogni giorno ti porterà lontano. La costanza trasforma piccoli sforzi quotidiani in grandi risultati.";
            break;
        case 4:
            phrase = "Non importa quanto piccola sia la tua azione oggi, ciò che conta è farlo con costanza. Ogni giorno di studio è un mattoncino che costruisce il tuo successo.";
            break;
        case 5:
            phrase = "La costanza nello studio è come una maratona: non importa la velocità, ma la determinazione a non fermarsi mai. Continua a correre verso i tuoi obiettivi.";
            break;
        case 6:
            phrase = "Il vero segreto del successo è la perseveranza. Studiare con costanza, anche quando è difficile, ti porterà a risultati straordinari.";
            break;
        case 7:
            phrase = "Non cercare la perfezione in ogni singolo giorno, cerca la costanza. Ogni sforzo ripetuto crea abitudini positive che ti guideranno al successo.";
            break;
        case 8:
            phrase = "Un po' di studio ogni giorno crea un grande cambiamento nel tempo. La costanza è ciò che separa chi sogna da chi realizza.";
            break;
        case 9:
            phrase = "Impegnati a studiare un po' ogni giorno. La costanza trasforma le difficoltà in competenze e le opportunità in successi.";
            break;
        case 10:
            phrase = "La costanza nello studio non è solo una questione di disciplina, ma di credere nel proprio potenziale. Ogni giorno dedicato allo studio è un investimento nel tuo futuro.";
            break;
        default:
            phrase = "Continua a studiare, il tuo impegno verrà ripagato!";
    }
    return phrase;
}

function long_time_no_see() {
let phrase = getMotivationalPhrase();
let student = getRandomStudent();
sendMessage(student, "Bentornato! " + phrase);
chatHistory.push({
    role: "system",
    content:
    "Bentornato! " + phrase});
}
