<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
use App\Models\Subject;
use App\Models\Message;



   class TeacherController extends BaseController
{

   public function chatbot_teacher(){
      $id_utente = Session::get('id_utente');
      $id_ruolo = Session::get('id_ruolo');
      if($id_utente && $id_ruolo == 2){
         $nome = Session::get('nome');
         $username = Session::get('username');
         return view('chatbot_teacher')->with(['nome' => $nome,'username' => $username]);
      }
      return redirect('/');
   }

   public function get_subjects(){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 2){
         return redirect('/');
      }
      $user = User::find($id_utente);
      $subjects = $user->subjects;
      return response()->json(['subjects' => $subjects]);
   }

   function correction(){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 2){
         return redirect('/');
      }
      $correzione = request('correction');
      $messageId = request('messageId');
      $message = Message::find($messageId);
      $message->correzione = $correzione;
      $message->save();
      return response()->json(['message' => 'Correzzione eseguita con successo']);   
   }

   function rating(){
      $id_utente = Session::get('id_utente');
      if(!$id_utente || Session::get('id_ruolo') != 2){
         return redirect('/');
      }
      $chiarezza = request('rating1');
      $correttezza = request('rating2');
      $messageId = request('messageId');
      $message = Message::find($messageId);
      $message->chiarezza = $chiarezza;
      $message->correttezza = $correttezza;
      $message->save();
      return response()->json(['message' => 'Valutazione eseguita con successo']);   
   }
}  
