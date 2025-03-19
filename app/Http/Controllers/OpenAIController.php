<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\Message;

class OpenAIController extends BaseController
{
    public function OpenAI_response()
    {
        if (!Session::get('id_utente')) {
            return redirect('/');
        }
        $apiKey = env('OPENAI_API_KEY');
        $apiUrl = env('OPENAI_API_URL');
        $requestData = request('messages', []); 
        $testo = end($requestData)['content'];
        $mittente = 1;
        $data = now();
        $id_chat = Session::get('id_chat');

        $message = new Message;
        $message->id_chat = $id_chat;
        $message->testo = $testo;
        $message->data = $data;
        $message->mittente = $mittente;
        $message->save();

        $message_to_openai = [
            'model' => 'gpt-3.5-turbo',
            'messages' => $requestData
        ];
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Authorization: Bearer ' . $apiKey,]);
        curl_setopt($curl, CURLOPT_URL, $apiUrl);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($message_to_openai));

        $response = curl_exec($curl);

        if ($response === false) {
            $error = curl_error($curl);
            curl_close($curl);
            return response()->json(['error' => 'Errore nella comunicazione con il server OpenAI: ' . $error]);
        }

        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);

        if ($httpCode >= 400) {
            return response()->json(['error' => 'Errore nella risposta del server OpenAI: ' . $response], $httpCode);
        }
        $responseData = json_decode($response, true);
        if (!isset($responseData['choices'][0]['message']['content'])) {
            return response()->json(['error' => 'Nessun contenuto valido ricevuto dalla risposta di OpenAI.']);
        }

        $messageContent = $responseData['choices'][0]['message']['content'];
        $mittente = 2;

        $message = new Message;
        $message->id_chat = $id_chat;
        $message->testo = $messageContent;
        $message->data = now();
        $message->mittente = $mittente;
        $message->save();

        $messageId = $message->id;
        return response()->json(['messageId' => $messageId, 'messageContent' => $messageContent]);
    }
}
