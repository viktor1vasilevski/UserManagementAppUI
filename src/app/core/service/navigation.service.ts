import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private redirectedByGuard = false;

  setRedirectedByGuard(status: boolean) {
    this.redirectedByGuard = status;
  }

  wasRedirectedByGuard(): boolean {
    const status = this.redirectedByGuard;
    this.redirectedByGuard = false;
    return status;
  }
}
