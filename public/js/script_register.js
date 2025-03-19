
const selectElement = document.getElementById("id_ruolo");
selectElement.addEventListener('change', function() {
    
    const id_ruolo = selectElement.value;
    const subjects = document.getElementById("subjects");

    
    if (id_ruolo === "2") {
        console.log("Opzione con value=2 selezionata");
        subjects.classList.remove("hidden");
        subjects.classList.add("flex_container");
    }else{
        subjects.classList.add("hidden");
        subjects.classList.remove("flex_container");

    }
});

document.getElementById("submit_signup").addEventListener("click", function (event) {
        const username = document.getElementById("txtusername").value;
        const password = document.getElementById("txtpassword").value;
        const nome = document.getElementById("txtnome").value;
        const cognome = document.getElementById("txtcognome").value;
        const id_ruolo = document.getElementById("id_ruolo").value;
        const idError = document.querySelector("#idError");


        event.preventDefault(); 
        if (!username || !password || !nome || !cognome || !id_ruolo) {
            idError.classList.add("error");
            idError.classList.remove("success");
            idError.textContent = "Non hai compilato tutti i campi";
            return; 
        }
        
        else if (password.length < 4) {
            idError.classList.add("error");
            idError.classList.remove("success");
            idError.textContent =
                "La password deve contenere almeno 4 caratteri";
            return; 
        }
        if (id_ruolo === "2" && subjects_list.length === 0) {
            idError.classList.add("error");
            idError.classList.remove("success");
            idError.textContent = "Seleziona almeno una materia";
            return; 
        }
        fetch(BASE_URL + "admin/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrf_token,
            },
            body: JSON.stringify({
                nome: nome,
                cognome: cognome,
                username: username,
                password: password,
                id_ruolo: id_ruolo,
                id_materie: subjects_list,
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
                if (data.success) {
                    console.log("Successo:", data);
                    idError.classList.remove("error");
                    idError.classList.add("success");
                    idError.textContent = data.success;
                    document.getElementById("txtusername").value = "";
                    document.getElementById("txtpassword").value = "";
                    document.getElementById("txtnome").value = "";
                    document.getElementById("txtcognome").value = "";
                    document.getElementById("id_ruolo").value = "";
                    document.getElementById("subjects").classList.add("hidden");
                    document.getElementById("subjects").classList.remove("flex_container");
                    const flex_item = document.querySelectorAll(".flex_item");
                    for (const item of flex_item) {
                        item.classList.remove("selected");
                    }
                } else if (data.error) {
                    console.error("Errore:", data.error);
                    idError.textContent = data.error;
                }
            })
            .catch((error) => {
                console.error("Errore:", error);
                idError.textContent = error.message;
            });
    });

document.addEventListener("DOMContentLoaded", () => {
    fetch(BASE_URL + "admin/register/get_all_subjects", {
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
            let container = document.querySelector("#subjects");
            data.subjects.forEach((subject) => {
                count++;
                const div = document.createElement("div");
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

function flex_item_handler(event) {
    const selected_flex_item = event.currentTarget;
        
        if (selected_flex_item.classList.contains("selected")) {
            selected_flex_item.classList.remove("selected");
            subjects_list = subjects_list.filter(
                (subject) => subject !== selected_flex_item.dataset.id
            );
            return;
        }else{
            subjects_list.push(selected_flex_item.dataset.id);
        selected_flex_item.classList.add("selected");
    }
}
let subjects_list = [];