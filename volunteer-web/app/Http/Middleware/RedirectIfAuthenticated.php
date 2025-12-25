<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// add
use Illuminate\Support\Facades\Auth;


class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$guards)
    {
        $guards = empty($guards) ? ['web'] : $guards;

        // return $next($request);
        foreach($guards as $guard){
            if(Auth::guard($guard)->check()){
                $user = Auth::guard($guard)->user();

                // dd([
                //     'auth_class' => get_class($user),
                //     'id' => $user->id ?? null,
                //     'role' => $user->role ?? null,
                //     'guards' => $guards,
                // ]);
                return match (strtolower($user->role ?? '')) {
                    'admin' => redirect()->route('dashboard.admin'),
                    'institute' => redirect()->route('dashboard.institute'),
                    'user' => redirect()->route('dashboard.user'),
                    default => redirect('/'),
                };

            }
        }

        return $next($request);
    }
}
