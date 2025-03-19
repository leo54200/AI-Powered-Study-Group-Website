<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
class homeController extends BaseController
{
   public function index(){
      $id_utente = Session::get('id_utente');
      if($id_utente){
      $id_ruolo = Session::get('id_ruolo');
      if($id_ruolo == 1)
         return redirect('home');
      if($id_ruolo == 2)
         return redirect('chatbot_teacher');
      if($id_ruolo == 3)
         return redirect('admin/register');
      }
      return view('index');
   }
}
