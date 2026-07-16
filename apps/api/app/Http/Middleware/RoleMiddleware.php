<?php

namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! $request->user()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $userRole = $request->user()->role;

        if (empty($roles)) {
            return $next($request);
        }

        $permittedRoles = array_map(fn (string $role) => UserRole::from($role), $roles);

        if (! in_array($userRole, $permittedRoles)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        return $next($request);
    }
}
