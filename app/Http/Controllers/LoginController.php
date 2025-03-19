<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;

   class LoginController extends BaseController
{

   public function do_login(){
      $user = User::where('username', request('username'))->first();
      if(!$user || !password_verify(request('password'), $user->password)){
         return response()->json(['error' => 'Username e/o password errati']);
      }
      Session::put('id_utente', $user->id);
      Session::put('username', $user->username);
      Session::put('nome', $user->nome);
      Session::put('id_ruolo', $user->ruolo);
      return response()->json(['success' => 'accesso effettuato']);
   }

   public function logout(){
      Session::flush();
      return redirect('/');
   }
}
