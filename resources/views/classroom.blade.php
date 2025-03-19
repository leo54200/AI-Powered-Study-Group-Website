@extends('layouts.student')

@section('head')
@parent
    <link rel="stylesheet" href="{{ url('css/style_classroom.css') }}" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <script src="{{ url('js/script_classroom.js') }}" defer></script>
    <script> const csrf_token = "{{ csrf_token() }}"; </script>
  </head>
  @endsection

  @section('content')
    <h2 class="center">Benvenuto nella nostra classe</h2>
    <div id="flexcontainer_guys">
      <div id="chat">
        <div class="speech_bubble hidden"></div>
        <div id="students">
          <img id="guy1" class="guy1_3" src="{{ url('img/guy1.PNG') }}" alt="" />
          <img id="speaking_guy1" class="guy1_3 hidden" src="{{ url('img/speaking_guy1.PNG') }}" />
          <img id="guy2" class="guy" src="{{ url('img/guy2.PNG') }}" alt="" />
          <img id="speaking_guy2" class="guy hidden" src="{{ url('img/speaking_guy2.PNG') }}" />
          <img id="guy3" class="guy1_3" src="{{ url('img/guy3.PNG') }}" alt="" />
          <img id="speaking_guy3" class="guy1_3 hidden" src="{{ url('img/speaking_guy3.PNG') }}" />
          </div>
          <div class="center">
            <div id="table"></div>
          </div>
        <div id="bar">
          <textarea id="input_message" type="text" placeholder="Scrivi qui..." ></textarea>
          <button id="submit_message" class="material-symbols-outlined"> send </button>
        </div>
      </div>
      <div id="history_box">
        <p class="history_box_title">Cronologia della conversazione</p>
        <div id="container"></div>
      </div>
    </div>
    <div class="center">
      <button id="next_button">Premi per avanzare nella conversazione</button>
    </div>
    @endsection
