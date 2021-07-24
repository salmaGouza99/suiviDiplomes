<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FormulaireController;


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
// Route::get('/excel',[UsersController::class,'excel']);


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
Route::group(['prefix' => 'admin','middleware' => ['auth:sanctum','role:admin']], function(){
  //route for users
  Route::resource('/users',UsersController::class);
  Route::get('/users/email/{email}',[UsersController::class,'search']);
  Route::get('/users/role/{role}',[UsersController::class,'filterByRole']);

  //routes for forms
  Route::resource('/formulaires',FormulaireController::class);
});

// Protected routes for guichet_droit_arabe
Route::group(['prefix' => 'guichet_droit_arabe','middleware' => ['auth:sanctum','role:guichet_droit_arabe']], function(){

});

// Protected routes for guichet_droit_francais
Route::group(['prefix' => 'guichet_droit_francais','middleware' => ['auth:sanctum','role:guichet_droit_francais']], function(){

});

// Protected routes for guichet_economie
Route::group(['prefix' => 'guichet_economie','middleware' => ['auth:sanctum','role:guichet_economie']], function(){

});

// Protected routes for service_diplomes
Route::group(['prefix' => 'service_diplomes','middleware' => ['auth:sanctum','role:service_diplomes']], function(){

});

// Protected routes for decanat
Route::group(['prefix' => 'decanat','middleware' => ['auth:sanctum','role:decanat']], function(){

});

// Protected routes for bureau_ordre
Route::group(['prefix' => 'bureau_ordre','middleware' => ['auth:sanctum','role:bureau_ordre']], function(){

});

// Protected routes for guichet_retrait
Route::group(['prefix' => 'guichet_retrait','middleware' => ['auth:sanctum','role:guichet_retrait']], function(){

});


