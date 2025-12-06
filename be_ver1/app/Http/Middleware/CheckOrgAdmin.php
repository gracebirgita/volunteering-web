<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckOrgAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {   

        if (!session('logged_in')) {
            return redirect('/login')->with('error', 'Please login first');
        }

        if (session('user_role') !== 'org_admin') {
            return redirect('/')->with('error', 'Only organization admin can access this page.');
        }
        
        return $next($request);
    }
}
