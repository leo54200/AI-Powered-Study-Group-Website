<!DOCTYPE html>
<html>
    <head>
        @section('head')
        <title>Pagina docente</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8" />
        <link rel="stylesheet" href='{{ url("css/style.css") }}' />
        <link rel="icon" type="image/x-icon" href='{{ url("img/logo.png") }}' />
        <script src='{{ url("js/script.js") }}' defer></script>
        <script> const BASE_URL = "{{ url('/') }}/"; </script>
        <link rel="stylesheet" href="{{ url('css/style_chatbot_teacher.css') }}" />
        <script src="{{ url('js/script_chatbot_teacher.js') }}" defer></script>
        @show
    </head>
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
        <a href="{{url('logout')}}">
          <div>Esci</div>
        </a>
      </div>
      <nav id="navbar">
        <div>
          <a href="{{url('/')}}"
            ><img class="middle" id="logo" src="{{url('img/logo.png')}}" alt=""
          /></a>
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
        </div>
        <div class="dropdown-content">
        <a href='{{ url("user/" . $username) }}'>Account</a>
            <a href="{{ url('logout') }}">Esci</a>
        </div>
        </div>
        </nav>
    </header>
    <div class="nav_height"></div>
    @yield('content')
</body>
</html>
