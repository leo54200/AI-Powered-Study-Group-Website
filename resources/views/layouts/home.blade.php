<!DOCTYPE html>
<html>
    <head>
    @section('head')
    <title>Gruppo di studio virtuale</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <link rel="icon" type="image/x-icon" href='{{ url("img/logo.png") }}' />
    <link rel="stylesheet" href='{{ url("css/style.css") }}' />
    <link rel="stylesheet" href="{{ url('css/style_index_home.css') }}" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src='{{ url("js/script.js") }}' defer></script>
    <script src="{{ url ('js/script_index_home.js') }}" defer></script>
    <script> const BASE_URL = "{{ url('/') }}/"; </script>
    @show
  </head>
  <body>
    <header>
      <div id="menu" class="nav_height">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="dropdown_menu" class="hidden">
        <a href='{{ url("/") }}'>
          <div class="dropdown_menu_active border_top">Home</div>
        </a>
        <a href='{{ url("classroom") }}'>
          <div>Studiamo insieme</div>
        </a>
        @if(empty($username))
        <a id="menu_sign_in">
          <div>Accedi</div>
        </a>
        @else
        <a href='{{ url("user/" . $username) }}'>
          <div>Account</div>
        </a>
        <a href='{{ url("logout") }}'>
          <div>Esci</div>
        </a>
          @endif
      </div>
      <nav id="navbar">
        <div>
          <a href='{{ url("/") }}'><img class="middle" id="logo" src='{{ url("img/logo.png") }}' alt=""/></a>
          <a class="main_option active" id="home" href='{{ url("/") }}'>Home</a>
          @if(empty($username))
          <a class="main_option" id="not_available">Studiamo insieme</a>
          @else
          <a class="main_option" id="studiamo_insieme" href='{{ url("classroom") }}'>Studiamo insieme</a>
          @endif
        </div>
        @if(empty($username))
        <div>
          <a class="sign_in">Accedi</a>
        </div>
        <div id="not_available_div" class="hidden"></div>
        @else
        <div class="dropdown">
          <button class="dropbtn" id="welcome">Bentornato {{ $nome }}</button>
          <div class="dropdown-content">
            <a href='{{ url("user/" . $username) }}'>Account</a>
            <a href='{{ url("logout") }}'>Esci</a>
          </div>
        </div>
        @endif
      </nav>
    </header>
    <div class="nav_height"></div>
@section('home-content')
      <div class="container_img">
        <img src="{{ ('img/classroom.jpeg') }}" alt=""/>
        <div class="above_container_center chalk">
          <h2>
            Siamo entusiasti di accoglierti <br />
            nella nostra comunita' educativa
          </h2>
        </div>
      </div>
      <section>
        <div class="flex_center_container">
          <div class="text">
            <h2>
              Siamo qui per rendere il processo di apprendimento divertente
            </h2>
            <p>
              Esplorate un ambiente educativo unico dove la tecnologia e
              l'intelligenza artificiale si incontrano per creare un'esperienza
              di apprendimento coinvolgente e stimolante.
            </p>
            <p>
              In questa classe virtuale, gli studenti vengono trasportati in un
              mondo interattivo dove l'apprendimento diventa coinvolgente,
              stimolante e personalizzato. Ogni aspetto del nostro ambiente
              educativo è stato progettato per ispirare la curiosità, promuovere
              la creatività e coltivare il pensiero critico.
            </p>
          </div>
          <img id="ai_img" src="{{ ('img/ai.jpg') }}" alt="" />
        </div>
      </section>
      <section>
        <div class="center"><h4>Qui apprenderai conoscenze riguardo:</h4></div>
        <div class="classroom">
          <h4 id="classroom_title">Matematica</h4>
          <button id="left" class="classroom_button">
            <span class="material-symbols-outlined"> arrow_back </span>
          </button>
          <button id="right" class="classroom_button">
            <span class="material-symbols-outlined"> arrow_forward </span>
            </button>
        <img id="mathematics_image" class="subject_image"        src='{{ url("img/mathematics.jpg") }}'/>
        <img id="physics_image"     class="hidden subject_image" src='{{ url("img/physics.jpg") }}' />
        <img id="technology_image"  class="hidden subject_image" src='{{ url("img/technology.jpg") }}' />
        <img id="science_image"     class="hidden subject_image" src='{{ url("img/science.png") }}' />
        <img id="chemistry_image"   class="hidden subject_image" src='{{ url("img/chemistry.jpg") }}' />
      </div>
      </section>
      <footer >
        <div id="footer_flex_container">
          <div class="footer_flex_item">
            <h4>Scuola Superiore X</h4>
            <a href="https://www.google.com/maps/search/?api=1&query=Via+Etnea,+Catania,+Italy">Via Etnea</a>
            <br>
            <a href="tel:+3333333333">Tel: +39 3333333333</a>
            <br>
            <a href="mailto:scuolax@pec.istruzione.it">Pec: scuolax@pec.istruzione.it</a><br>
            <a href="mailto:scuolax@istruzione.it">Email: scuolax@istruzione.it</a>
          </div>
          <div class="footer_flex_item">
            <h4>Seguici</h4>
            <a href="#" class="fa fa-facebook"></a>
            <a href="#" class="fa fa-twitter"></a>
            <a href="#" class="fa fa-instagram"></a>
            <a href="#" class="fa fa-youtube"></a>
          </div>
        </div>
        <div id="page_rights">
          <p>&copy; 2024 Scuola Superiore X. Tutti i diritti riservati.</p>
        </div>
      </footer>
      @show
  </body>
</html>