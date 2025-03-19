<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
use App\Models\Chat;

   class StudentController extends BaseController
{

   public function home(){
      $id_utente = Session::get('id_utente');
      if($id_utente){
         $id_ruolo = Session::get('id_ruolo');
         if($id_ruolo == 1){
            $nome = Session::get('nome');
            $username = Session::get('username');
            return view('home')->with(['nome' => $nome,'username' => $username]);
         }
      }
      return redirect('/');
   }
   
   public function classroom(){
   $id_utente = Session::get('id_utente');
   if($id_utente){
      $id_ruolo = Session::get('id_ruolo');
      if($id_ruolo == 1){
         $nome = Session::get('nome');
         $username = Session::get('username');
         return view('classroom')->with(['nome' => $nome,'username' => $username]);
      }
   }
   return redirect('/');
   }
}
