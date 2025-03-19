document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword.length < 4) {
        idError.textContent = "La password deve contenere almeno 4 caratteri";
        return;
    }
    if (newPassword !== confirmPassword) {
        idError.textContent = "Le nuove password non coincidono";
        return;
    }

    fetch(BASE_URL +'user/'+ username +'/change_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRF-TOKEN": csrf_token
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    })
    .then(response =>{ 
        return response.json();
    })
    .then((data) => {
        console.log(data);
        if (data.success) {
            idError.classList.remove("error");
            idError.classList.add("success");
            idError.textContent = data.success;
            document.getElementById("currentPassword").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("confirmPassword").value = "";
        } else {
            idError.classList.add("error");
            idError.classList.remove("success");
            idError.textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        idError.textContent = "Si è verificato un errore. Riprova più tardi.";
    });
});