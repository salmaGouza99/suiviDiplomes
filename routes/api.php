<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\DemandeController;
use App\Http\Controllers\DiplomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\DashboardController;
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


// Protected routes for Admin
Route::group(['middleware' => ['auth:sanctum','role:Admin']], function(){
  // Users
  Route::resource('/users', UserController::class);
  // Roles
  Route::get('/roles',[RoleController::class,'index']);
  // Statuts
  Route::get('/statuts',[DiplomeController::class,'statuts']);
  // Forms
  Route::resource('/formulaires',FormulaireController::class,['except' => 'show', 'store', 'destroy']);
  //dashboard 
  Route::get('/dashboard/type/{type}',[DashboardController::class,'dashboardByType']);
  Route::get('/dashboard/currents',[DashboardController::class,'currents']);
  Route::get('/dashboard/currentYear',[DashboardController::class,'currentYear']);
  Route::get('/dashboard/{date_debut?}/{date_fin?}/{type?}',[DashboardController::class,'filtredDashboard']);
});


// Protected routes for all users
Route::group(['middleware' => 'auth:sanctum'], function(){
  // Profil
  Route::get('/profil',[ProfileController::class,'show']);
  Route::put('/profil',[ProfileController::class,'update']);
  // Etudiants
  Route::resource('/etudiants',EtudiantController::class,['except' => 'store', 'update', 'destroy']);
  // Diplomes 
  Route::resource('/diplomes',DiplomeController::class,['except' => 'store', 'update', 'destroy']);
});


// Protected routes for Admin, Guichet Droit Arabe, Guichet Droit Français and Guichet Economie
Route::group(['middleware' => ['auth:sanctum','role:Admin|Guichet Droit Arabe|Guichet Droit Français|Guichet Economie']], function(){
  // Demandes
  Route::resource('/demandes',DemandeController::class,['except' => 'store', 'update', 'destroy']);
  Route::post('/demandes/nouvellesDemandes/{filiere}',[DemandeController::class,'sheet']);
});


// Protected routes for Guichet Droit Arabe, Guichet Droit Français and Guichet Economie
Route::group(['middleware' => ['auth:sanctum','role:Guichet Droit Arabe|Guichet Droit Français|Guichet Economie']], function(){
  // Diplomes
  Route::post('/diplomes/{demande_id}',[DiplomeController::class,'store']);
});


// Protected routes only for Service de Diplômes
Route::group(['middleware' => ['auth:sanctum','role:Service de Diplômes']], function(){
  // Etudiants
  Route::put('/etudiants/{cin}',[EtudiantController::class,'update']);
  // Diplomes
  Route::put('/diplomes/reedition/{diplome}',[DiplomeController::class,'updateDateReedition']);
  Route::put('/diplomes/impression/{diplome}',[DiplomeController::class,'updateDateImpression']);
  Route::put('/diplomes/envoiPresidence/{diplome}',[DiplomeController::class,'updateDateEnvoiApresidence']);
});


// Protected routes only for Décanat
Route::group(['middleware' => ['auth:sanctum','role:Décanat']], function(){
  // Diplomes
  Route::put('/diplomes/signature/{diplome}',[DiplomeController::class,'updateDateSignature']);
});


// Protected routes only for Bureau d'Ordre
Route::group(['middleware' => ['auth:sanctum','role:Bureau d\'Ordre']], function(){
  // Diplomes
  Route::put('/diplomes/reception/{diplome}',[DiplomeController::class,'updateDateReceptionParBureauOrdre']);
});

// Protected routes only for Guichet de Retrait
Route::group(['middleware' => ['auth:sanctum','role:Guichet de Retrait']], function(){
  // Diplomes
  Route::put('/diplomes/notif/{diplome}',[DiplomeController::class,'updateDateNotificationEtudiant']);
  Route::put('/diplomes/retrait/{diplome}',[DiplomeController::class,'updateDateRetraitDiplomeArchiveDossier']);
  Route::get('/diplomes/mail/{id}',[DiplomeController::class,'sendMail']);
});
