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
        } elseif(Auth::user()->hasRole('guichet_economie')) {
            return 'Welcome guichet economie!';
        } elseif(Auth::user()->hasRole('service_diplomes')) {
            return 'Welcome service diplomes!';
        } elseif(Auth::user()->hasRole('decanat')) {
            return 'Welcome decanat!';
        } elseif(Auth::user()->hasRole('bureau_ordre')) {
            return 'Welcome bureau ordre!';
        } elseif(Auth::user()->hasRole('guichet_retrait')) {
            return 'Welcome guichet retrait!';
        }

    }

}
