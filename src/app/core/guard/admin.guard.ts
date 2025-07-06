import { CanActivateFn, Router } from '@angular/router';
import { AuthManagerService } from '../service/auth-manager.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const authManagerService = inject(AuthManagerService);
  const router = inject(Router);
  const role = authManagerService.getRole();

  if (role !== 'Admin') {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
