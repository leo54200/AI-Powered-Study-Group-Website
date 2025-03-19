<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;

   class UserController extends BaseController
{

   public function account($username){
      $id_utente = Session::get('id_utente');
      if($id_utente){
         $id_ruolo = Session::get('id_ruolo');
         $nome = Session::get('nome');
         return view('account')->with('username', $username);
      }
      return redirect('/');
   }

   public function change_password($username){
      $id_utente = Session::get('id_utente');
      if($id_utente){
         $user = User::where('username', $username)->first();
         if(!password_verify(request('currentPassword'), $user->password)){
            return response()->json(['error' => 'Errore, Password errata']);
         }
         $user->password = password_hash(request('newPassword'), PASSWORD_BCRYPT);
         $user->save();
         return response()->json(['success' => 'Password correttamente modificata']);
      }
      return redirect('/');
   }
}
