<!DOCTYPE html>
<html>
    <head>
        <title>Account</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charset="utf-8" />
        <link rel="stylesheet" href='{{ url("css/style.css") }}' />
        <link rel="icon" type="image/x-icon" href='{{ url("img/logo.png") }}' />
        <link rel="stylesheet" href="{{ url('css/style_account.css') }}">
        <script src='{{ url("js/script_account.js") }}' defer></script>
        <script>    
            const BASE_URL = "{{ url('/') }}/";
            const csrf_token = "{{ csrf_token() }}"; 
            const username = "{{ $username }}";
        </script>
    </head>
    <body>
        <a href="{{ url()->previous() }}">
        <img id="freccia_indietro"src='{{ url("img/freccia_indietro.png") }}' alt="">
        </a>
        <h1>Il Mio Account</h1>
        <p id="idError"class="error"></p>
        <p>Username: <span id="username">{{$username}}</span></p>
        
        <h2>Modifica Password</h2>
        <form id="changePasswordForm">
        @csrf 
            <label>Password Attuale:</label>
            <input type="password" id="currentPassword" name="currentPassword" required>
            <br>
            
            <label>Nuova Password:</label>
            <input type="password" id="newPassword" name="newPassword" required>
            <br>
            
            <label>Conferma Nuova Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <br>
            
            <button type="submit">Cambia Password</button>
        </form>
    </body>
</html>