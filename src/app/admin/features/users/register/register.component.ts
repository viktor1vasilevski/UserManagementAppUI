import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/service/auth.service';
import { NotificationService } from '../../../../core/service/notification.service';
import { ErrorHandlerService } from '../../../../core/service/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  passwordPattern =
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$';
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _notificationService: NotificationService,
    private _errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
      role: ['', Validators.required],
      isActive: [false],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerForm = {
        ...this.registerForm.value,
        role: Number(this.registerForm.value.role),
      };
      this._authService.register(registerForm).subscribe({
        next: (response: any) => {
          if (response && response.success && response.data) {
            this.router.navigate(['/home']);
            this._notificationService.success(response.message);
          } else {
            this._notificationService.error(response.message);
          }
        },
        error: (errorResponse: any) => {
          this._errorHandlerService.handleErrors(errorResponse);
        },
      });
    }
  }
}
