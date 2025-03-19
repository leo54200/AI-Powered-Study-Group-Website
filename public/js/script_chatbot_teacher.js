const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-button");
const chatContainer = document.querySelector(".chat-box");
const refreshButton = document.querySelector("#refresh-button");

let userText = null;
let bot_element = null;

const createChatElement = (content, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
};

const chatHistory = [];

function getChatResponse(incomingChatDiv, userText) {
    const pElement = document.createElement("p");
    chatHistory.push({ role: "user", content: userText });
    const allMessages = [
        ...chatHistory,
    ];

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
        body: JSON.stringify({
            messages: allMessages,
        }),
    };

    return fetch(BASE_URL + "classroom/OpenAi_response", requestOptions)
        .then(onResponse)
        .then((data) => {
            console.log("Dati ricevuti dall'API di OpenAI:", data);
            const messageContent = data.messageContent;
            const messageId = data.messageId;
            pElement.textContent = messageContent;
            share(pElement);
            incomingChatDiv.querySelector(".typing-animation").remove();
            incomingChatDiv
                .querySelector(".chat-details")
                .appendChild(pElement);
                incomingChatDiv.setAttribute("data-message-id", messageId);
            chatHistory.push({ role: "system", content: messageContent });
            return messageContent;
        })
        .catch(onError);
}

function getMessageIdFromElement(element) {
    
    let currElem = element;
    while (!currElem.dataset.messageId && currElem.parentNode)
        currElem = currElem.parentNode;
    return currElem.dataset.messageId;
}

function onResponse(response) {
    return response.json();
}

function onError(error) {
    console.error("Errore durante la richiesta all'API di OpenAI:", error);
    return "Oops! Qualcosa è andato storto.";
}

function printMessage(data) {
    console.log("questo è il return dal php", data);
}

function share(pElement) {
    bot_element = pElement.textContent;
}


let BoxCounter = 0;

const showTypingAnimation = () => {
    BoxCounter++;
    
    const template = document.getElementById("typing-template");
    const clone = template.content.cloneNode(true);
    
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(clone);
    const htmlContent = tempDiv.innerHTML;
    
    const incomingChatDiv = createChatElement(htmlContent, "incoming");
    incomingChatDiv.id = "incomingChatDiv_" + BoxCounter;
    
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    
    getChatResponse(incomingChatDiv, userText);
};

function getParentText(button) {
    
    const incomingDiv = button.closest(".chat-content");
    const coorectionBox = incomingDiv.querySelector(".correctionBox");
    if (coorectionBox !== null) return coorectionBox.textContent;
    if (incomingDiv) {
        
        const botTextElement = incomingDiv.querySelector(".chat-details p");
        if (botTextElement) {
            return botTextElement.textContent;
        }
    }
    return "";
}

function getPastMessageText(button) {
    const incomingDiv = button.closest(".chat-content");
    if (incomingDiv) {
        
        const botTextElement = incomingDiv.querySelector(".chat-details p");
        if (botTextElement) {
            return botTextElement.textContent;
        }
    }
    return "";
}

function getParentId(button) {
    
    const div = button.closest(".chat-content");
    incomingDiv = div.parentElement;
    if (incomingDiv) {
        
        return incomingDiv.id;
    }
    
    return "";
}

document.body.addEventListener("click", (event) => {
    if (event.target && event.target.id === "copyBtn") {
        copyResponse(event.target);
    }
});

document.body.addEventListener("click", (event) => {
    if (event.target && event.target.id === "editBtn") {
        editResponse(event.target);
    }
});

document.body.addEventListener("click", (event) => {
    if (event.target && event.target.id === "rateBtn") {
        rateResponse(event.target);
    }
});

const copyResponse = (copyBtn) => {
    
    const reponseTextElement = copyBtn
        .closest(".chat-content")
        .querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => (copyBtn.textContent = "content_copy"), 1000);
};

let editBoxTemplate = null;

const editResponse = (editBtn) => {
    const chatButtons = editBtn.parentElement;
    const botText = getParentText(editBtn);
    const ID_botMessage = getParentId(editBtn);
    console.log("Bot text:", botText);
    if (editBoxTemplate === null) {
        
        const originalEditBox = document.querySelector("#editBox");
        if (originalEditBox) {
            editBoxTemplate = originalEditBox.cloneNode(true);
            originalEditBox.remove(); 
        }
    }
    
    if (chatButtons.querySelector(".edit-box")) {
        const existingEditBox = chatButtons.querySelector(".edit-box");
        chatButtons.removeChild(existingEditBox);
        editBtn.textContent = "edit";
        return;
    }
    
    let editBox = editBoxTemplate.cloneNode(true);
    editBox.classList.remove("hidden");
    editBox.classList.add("edit-box");
    
    chatButtons.appendChild(editBox);
    
    const textarea = editBox.querySelector("textarea");
    const past_message = document.querySelector("#past_message");
    
    textarea.value = botText;
    const pastMessage = getPastMessageText(editBtn);
    past_message.value = pastMessage;
    if (!textarea.value) {
        editBox.classList.add("hidden");
        return; 
    }
    
    document
        .getElementById("submit_correction")
        .addEventListener("click", (event) => {
            event.preventDefault();
            if (!textarea.value) return; 
            sendCorrectionToServer();
            chatButtons.removeChild(editBox);
            editBox.classList.add("hidden");
            editBox = null; 
            editBtn.textContent = "edit";
            editChatHistory(botText, textarea.value);
            
            const container = document.getElementById(ID_botMessage);
            div = container.querySelector(".chat-details");
            const modifiedParagraph = div.querySelector(".correctionBox");
            if (modifiedParagraph !== null) {
                modifiedParagraph.textContent = textarea.value;
            } else {
                const newParagraph = document.createElement("p");
                
                newParagraph.textContent = textarea.value;
                newParagraph.classList.add("correctionBox");
                
                div.appendChild(newParagraph);
            }
        });
    
    const cancelBtn = editBox.querySelector("button");
    cancelBtn.addEventListener("click", () => {
        
        chatButtons.removeChild(editBox);
        editBox.classList.add("hidden");
        editBox = null; 
        editBtn.textContent = "edit";
    });
    editBtn.textContent = "arrow_drop_down";
    setTimeout(() => (editBtn.textContent = "arrow_drop_up"), 300);
};

function editChatHistory(oldMessage, newMessage) {
    console.log("Cronologia attuale della chat:", chatHistory);
    console.log("Messaggio da sostituire:", oldMessage);
    const messageIndex = chatHistory.findIndex(
        (message) => message.role === "system" && message.content === oldMessage
    );
    console.log(messageIndex);
    console.log(oldMessage);
    console.log(newMessage);
    if (messageIndex !== -1) {
        chatHistory[messageIndex].content = newMessage;
        console.log(chatHistory);
    } else {
        console.error("Messaggio non trovato nella cronologia.");
    }
}

function sendCorrectionToServer() {
    const correction = document.querySelector("#correction").value;
    const messageId = getMessageIdFromElement(document.querySelector("#correction_form"));
    console.log("messageId: " + messageId);
    
    fetch(BASE_URL +"chatbot_teacher/correction", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
        body: JSON.stringify({
            correction: correction,
            messageId: messageId,
        }),
    })
        .then(onResponse)
        .then(printMessage);
}

let rating1 = null;
let rating2 = null;

let ratingBox = null;

const rateResponse = (rateBtn) => {
    const chatButtons = rateBtn.parentElement;
    
    if (ratingBox) {
        
        chatButtons.removeChild(ratingBox);
        ratingBox = null; 
        rateBtn.textContent = "grade";
        return; 
    }
    
    const originalRatingBox = document.querySelector("#ratingBox");
    if (originalRatingBox) {
        ratingBox = originalRatingBox.cloneNode(true);
    } else {
        console.error("Rating box template not found");
        return;
    }
    
    ratingBox.classList.remove("hidden");
    ratingBox.classList.add("rating-box");
    
    chatButtons.appendChild(ratingBox);
    
    rating1 = ratingBox.querySelector("#rating1");
    rating2 = ratingBox.querySelector("#rating2");
    const current_message = ratingBox.querySelector("#current_message");
    
    const currentMessage = getPastMessageText(rateBtn);
    current_message.value = currentMessage;
    
    const stars1 = ratingBox.querySelectorAll(".stars1 i");
    
    stars1.forEach((star, index1) => {
        
        star.addEventListener("click", () => {
            rating1.value = checkStarValue(star); 
            
            stars1.forEach((star, index2) => {
                
                
                index1 >= index2
                    ? star.classList.add("active")
                    : star.classList.remove("active");
            });
        });
    });
    
    const stars2 = ratingBox.querySelectorAll(".stars2 i");
    
    stars2.forEach((star, index1) => {
        
        star.addEventListener("click", () => {
            rating2.value = checkStarValue(star); 
            
            stars2.forEach((star, index2) => {
                
                
                index1 >= index2
                    ? star.classList.add("active")
                    : star.classList.remove("active");
            });
        });
    });
    
    const okBtn = ratingBox.querySelector("#sumbit_rating");
    okBtn.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("Rating selezionato:", rating1.value); 
        console.log("Rating selezionato:", rating2.value); 
        sendRatingToServer();
        
        chatButtons.removeChild(ratingBox);
        ratingBox = null; 
        rateBtn.textContent = "grade";
        rateBtn.textContent = "check";
    });
    rateBtn.textContent = "arrow_drop_down";
    setTimeout(() => (rateBtn.textContent = "arrow_drop_up"), 300);
};

function checkStarValue(star) {
    const starId = star.id;
    if (starId === "star1" || starId === "star6") {
        return 1;
    } else if (starId === "star2" || starId === "star7") {
        return 2;
    } else if (starId === "star3" || starId === "star8") {
        return 3;
    } else if (starId === "star4" || starId === "star9") {
        return 4;
    } else if (starId === "star5" || starId === "star10") {
        return 5;
    }
}

function sendRatingToServer() {
    const rating1 = document.querySelector("#rating1").value;
    const rating2 = document.querySelector("#rating2").value;
    const messageId = getMessageIdFromElement(document.querySelector("#rating_form"));
    
    fetch(BASE_URL +"chatbot_teacher/rating", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
        body: JSON.stringify({
            rating1: rating1,
            rating2: rating2,
            messageId: messageId,
        }),
    })
        .then(onResponse)
        .then(printMessage);
}

const handleOutgoingChat = () => {
    chatInput.classList.remove("higher");
    userText = chatInput.value.trim(); 
    if (!userText) return; 
    
    chatInput.value = "";    
    const template = document.getElementById("outgoing-template");
    const clone = template.content.cloneNode(true);
    
    const pElement = clone.querySelector("p");
    pElement.textContent = userText;
    
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(clone);
    const htmlContent = tempDiv.innerHTML;
    
    const outgoingChatDiv = createChatElement(htmlContent, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
};

refreshButton.addEventListener("click", () => {
    
    if (confirm("Sei sicuro di voler riavviare la chat?")) {
        location.reload();
    }
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    
    chatInput.classList.add("higher");
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 500) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

sendButton.addEventListener("click", handleOutgoingChat);

function flex_item_handler(event) {
    const selected_flex_item = event.currentTarget;
    if (
        selected_flex_item.id === "item01" ||
        selected_flex_item.id === "item02"
    ) {
        const item01 = document.querySelector("#item01");
        const item02 = document.querySelector("#item02");
        item01.classList.remove("selected");
        item02.classList.remove("selected");
        selected_flex_item.classList.add("selected");
        document.getElementById("id_type").value =
            selected_flex_item.dataset.id;
        console.log(document.getElementById("id_type").value);
        const enter = document.querySelector("#enter");
        enter.classList.remove("hidden");
    } else {
        
        const allFlexItems = document.querySelectorAll(".subject");
        allFlexItems.forEach((item) => {
            item.classList.remove("selected");
        });
        
        selected_flex_item.classList.add("selected");
        
        document.querySelector("#id_subject").value =
            selected_flex_item.dataset.id;
        console.log(document.querySelector("#id_subject").value);
        
        const container2 = document.querySelector("#container2");
        container2.classList.remove("hidden");
    }
}

document.querySelector("#types").addEventListener("submit", chat_type);

function chat_type(event) {
    event.preventDefault();
    const choice = document.querySelector("#choice");
    choice.classList.add("hidden");
    const selected_items = document.querySelector("#selected_items");
    const item = document.querySelectorAll(".selected");
    for (const it of item) {
        const textContent = it.textContent;
        let textNode = document.createTextNode(textContent + ", ");
        if (it.id === "item01" || it.id === "item02") {
            textNode = document.createTextNode(textContent);
        }
        
        selected_items.appendChild(textNode);
    }
    selected_items.classList.remove("hidden");
    
    document.getElementById("chat-input").removeAttribute("disabled");
    
    const id_subject  = document.getElementById('id_subject').value;
    const id_type =document.getElementById('id_type').value;
    
    fetch(BASE_URL + "chatbot_teacher/start_chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
        body: JSON.stringify({
            id_type: id_type,
            id_subject: id_subject,
        }),
    })
        .then(response =>{ 
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data.message);
            }
        })
        .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    fetch(BASE_URL + "chatbot_teacher/get_subjects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrf_token,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                console.error(data.error);
                return;
            }
            let count = 0;
            const container = document.querySelector("#subjects_container");
            data.subjects.forEach((subject) => {
                count++;
                const div = document.createElement("div");
                div.classList.add("subject");
                div.classList.add("flex_item");
                div.setAttribute("data-id", subject.id);
                const h4 = document.createElement("h4");
                h4.textContent = subject.nome;

                div.appendChild(h4);
                container.appendChild(div);
            });
            const flex_item = document.querySelectorAll(".flex_item");
            for (const item of flex_item) {
                item.addEventListener("click", flex_item_handler);
            }
        })
        .catch((error) => console.error("Error:", error));
});

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("light");
    const dropdown_menu = document.querySelector("#dropdown_menu");
    dropdown_menu.classList.add("hidden");
});
