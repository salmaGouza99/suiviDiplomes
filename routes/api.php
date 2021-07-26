<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\FormulaireController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\DiplomeController;

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

  // Etudiants
  Route::get('/etudiants/{cin}',[EtudiantController::class,'show']);
  Route::get('/etudiants/search/{var}',[EtudiantController::class,'search']);

  // Diplomes 
  Route::get('/diplomes/{diplome}',[DiplomeController::class,'show']);
  Route::get('/diplomes/statut/{statut}',[DiplomeController::class,'filterByStatut']);
  Route::get('/diplomes/search/{mc}',[DiplomeController::class,'search']);
});

// Protected routes for admin
Route::group(['middleware' => ['auth:sanctum','role:admin']], function(){
  // Users
  Route::resource('/users',UsersController::class);
  Route::get('/users/search/{email}',[UsersController::class,'search']);
  Route::get('/users/role/{role}',[UsersController::class,'filterByRole']);

  // Forms
  Route::resource('/formulaires',FormulaireController::class);
  Route::get('/formulaires/type/{type}',[FormulaireController::class,'filterByType']);
  Route::get('/formulaires/filiere/{filiere}',[FormulaireController::class,'filterByFiliere']);

  // Etudiants
  Route::get('/etudiants',[EtudiantController::class,'index']);
  Route::get('/etudiants/filiere/{filiere}',[EtudiantController::class,'filterByFiliere']);
  Route::get('/etudiantss/export',[ExportController::class,'export']);

  // Diplomes
  Route::get('/diplomes',[DiplomeController::class,'index']);
});

// Protected routes for admin, guichet_droit_arabe, guichet_droit_francais and guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:admin|guichet_droit_arabe|
       guichet_droit_francais|guichet_economie']], function(){
  // Demandes
  Route::resource('demandes', DemandeController::class,['only' => ['index', 'show']]);
  Route::get('/demandes/search/{mc}',[DemandeController::class,'search']);
  Route::get('/demandes/type/{type}',[DemandeController::class,'filterByType']);
});

// Protected routes for admin and decanat
Route::group(['middleware' => ['auth:sanctum','role:admin|decanat']], function(){
  // Etudiants
  Route::put('/etudiants/{cin}',[EtudiantController::class,'update']);
});

// Protected routes for guichet_droit_arabe, guichet_droit_francais and guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:guichet_droit_arabe|
       guichet_droit_francais|guichet_economie']], function(){
  // Diplomes
  Route::post('/diplomes/{demande_id}',[DiplomeController::class,'store']);
});


// Protected routes only for service_diplomes
Route::group(['middleware' => ['auth:sanctum','role:service_diplomes']], function(){
  Route::put('/diplomes/impression/{diplome}',[DiplomeController::class,'updateDateImpression']);
  Route::put('/diplomes/envoiPresidence/{diplome}',[DiplomeController::class,'updateDateEnvoiApresidence']);
});

// Protected routes only for decanat
Route::group(['middleware' => ['auth:sanctum','role:decanat']], function(){
  Route::put('/diplomes/signature/{diplome}',[DiplomeController::class,'updateDateSignature']);
});

// Protected routes only for bureau_ordre
Route::group(['middleware' => ['auth:sanctum','role:bureau_ordre']], function(){
  Route::put('/diplomes/reception/{diplome}',[DiplomeController::class,'updateDateReceptionParBureauOrdre']);
});

// Protected routes only for guichet_retrait
Route::group(['middleware' => ['auth:sanctum','role:guichet_retrait']], function(){
  Route::put('/diplomes/retrait/{diplome}',[DiplomeController::class,'updateDateRetraitDiplomeArchiveDossier']);
  //Route::get('/etudiants/notif/{email}',[EtudiantController::class,'notif']);
});

