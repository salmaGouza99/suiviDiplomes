<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\DiplomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\EtudiantController;
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
Route::get('/roles',[RoleController::class,'index']);

// Protected routes for all users
Route::group(['middleware' => 'auth:sanctum'], function(){
  Route::post('/logout',[LoginController::class,'logout']);
  Route::get('/welcome',[WelcomeController::class,'index']);

  // Profil
  Route::get('/profil',[ProfileController::class,'show']);
  Route::put('/profil',[ProfileController::class,'update']);

  // Etudiants
  Route::get('/etudiants/{cin}',[EtudiantController::class,'show']);
  Route::get('/etudiants/search/{mc}',[EtudiantController::class,'search']);

  // Diplomes 
  Route::get('/diplomes/{id}',[DiplomeController::class,'show']);
  Route::get('/diplomes/filter/{statut},{type},{filiere}',[DiplomeController::class,'filter']);
});

// Protected routes for admin
Route::group(['middleware' => ['auth:sanctum','role:admin']], function(){
  // Users
  Route::resource('/users',UserController::class,['except' => 'index']);
  Route::get('/users/search/{email?}',[UserController::class,'search']);
  Route::get('/users/role/{role}',[UserController::class,'filterByRole']);

  // Forms
  Route::resource('/formulaires',FormulaireController::class,['except' => 'show','store']);
  // Route::get('/formulaires/type/{type}',[FormulaireController::class,'filterByType']);

  // Etudiants
  Route::get('/etudiants',[EtudiantController::class,'index']);
  Route::get('/etudiants/filiere/{filiere}',[EtudiantController::class,'filterByFiliere']);
  Route::get('/exportEtudiants/{type},{filiere}',[EtudiantController::class,'exportEtudiants']);
  Route::get('/exportParcours/{statut},{type},{filiere}',[EtudiantController::class,'exportParcoursDetaille']);

  // Demandes
  Route::get('/demandes',[DemandeController::class,'index']);

  // Diplomes
  Route::get('/diplomes',[DiplomeController::class,'index']);
});

// Protected routes for admin, guichet_droit_arabe, guichet_droit_francais and guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:admin|guichet_droit_arabe|
       guichet_droit_francais|guichet_economie']], function(){
  Route::get('/demandes/{id}',[DemandeController::class,'show']);
  Route::get('/demandes/filter/{type},{filiere}',[DemandeController::class,'filter']);
  Route::post('/demandes/nouvellesDemandes',[DemandeController::class,'sheet']);
});

// Protected routes for admin and service_diplomes
Route::group(['middleware' => ['auth:sanctum','role:admin|service_diplomes']], function(){
  Route::put('/etudiants/{cin}',[EtudiantController::class,'update']);
});

// Protected routes for guichet_droit_arabe, guichet_droit_francais and guichet_economie
Route::group(['middleware' => ['auth:sanctum','role:guichet_droit_arabe|
       guichet_droit_francais|guichet_economie']], function(){
  Route::post('/diplomes/{demande_id}',[DiplomeController::class,'store']);
});

// Protected routes only for service_diplomes
Route::group(['middleware' => ['auth:sanctum','role:service_diplomes']], function(){
  Route::put('/diplomes/reedition/{diplome}',[DiplomeController::class,'updateDateReedition']);
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
  Route::get('/diplomes/notif/{id}',[DiplomeController::class,'sendMail']);
});
