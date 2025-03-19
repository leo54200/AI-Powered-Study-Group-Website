
CREATE TABLE subjects (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
	created_at timestamp  NOT NULL DEFAULT  CURRENT_TIMESTAMP,  
	updated_at timestamp NOT NULL DEFAULT  CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cognome VARCHAR(255) NOT NULL,
    ruolo INTEGER NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
    CHECK(ruolo IN (1,2,3))
);

CREATE TABLE subject_user (
    id_materia INTEGER NOT NULL,
    id_utente INTEGER NOT NULL,
    created_at timestamp NOT NULL DEFAULT  CURRENT_TIMESTAMP,  
    updated_at timestamp NOT NULL DEFAULT  CURRENT_TIMESTAMP,
    PRIMARY KEY (id_materia, id_utente),
    FOREIGN KEY (id_materia) REFERENCES subjects(id)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (id_utente) REFERENCES users(id)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);

-- tipo: 1 (spiegazione), 2(esercizio)
CREATE TABLE chats (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_utente INTEGER NOT NULL,
    id_materia INTEGER,
    tipo INTEGER,
    data DATETIME NOT NULL,
    valutazione INTEGER,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_materia) REFERENCES subjects(id)
    ON DELETE CASCADE
	ON UPDATE CASCADE,
    FOREIGN KEY (id_utente) REFERENCES users(id)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);

-- mittente: 1 (utente), 2(AI)
CREATE TABLE messages (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    id_chat INTEGER NOT NULL,
    testo TEXT NOT NULL,
    correzione TEXT,
    data DATETIME NOT NULL,
    chiarezza INTEGER DEFAULT NULL,
	correttezza INTEGER DEFAULT NULL,
    mittente INTEGER NOT NULL,
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CHECK(mittente IN (1,2)),
    FOREIGN KEY (id_chat) REFERENCES chats(id)
    ON DELETE CASCADE
	ON UPDATE CASCADE
);
INSERT INTO subjects (id, nome) VALUES (1, 'Matematica');
INSERT INTO subjects (id, nome) VALUES(2, "Fisica");
INSERT INTO subjects (id, nome) VALUES(3, "Informatica");
INSERT INTO subjects (id, nome) VALUES(4, "Chimica");
INSERT INTO subjects (id, nome) VALUES(5, "Scienze della terra e Biologia");
INSERT INTO subject_user (id_materia, id_utente) VALUES(4, 3);

SELECT * FROM messages;
select * from chats;
SELECT * FROM users;
SELECT * FROM subject_user;
