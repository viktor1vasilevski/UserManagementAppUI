import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../../core/service/notification.service';
import { ErrorHandlerService } from '../../../../core/service/error-handler.service';
import { UserService } from '../../../../core/service/user.service';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent {
  editUserForm: FormGroup;
  isSubmitting = false;
  selectedUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _errorHandlerService: ErrorHandlerService
  ) {
    this.editUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['User', Validators.required],
      isActive: [true],
    });
  }

  onSubmit() {
    
  }
}
