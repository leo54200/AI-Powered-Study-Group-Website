<!DOCTYPE html>
<html>
    <head>
    @section('head')
    <title>Gruppo di studio virtuale</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charset="utf-8" />
    <link rel="stylesheet" href='{{ url("css/style.css") }}' />
    <link rel="icon" type="image/x-icon" href='{{ url("img/logo.png") }}' />
    <script src='{{ url("js/script.js") }}' defer></script>
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
        <a href='{{ url("user/" . $username) }}'>
          <div>Account</div>
        </a>
        <a href='{{ url("logout") }}'>
          <div>Esci</div>
        </a>
      </div>
      <nav id="navbar">
        <div>
          <a href='{{ url("/") }}'><img class="middle" id="logo" src='{{ url("img/logo.png") }}' alt=""/></a>
          <a class="main_option" id="home" href='{{ url("/") }}'>Home</a>
          <a class="main_option" id="studiamo_insieme" href='{{ url("classroom") }}'>Studiamo insieme</a>
        </div>
        <div class="dropdown">
          <button class="dropbtn" id="welcome">Bentornato {{ $nome }}</button>
          <div class="dropdown-content">
            <a href='{{ url("user/" . $username) }}'>Account</a>
            <a href='{{ url("logout") }}'>Esci</a>
          </div>
        </div>
      </nav>
    </header>
    <div class="nav_height"></div>
    @yield('content')
    </body>
</html>