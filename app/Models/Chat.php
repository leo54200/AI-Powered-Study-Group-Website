<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    public function messages(){
        return $this->hasMany('App\Models\Message');
    }
}