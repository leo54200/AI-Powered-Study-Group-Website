<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
use App\Models\Subject;
use Illuminate\Support\Str;

   class AdminController extends BaseController
{
    
   public function register_form()
   {
      if(!Session::get('id_utente'))
         return redirect('/');
      if(Session::get('id_ruolo') != 3)
         return redirect('/');
      $username = Session::get('username');
      Session::forget('username');
      return view('register')->with(['username' => $username]);
   }
   
   public function do_register(){
      if(User::where('username', request('username'))->first()){
         return response()->json(['error' => 'Username gia\' in uso']);
      }
      //Creazione utente
      $nome = Str::lower(request('nome'));
      $cognome = Str::lower(request('cognome'));
      $usename = Str::lower(request('username'));
      $user = new User;
      $user->username = $usename;
      $user->nome = ucwords($nome);
      $user->cognome = ucwords($cognome);
      $user->password = password_hash(request('password'), PASSWORD_BCRYPT);
      $user->ruolo = request('id_ruolo');
      $user->save();
      if(!empty(request('id_materie'))){
      $subjects_list = request('id_materie');
      $user->subjects()->sync($subjects_list);
      }
      Session::put('username', $user->username);
      Session::put('error', 'User_added');
      return response()->json(['success' => 'Utente ' . $user->nome . ' correttamente registrato',]);
   }

   public function get_all_subjects(){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 3){
         return redirect('/');
      }
      $subjects = Subject::all();
      return response()->json(['subjects' => $subjects]);
   }

   function users_list(){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 3){
         return redirect('/');
      }
      return view('users_list');
   }

   function show_users_list(){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 3){
         return redirect('/');
      }
      $users = User::all();
      return response()->json(['users' => $users]);
   }

   function delete_user($userId){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 3){
         return redirect('/');
      }
      $user = User::find($userId);
      $user->delete();
      return response()->json(['success' => 'Utente ' . $user->nome . ' eliminato']);
   }
}