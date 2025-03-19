<!DOCTYPE html>
<html>
    <head>
        @section('head')
        <title>Pagina Admin</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/x-icon" href='{{ url("img/logo.png") }}' />
        <link rel="stylesheet" href='{{ url("css/style.css") }}' />
        <link rel="stylesheet" href="{{ url('css/style_admin.css')}}"/>
        <script> const BASE_URL = "{{ url('/') }}/"; </script>
        @show
    </head>
    <body>
        <header>
            <nav>
                <a href="{{url('admin/register')}}">Registra utenti</a>
                <a href="{{url('admin/users_list')}}">Lista utenti</a>
                <a href="{{url('logout')}}">Esci</a>
            </nav>
        </header>
        <div class="nav_height"></div>
    @yield('content')
    </body>
</html>