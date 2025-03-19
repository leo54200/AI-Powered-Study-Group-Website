@extends('layouts.admin')
@section('head')
@parent
    <link rel="stylesheet" href="{{ url('css/style_users_list.css') }}">
    <script> const csrf_token = "{{ csrf_token() }}"; </script>
    <script src="{{ url('js/script_users_list.js') }}"></script>

@endsection
@section('content')
    <div class="container">
        <h1>Lista Utenti</h1>
        <div id="usersContainer"></div>
    </div>
@endsection
