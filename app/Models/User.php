<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public function chats(){
        return $this->hasMany('App\Models\Chat');
    }
    public function subjects(){
        return $this->belongsToMany('App\Models\Subject', 'subject_user', 'id_utente', 'id_materia');
    }
}
