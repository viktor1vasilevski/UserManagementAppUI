import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
export class UserEditComponent implements OnInit {
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
      role: ['', Validators.required],
      isActive: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedUserId = params['id'];
      this.loadUserById();
    });
  }

  onSubmit() {
    if (!this.editUserForm.valid) {
      this._notificationService.info('Invalid form');
      return;
    }
    this.isSubmitting = true;
    this._userService
      .editSubcategory(this.selectedUserId, this.editUserForm.value)
      .subscribe({
        next: (response: any) => {
          if (response && response.success) {
            this._userService.notifyUserIsEdited();
            this._notificationService.success(response.message);
            this.router.navigate(['/users']);
          } else {
            this.isSubmitting = false;
            this._notificationService.error(response.message);
          }
        },
        error: (errorResponse: any) => {
          this.isSubmitting = false;
          this._errorHandlerService.handleErrors(errorResponse);
        },
      });
  }

  loadUserById() {
    this._userService.getUserById(this.selectedUserId).subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          console.log(response.data);
          
          this.editUserForm.patchValue({
            firstName: response.data?.firstName,
            lastName: response.data?.lastName,
            role: response.data?.role,
            isActive: response.data.isActive
          });
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
