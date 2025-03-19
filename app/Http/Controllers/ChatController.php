<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;
use App\Models\Chat;

class ChatController extends BaseController
{

    public function start_chat(){
        $id_utente = Session::get('id_utente');
        if (!$id_utente) {
            return redirect('/');
        }
        $tipo = request('id_type');
        $id_materia = request('id_subject');       
        $data = now();
        $chat = new Chat;
        $chat->id_utente = $id_utente;
        $chat->data = $data;
        $chat->tipo = $tipo;
        $chat->id_materia = $id_materia;
        $chat->save();
        Session::put('id_chat', $chat->id);
        return response()->json(['id_chat' => $chat->id, 'message' => 'Chat session started', 'tipo' => $tipo, 'id_materia' => $id_materia]);   
    }

    public function check_previous_chat(){
        $id_utente = Session::get('id_utente');
        $id_ruolo = Session::get('id_ruolo');
        if (!$id_utente || $id_ruolo != 1) {
            return redirect('/');
        }
        $chat = Chat::where('id_utente', $id_utente)->orderBy('data', 'desc')->first();
        if ($chat) {
            $data_attuale = now();
            $differenza_giorni = $data_attuale->diffInDays($chat->data);
            if ($differenza_giorni < 2) {
                return response()->json(['number_of_days' => $differenza_giorni]);
            }
        }
        return response()->json(['false' => 'false']);
    }
}

