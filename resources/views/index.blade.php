@extends('layouts.home')

@section('head')
@parent
    <link rel="stylesheet" href="{{ url('css/style_login.css') }}" />
    <script src="{{ url ('js/script_login.js') }}" defer></script>
    <script> const csrf_token = "{{ csrf_token() }}"; </script>
@endsection
@section('home-content')
    <div id="sign_in_div" class="hidden">
      <form id="sign_in_form" method="POST">
        @csrf
        <img id="close_form" src="{{ url('img/x.png') }}" />
        <h1 class="th">Accedi</h1>
        <p class="error" id="idError"></p>
        <label class="tl">username<br /></label>
        <input class="form_input" type="text" id="txtusername" name="username" value="" placeholder="inserisci l'username" /><br />
        <label class="tl">Password<br /></label>
        <input class="form_input" type="password" id="txtpassword" name="password" value="" placeholder="inserisci la password" /><br />
        <button type="submit" id="id_submit" class="tb">Accedi</button>
      </form>
    </div>
    <div id="blur">
    @parent
    </div>
@endsection
