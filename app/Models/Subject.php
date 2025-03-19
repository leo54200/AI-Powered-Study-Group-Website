<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    public function users(){
        return $this->belongsToMany('App\Models\User', 'subject_user', 'id_materia', 'id_utente');
    }
}