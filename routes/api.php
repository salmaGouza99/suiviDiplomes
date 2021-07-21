<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login','App\Http\Controllers\LoginController@login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout','App\Http\Controllers\LoginController@logout');
    Route::get('/users','App\Http\Controllers\LoginController@getUsers');
  });