import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../../core/service/user.service';
import { NotificationService } from '../../../../core/service/notification.service';
import { ErrorHandlerService } from '../../../../core/service/error-handler.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../core/components/pagination/pagination.component';
import { debounceTime, distinctUntilChanged, filter, Subject } from 'rxjs';
declare var bootstrap: any;

export interface UserRequest {
  username: string;
  skip: number;
  take: number;
}

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  userRequest: UserRequest = {
    username: '',
    skip: 0,
    take: 10,
  };

  //@ViewChild('subcategoryNameInput') categoryNameInput!: ElementRef;
  private usernameChangeSubject = new Subject<string>();

  totalCount: number = 0;
  totalPages: number[] = [];
  users: any[] = [];
  currentPage: number = 1;

  userToDelete: any = null;

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _errorHandlerService: ErrorHandlerService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {});

    this.loadUsers();

    this.usernameChangeSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.userRequest.skip = 0;
        this.loadUsers();
      });
  }

  loadUsers() {
    this._userService.getUsers(this.userRequest).subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          this.users = response.data;
          this.totalCount =
            typeof response?.totalCount === 'number' ? response.totalCount : 0;
          this.calculateTotalPages();
        } else {
          this._notificationService.error(response.message);
        }
      },
      error: (errorResponse: any) =>
        this._errorHandlerService.handleErrors(errorResponse),
    });
  }

  onEditUser(userId: string, username: string): void {
    if (username == 'admin') {
      const modal = document.getElementById('infoModal');
      if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    } else {
      this.router.navigate(['users/edit', userId]);
    }
  }

  deleteUser() {
    this._userService.deleteUser(this.userToDelete.id).subscribe({
      next: (response: any) => {
        if (response && response.success) {
          this._notificationService.success(response.message);
          this.loadUsers();
        } else {
          this._notificationService.error(response.message);
        }
      },
      error: (errorResponse: any) =>
        this._errorHandlerService.handleErrors(errorResponse),
    });
    this.closeModal();
  }

  closeModal(): void {
    const deleteModalElement = document.getElementById(
      'deleteConfirmationModal'
    );
    if (deleteModalElement) {
      const modalInstance = bootstrap.Modal.getInstance(deleteModalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
    this.userToDelete = null;
  }

  calculateTotalPages(): void {
    const pages = Math.ceil(this.totalCount / this.userRequest.take);
    this.totalPages = Array.from({ length: pages }, (_, i) => i + 1);
  }

  onFilterChange(): void {
    this.usernameChangeSubject.next(this.userRequest.username);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.userRequest.skip = (page - 1) * this.userRequest.take;
    this.loadUsers();
  }

  onItemsPerPageChange(itemsPerPage: number): void {
    this.userRequest.take = itemsPerPage;
    this.userRequest.skip = 0;
    this.currentPage = 1;
    this.loadUsers();
  }

  showDeleteUsersModal(user: any) {
    if (user.username == 'admin') {
      const modal = document.getElementById('infoModal');
      if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    } else {
      this.userToDelete = user;
      const modal = document.getElementById('deleteConfirmationModal');
      if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    }
  }
}
