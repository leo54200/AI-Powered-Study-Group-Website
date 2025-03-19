<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pagina docente</title>
    <link rel="icon" type="image/x-icon" href='{{ url("img/logo.png") }}' />
    <link rel="stylesheet" href="{{ url('css/style_chatbot_teacher.css') }}" />
    <link rel="stylesheet" href="{{ url('css/style.css') }}" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Varela+Round&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet" />
    <script src="{{ url('js/script_chatbot_teacher.js') }}" defer></script>
    <script src="{{ url('js/script.js') }}" defer></script>
    <script>
      const BASE_URL = "{{ url('/') }}/";
      const csrf_token = "{{ csrf_token() }}"; 
    </script>
  </head>
  <body>
    <header>
      <div id="menu" class="nav_height">
        <div id="menu_line">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span id="switch_in_menu">
          <label for="checkbox" class="checkbox-label">
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
            <span class="ball"></span>
          </label>
        </span>
      </div>
      <div id="dropdown_menu" class="hidden">
        <a href="{{url('chatbot_teacher')}}">
          <div class="dropdown_menu_active border_top">Chat bot</div>
        </a>
        <a href='{{ url("user/" . $username) }}'>
        <div>Account</div>        
        </a>
        <a href="{{url('logout')}}">
          <div>Esci</div>
        </a>
      </div>
      <nav id="navbar">
        <div>
          <a href="{{url('/')}}" ><img class="middle" id="logo" src="{{url('img/logo.png')}}" alt=""/></a>
          <a class="main_option active" href="{{url('chatbot_teacher')}}">Chat Bot</a>
        </div>
        <div>
          <input type="checkbox" class="checkbox" id="checkbox">
          <label for="checkbox" class="checkbox-label">
            <i class="fas fa-sun"></i>
            <i class="fas fa-moon"></i>
            <span class="ball"></span>
          </label>
        </div>
        <div class="dropdown">
          <button class="dropbtn" id="welcome">Bentornato {{ $nome }}</button>
          <div class="dropdown-content">
            <a href='{{ url("user/" . $username) }}'>Account</a>
            <a href="{{ url('logout') }}">Esci</a>
          </div>
        </div>
      </nav>
    </header>
    <div class="nav_height"></div>

    <main>
      <h3 class="center hidden" id="selected_items">Argomento della chat: </h3>
      <div id="choice" class="center">
        <br />
        <h3>Scegli la materia:</h3>
        <div id="container1">
          <div class="flex_container" id="subjects_container"></div>
        </div>
        
        <div id="container2" class="hidden">
          <br />
          <h3>Cosa vuoi fare?</h3>
          <div class="flex_container"> 
            <div id="item01" class="flex_item type" data-id="1" ><h4 >Spiegazione</h4></div>
            <div id="item02" class="flex_item type" data-id="2" ><h4 >Esercizio</h4></div>
          </div>
        </div>
        <form id="types" method="POST">
          @csrf
          <input class="hidden" id="id_subject" name="id_subject" required>
          <input class="hidden" id="id_type" name="id_type" required>
          <button id="enter" type="submit" class="hidden"><h3>Conferma</h3></button>
        </form>
      </div>

      <div class="chat-box"></div>      

      <div class="typing-box">
        <div class="typing-content">
          <div class="typing-textarea">
            <textarea id="chat-input" spellcheck="false" disabled="true" placeholder="Scrivi un messaggio qui..." required></textarea>
            <span id="send-button" class="material-symbols-rounded">send</span>
          </div>
          <div class="typing-controls">
            <span id="refresh-button" class="material-symbols-rounded">refresh</span>
          </div>
        </div>
      </div>
      
      <template id="outgoing-template">
          <div class="chat-content">
            <div class="chat-details">
              <img src="{{url('img/teacher.png')}}" alt="user-img">
              <p></p>
            </div>
          </div>
      </template>

      <template id="typing-template">
        <div class="chat-content">
          <div class="chat-details">
            <img src="{{url('img/chatbot.png')}}" alt="chatbot-img">
            <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
              <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
          </div>
          <div class="chat-buttons">
            <span id="copyBtn" class="material-symbols-rounded">content_copy</span>
            <span id="editBtn" class="material-symbols-outlined">edit</span>
            <span id="rateBtn" class="material-symbols-outlined">grade</span>
          </div>
        </div>
      </template>

      <div id="editBox" class="hidden">
          <form id="correction_form"  method="POST">
          @csrf
              <textarea name="correction" id="correction"></textarea>
              <textarea class="hidden" name="past_message" id="past_message"></textarea>
              <button>Annulla</button>
              <button id="submit_correction" type="submit">Invia</button>
          </form>
      </div>

      <div id="ratingBox" class="hidden">
        <label>Chiarezza</label>
        <div class="stars1">
          <i id="star1" class="fa-solid fa-star"></i>
          <i id="star2" class="fa-solid fa-star"></i>
          <i id="star3" class="fa-solid fa-star"></i>
          <i id="star4" class="fa-solid fa-star"></i>
          <i id="star5" class="fa-solid fa-star"></i>
        </div>
        <label>Correttezza</label>
        <div class="stars2">
          <i id="star6" class="fa-solid fa-star"></i>
          <i id="star7" class="fa-solid fa-star"></i>
          <i id="star8" class="fa-solid fa-star"></i>
          <i id="star9" class="fa-solid fa-star"></i>
          <i id="star10" class="fa-solid fa-star"></i>
        </div>
        <form id="rating_form" method="post">
        @csrf
          <input class="hidden" type="text" name="rating1" id="rating1">
          <input class="hidden" type="text" name="rating2" id="rating2">
          <input class="hidden" name="current_message" id="current_message"></input>
          <button type="submit" id="sumbit_rating">OK</button>
        </form>
      </div>
    </main>
  </body>
</html>
