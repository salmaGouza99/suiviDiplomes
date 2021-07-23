<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WelcomeController;

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
// Public routes
Route::post('/login',[LoginController::class,'login']);

// Protected routes for all users
Route::group(['middleware' => 'auth:sanctum'], function(){
  Route::post('/logout',[LoginController::class,'logout']);
  Route::get('/welcome',[WelcomeController::class,'index']);

});

 /*  Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum','role:superadministrateur']], function() {
    Route::post('/logout','App\Http\Controllers\LoginController@logout');
    Route::get('/users','App\Http\Controllers\LoginController@getUser');
}); */


// Protected routes for admin
Route::group(['middleware' => ['auth:sanctum','role:admin']], function(){
  Route::get('/users',[LoginController::class,'getUser']);
  Route::get('/test',[WelcomeController::class,'test']);
});

// Protected routes for guichet_droit_arabe
Route::group(['middleware' => ['auth:sanctum','role:guichet_droit_arabe']], function(){

});

// Protected routes for guichet_droit_francais
Route::group(['middleware' => ['auth:sanctum','role:guichet_droit_francais']], function(){

});

// Protected routes for guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:guichet_economie']], function(){

});

// Protected routes for service_diplomes
Route::group(['middleware' => ['auth:sanctum','role:service_diplomes']], function(){

});

// Protected routes for decanat
Route::group(['middleware' => ['auth:sanctum','role:decanat']], function(){

});

// Protected routes for bureau_ordre
Route::group(['middleware' => ['auth:sanctum','role:bureau_ordre']], function(){

});

// Protected routes for guichet_retrait
Route::group(['middleware' => ['auth:sanctum','role:guichet_retrait']], function(){

});




// Route::middleware('auth:api')->get('/user', function (Request $request) {
//   return $request->user();
// });