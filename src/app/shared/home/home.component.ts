import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthManagerService } from '../../core/service/auth-manager.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  username: string | null = '';
  role: string | null = '';
  private authSubscription!: Subscription;

  constructor(private _authManagerService: AuthManagerService) {}

  ngOnInit(): void {
    this.authSubscription = this._authManagerService.authChanges$.subscribe(
      (auth) => {
        this.username = auth?.username ?? null;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
