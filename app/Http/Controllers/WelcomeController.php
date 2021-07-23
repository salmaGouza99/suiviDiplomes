<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WelcomeController extends Controller
{   
    public function index()
    {
        if(Auth::user()->hasRole('admin')) {
            return 'Welcome admin!';
        } elseif(Auth::user()->hasRole('guichet_droit_arabe')) {
            return 'Welcome guichet droit arabe!';
        } elseif(Auth::user()->hasRole('guichet_droit_francais')) {
            return 'Welcome guichet droit francais!';
        } elseif(Auth::user()->hasRole('guichet_droit_economie')) {
            return 'Welcome guichet economie!';
        } elseif(Auth::user()->hasRole('service_diplomes')) {
            return 'Welcome guichet service diplomes!';
        } elseif(Auth::user()->hasRole('decanat')) {
            return 'Welcome decanat!';
        } elseif(Auth::user()->hasRole('bureau_ordre')) {
            return 'Welcome guichet bureau ordre!';
        } elseif(Auth::user()->hasRole('guichet_retrait')) {
            return 'Welcome guichet retrait!';
        }

    }

    // Just for admin
    public function test()
    {
      return 'test of admin!';
    }

   
}
