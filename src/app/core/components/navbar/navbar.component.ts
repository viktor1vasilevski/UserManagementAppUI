import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthManagerService } from '../../service/auth-manager.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private authSubscription!: Subscription;
  role: string | null = '';
  isActive: boolean | undefined = false;
  constructor(private _authManagerService: AuthManagerService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authSubscription = this._authManagerService.authChanges$.subscribe(
      (auth) => {
        this.role = auth?.role ?? null;
        this.isActive = auth?.isActive;
      }
    );
  }

  logout() {
    this._authManagerService.clearAuth();
    this.router.navigate(['/login']);
  }
}
