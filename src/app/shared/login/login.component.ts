import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { AuthManagerService } from '../../core/service/auth-manager.service';
import { NotificationService } from '../../core/service/notification.service';
import { ErrorHandlerService } from '../../core/service/error-handler.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  isSubmitting = false;
  loginForm: FormGroup;
  showPassword = false;
  passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$';
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _authManagerService: AuthManagerService,
    private _notificationService: NotificationService,
    private _errorHandlerService: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const username = params['username'];
      if (username) {
        this.loginForm.patchValue({ username });
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this._notificationService.info('Invalid form');
      return;
    }
    this.isSubmitting = true;
    this._authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          const userData = {
            username: response.data.username,
            role: response.data.role,
            token: response.data.token,
            id: response.data.id,
            isActive: response.data.isActive,
          };
          this._authManagerService.setAuth(userData);
          if (userData.isActive == false) {
            
            this.router.navigate(['/inactive']);
          } else {
            this.router.navigate(['/home']);
          }

          this._notificationService.success(response.message);
        } else {
          this._notificationService.error(response.message);
          this.isSubmitting = false;
        }
      },
      error: (errorResponse: any) => {
        this._errorHandlerService.handleErrors(errorResponse);
        this.isSubmitting = false;
      },
    });
  }
}
