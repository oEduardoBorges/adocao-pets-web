import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      const allowedRoles = route.data['allowedRoles'];
      const userRole = this.authService.getRole();

      // Se não há restrições de role, permite o acesso
      if (!allowedRoles || allowedRoles.length === 0) {
        return true;
      }

      // Usuário não tem a role necessária
      if (allowedRoles.indexOf(userRole) === -1) {
        this.toastr.error('Você não tem permissão para realizar esta ação.', 'Acesso Negado');
        this.router.navigate(['home']); // ou para outra rota de acesso não autorizado
        return false;
      }
      
      // Usuário tem a role necessária
      return true; 
    }

    // Usuário não autenticado, redireciona para a página de login
    this.router.navigate(['login']);
    return false;
  }
}
