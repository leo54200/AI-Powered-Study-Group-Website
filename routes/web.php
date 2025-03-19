<?php

use Illuminate\Support\Facades\Route;

Route::get('/','App\Http\Controllers\HomeController@index');
Route::get('home','App\Http\Controllers\StudentController@home');
Route::get('classroom','App\Http\Controllers\StudentController@classroom');
Route::get('chatbot_teacher','App\Http\Controllers\TeacherController@chatbot_teacher');
Route::get('user/{username}','App\Http\Controllers\UserController@account');
Route::post('user/{username}/change_password','App\Http\Controllers\UserController@change_password');


Route::get('admin/register', 'App\Http\Controllers\AdminController@register_form');
Route::post('admin/register', 'App\Http\Controllers\AdminController@do_register');
Route::post('admin/register/get_all_subjects', 'App\Http\Controllers\AdminController@get_all_subjects');
Route::get('admin/users_list', 'App\Http\Controllers\AdminController@users_list');
Route::post('admin/users_list', 'App\Http\Controllers\AdminController@show_users_list');
Route::post('admin/delete_user/{userId}', 'App\Http\Controllers\AdminController@delete_user');


Route::get('logout', 'App\Http\Controllers\LoginController@logout');
Route::post('login', 'App\Http\Controllers\LoginController@do_login');

Route::post('classroom/OpenAi_response', 'App\Http\Controllers\OpenAIController@OpenAI_response');
Route::post('classroom/start_chat', 'App\Http\Controllers\ChatController@start_chat');
Route::post('classroom/check_previous_chat', 'App\Http\Controllers\ChatController@check_previous_chat');


Route::post('chatbot_teacher/start_chat', 'App\Http\Controllers\ChatController@start_chat');
Route::post('chatbot_teacher/get_subjects', 'App\Http\Controllers\TeacherController@get_subjects');
Route::post('chatbot_teacher/correction', 'App\Http\Controllers\TeacherController@correction');
Route::post('chatbot_teacher/rating', 'App\Http\Controllers\TeacherController@rating');

