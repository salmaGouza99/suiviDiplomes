<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\DemandeController;

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
  Route::get('/etudiants/{cin}',[EtudiantController::class,'show']);
  Route::get('/etudiants/search/{var}',[EtudiantController::class,'search']);

});

 /*  Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum','role:superadministrateur']], function() {
    Route::post('/logout','App\Http\Controllers\LoginController@logout');
    Route::get('/users','App\Http\Controllers\LoginController@getUser');
}); */


// Protected routes for admin
Route::group(['middleware' => ['auth:sanctum','role:admin']], function(){
  //route for users
  Route::resource('/users',UsersController::class);
  Route::get('/users/email/{email}',[UsersController::class,'search']);
  Route::get('/users/role/{role}',[UsersController::class,'filterByRole']);

  //routes for forms
  Route::resource('/formulaires',FormulaireController::class);

  //routes for etudiants
  Route::get('/etudiants',[EtudiantController::class,'index']);
  Route::get('/etudiants/filter/{filiere}',[EtudiantController::class,'filterByFiliere']);
});

// Protected routes for admin, guichet_droit_arabe, guichet_droit_francais and guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:admin|guichet_droit_arabe|
       guichet_droit_francais|guichet_economie']], function(){
  Route::resource('demandes', DemandeController::class,['only' => ['index', 'show']]);
  Route::get('/demandes/search/{var}',[DemandeController::class,'search']);
  Route::get('/demandes/filter/{type}',[DemandeController::class,'filterByType']);
});

// Protected routes for admin and decanat
Route::group(['middleware' => ['auth:sanctum','role:admin|decanat']], function(){
  Route::put('/etudiants/{cin}',[EtudiantController::class,'update']);
});

// Protected routes for guichet_droit_arabe, guichet_droit_francais and guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:guichet_droit_arabe|
       guichet_droit_francais|guichet_economie']], function(){
  
});


// Protected routes only for service_diplomes
Route::group(['middleware' => ['auth:sanctum','role:service_diplomes']], function(){
  
});

// Protected routes only for decanat
Route::group(['middleware' => ['auth:sanctum','role:decanat']], function(){

});

// Protected routes only for bureau_ordre
Route::group(['middleware' => ['auth:sanctum','role:bureau_ordre']], function(){

});

// Protected routes only for guichet_retrait
Route::group(['middleware' => ['auth:sanctum','role:guichet_retrait']], function(){

});

