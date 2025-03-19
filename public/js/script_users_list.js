document.addEventListener('DOMContentLoaded', () => {
    fetch(BASE_URL + 'admin/users_list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf_token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const users = data.users;
        const container = document.getElementById('usersContainer');
        
        
        const table = document.createElement('table');
        table.classList.add('user-table');
        
        
        const headerRow = document.createElement('tr');
        const headers = ['Nome', 'Cognome', 'Username', 'Ruolo', 'Azioni'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);
        
        users.forEach(user => {
            let ruolo;
            if (user.ruolo == 1) {
                ruolo = 'Studente';
            }else if(user.ruolo == 2) {
                ruolo = 'Docente';
            }else ruolo = 'Amministratore';
            const row = document.createElement('tr');
            row.setAttribute('data-user-id', user.id); 
            
            const tdNome = document.createElement('td');
            tdNome.textContent = user.nome;
            row.appendChild(tdNome);
            
            const tdCognome = document.createElement('td');
            tdCognome.textContent = user.cognome;
            row.appendChild(tdCognome);
            
            const tdUsername = document.createElement('td');
            tdUsername.textContent = user.username;
            row.appendChild(tdUsername);
            
            const tdRuolo = document.createElement('td');
            tdRuolo.textContent = ruolo;
            row.appendChild(tdRuolo);
            
            
            const tdAzioni = document.createElement('td');
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Elimina';
            deleteButton.addEventListener('click', () => {
                deleteUser(user.id); 
            });
            tdAzioni.appendChild(deleteButton);
            
            row.appendChild(tdAzioni);
            
            
            table.appendChild(row);
        });
        
        
        container.appendChild(table);
    })
    .catch(error => console.error('Fetch error:', error));
});



function deleteUser(userId) {
    fetch(BASE_URL + 'admin/delete_user/' + userId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf_token
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Utente eliminato:', data);
        const userRow = document.querySelector('tr[data-user-id="' + userId + '"]');
        if (userRow) {
            userRow.remove();
        } else {
            console.error("Riga utente con ID " + userId + " non trovata nella tabella.");
        }
    })
    .catch(error => console.error('Fetch error:', error));
}
