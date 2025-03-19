
function not_available_handler() {
    const not_available_div = document.querySelector("#not_available_div");
    not_available_div.classList.remove("hidden");
    not_available_div.textContent =
        "Non disponibile, prima devi fare l'autenticazione!";
    setTimeout(() => hideDiv(not_available_div), 5000);
}

function sign_in_menu_form_handler() {
    const dropdown_menu = document.querySelector("#dropdown_menu");
    dropdown_menu.classList.add("hidden");
    sign_in_form_handler();
}
function sign_in_form_handler() {
    const sign_in_div = document.querySelector("#sign_in_div");
    const blur = document.querySelector("#blur");
    sign_in_div.classList.remove("hidden");
    blur.classList.add("blur");
}

function close_form_handler() {
    const sign_in_div = document.querySelector("#sign_in_div");
    const blur = document.querySelector("#blur");
    sign_in_div.classList.add("hidden");
    blur.classList.remove("blur");
}

const not_available = document.querySelector("#not_available");
not_available.addEventListener("click", not_available_handler);

const sign_in = document.querySelector(".sign_in");
sign_in.addEventListener("click", sign_in_form_handler);
const menu_sign_in = document.querySelector("#menu_sign_in");
menu_sign_in.addEventListener("click", sign_in_menu_form_handler);


const close_form = document.querySelector("#close_form");
close_form.addEventListener("click", close_form_handler);

document
    .getElementById("id_submit")
    .addEventListener("click", function (event) {
        event.preventDefault(); 
        const username = document.getElementById("txtusername").value;
        const password = document.getElementById("txtpassword").value;
        if (!username) {
            idError.textContent = "Non hai inserito l'username";
            return; 
        }
        if (!password) {
            idError.textContent = "Non hai inserito la password";
            return; 
        }
        
        else if (password.length < 4) {
            idError.textContent =
                "La password deve contenere almeno 4 caratteri";
            return; 
        }
        fetch(BASE_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((error) => {
                        throw new Error(
                            error.error || "Network response was not ok"
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    console.error("Errore:", data.error);
                    idError.textContent = data.error;
                } else if (data.success) {
                    window.location.href = "/";
                }
            })
            .catch((error) => {
                console.error("Errore:", error);
                idError.textContent = error.message;
            });
    });
