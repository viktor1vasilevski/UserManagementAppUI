import { CanActivateFn, Router } from '@angular/router';
import { AuthManagerService } from '../service/auth-manager.service';
import { inject } from '@angular/core';
import { NavigationService } from '../service/navigation.service';

export const activeGuard: CanActivateFn = () => {
  const authManagerService = inject(AuthManagerService);
  const router = inject(Router);
  const navigationService = inject(NavigationService);

  const isActive = authManagerService.getIsActive();

  if (!isActive) {
    navigationService.setRedirectedByGuard(true);
    router.navigate(['/inactive']);
    return false;
  }

  return true;
};
