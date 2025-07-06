import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthManagerService } from '../service/auth-manager.service';
import { NavigationService } from '../service/navigation.service';

export const authGuard: CanActivateFn = () => {
  const authManagerService = inject(AuthManagerService);
  const router = inject(Router);
  const navigationService = inject(NavigationService);

  if (!authManagerService.isLoggedIn()) {
    navigationService.setRedirectedByGuard(true);
    router.navigate(['/login']);
    return false;
  }

  return true;
};
