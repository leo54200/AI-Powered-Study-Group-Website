@extends('layouts.admin')
@section('head')
@parent
    <link rel="stylesheet" href="{{ url('css/style_register.css')}}"/>
    <script src="{{ url('js/script_register.js') }}" defer></script>
    <script> const csrf_token = "{{ csrf_token() }}"; </script>
@endsection
@section('content')
  <main> 
    <div id="sign_in_div">
      <form id="sign_in_form" method="POST">
      @csrf 
        <h1 class="th">Registra un utente</h1>
        <p id="idError"class="error"></p>
        <label class="tl">Nome<br /></label>
        <input type="text" id="txtnome" name="nome" value="" placeholder="inserisci il nome "/><br />
        <label class="tl">Cognome<br /></label>
        <input type="text" id="txtcognome" name="cognome" value="" placeholder="inserisci il cognome"/><br />
        <label class="tl">username<br /></label>
        <input type="text" id="txtusername" name="username" value="" placeholder="inserisci l'username"/><br />
        <label class="tl">Password<br /></label>
        <input type="password" id="txtpassword" name="password" value="" placeholder="inserisci la password"/> <br />
        <label class="tl">Tipo utente</label>
        <select name="id_ruolo" id="id_ruolo"> 
          <option value="" selected disabled hidden>Seleziona un tipo utente</option>
          <option value="1" >Studente</option>
          <option value="2" >Docente</option>
          <option value="3" >Admin</option>
        </select>
        <div id="subjects" class="hidden"></div>
        <button  name="submit_signup" class="tb" type="submit" id="submit_signup">registra</button>
        </form>
      </div>
    </main>
@endsection